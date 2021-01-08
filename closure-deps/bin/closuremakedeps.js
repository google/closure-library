#!/usr/bin/env node
/**
 * @license
 * Copyright 2018 The Closure Library Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Utility to generate Closure Dependency files that are used
 * when using Closure Library's debug code loader in a web browser.
 */

const depFile = require('../lib/depfile');
const depGraph = require('../lib/depgraph');
const fs = require('fs');
const minimatch = require('minimatch');
const parser = require('../lib/parser');
const path = require('path');
const process = require('process');
const yargs = require('yargs');

/**
 * @typedef {{
 *   file: !Array<string>,
 *   root: !Array<string>,
 *   exclude: !Array<string>,
 *   closurePath: (string|undefined),
 *   validate: boolean,
 *   mergeDeps: boolean,
 * }}
 */
let Arguments;

/**
 * @param {string|undefined} args
 * @return {!Arguments}
 */
function parseArgs(args) {
  return yargs
      .command('*', 'Utility for Closure Library dependency calculation.')
      .option('file', {
        alias: 'f',
        default: [],
        array: true,
        description:
            'One or more input files to calculate dependencies for. The ' +
            'namespaces in these files will be combined with those given ' +
            'with the --root flag to form the set of namespaces to find ' +
            'dependencies for. If this is a file that contains repeated ' +
            'calls to goog.addDependency, then the calls will be used as ' +
            'forward declarations. e.g. if you include Closure Library\'s ' +
            'deps.js file, then there is no need to include ' +
            'closure/goog/array/array.js as an input file as well. ' +
            'If you wish to merge these deps files in the output, see the ' +
            '--merge-deps option.',
      })
      .option('root', {
        alias: 'r',
        default: [],
        array: true,

        description:
            'Directories to scan for JavaScript (.js) files to include as ' +
            'inputs. These directories are scanned recursively.',
      })
      .option('exclude', {
        alias: 'e',
        default: [],
        array: true,
        description:
            'One or more path globs to ignore. Useful when combined with the ' +
            '--root flag to ignore specific subfiles or subdirectories.'
      })
      .option('closure-path', {
        default: undefined,
        string: true,
        description:
            'Path to the Closure Library (folder containing the base.js ' +
            'file). Required unless the path can be determined ' +
            'automatically by base.js ' +
            'being included among the input files.',
      })
      .option('validate', {
        default: true,
        boolean: true,
        description:
            'Enables validation the dependency graph before generating the ' +
            'dependency file.'
      })
      .option('merge-deps', {
        default: false,
        boolean: true,
        description: 'If true, then any deps files (files with calls to ' +
            'goog.addDependency) included in the input wll be also included ' +
            'in the output.'
      })
      .parse(args);
}

/**
 * Resolves the given path against the working directory.
 * @param {string} p
 * @return {string}
 */
function resolve(p) {
  return path.resolve(process.cwd(), p);
}

/**
 * Returns whether the given path matches at least one of the given globs.
 * @param {!Array<string>} globs The globs against which to match.
 * @param {string} path The path to match.
 * @return {boolean} Whether the path matches at least one of the globs.
 */
function globMatch(globs, path) {
  return globs.some(glob => minimatch(path, glob));
}

/**
 * @param {function(...?)} fn
 * @param {...?} args
 * @return {!Promise<?>}
 */
function promisify(fn, ...args) {
  return new Promise((resolve, reject) => {
    fn(...args, (err, arg) => err ? reject(err) : resolve(arg));
  });
}

/**
 * @param {string} pathToScan
 * @param {!Array<string>} excluded
 * @return {!Promise<!Array<string>>}
 */
async function findAllJsFiles(pathToScan, excluded) {
  if (globMatch(excluded, pathToScan)) {
    return [];
  }

  const stats = await promisify(fs.stat, pathToScan);

  if (stats.isDirectory()) {
    let allfiles = [];
    const files = await promisify(fs.readdir, pathToScan);
    const allFilePromises = files.map(
        file => findAllJsFiles(path.join(pathToScan, file), excluded));
    for (const p of allFilePromises) {
      const subFiles = await p;
      allfiles = allfiles.concat(subFiles);
    }
    return allfiles;
  } else if (stats.isFile()) {
    if (pathToScan.endsWith('.js')) {
      return [pathToScan];
    }
  }

  return [];
}

/**
 * Finds or creates a dependency for Closure's base.js (which provides the
 * `goog` symbol).
 *
 * @param {!Array<!depGraph.Dependency>} deps
 * @param {!Arguments} args
 * @return {!depGraph.Dependency}
 */
function getClosureDep(deps, args) {
  let closureDep = deps.find(d => d.closureSymbols.indexOf('goog') >= 0);

  // We need the path to Closure Library to be able to write a dependency file.
  // Note that if we find base.js via a dependency file (like Closure's deps.js)
  // it doesn't help us - we need the actual path of base.js, but the dependency
  // only knows the relative path from Closure Library to base.js, which is
  // always "base.js".
  if (!args.closurePath && (!closureDep || closureDep.isParsedFromDepsFile())) {
    throw new Error(
        'Could not find path to Closure. Closure\'s base.js either needs to ' +
        'be included or --closure-path provided.');
  }

  if (args.closurePath && closureDep && !closureDep.isParsedFromDepsFile()) {
    throw new Error(
        'Both --closure-path and Closure\'s base.js file should not be ' +
        'inputs.');
  }

  if (args.closurePath && closureDep && closureDep.isParsedFromDepsFile()) {
    closureDep.setClosurePath(args.closurePath);
  }

  if (!closureDep) {
    closureDep = new depGraph.Dependency(
        depGraph.DependencyType.SCRIPT, path.join(args.closurePath, 'base.js'),
        ['goog'], []);
    deps.push(closureDep);
  }

  return closureDep;
}

/**
 * @param {!Array<string>=} opt_args
 * @return {!Promise<{errors:!Array<!ParseError>,text:(string|undefined)}>}
 */
async function main(opt_args) {
  const args = parseArgs(opt_args);

  if (!args.file && !args.root) {
    console.error('Must supply inputs and/or roots.');
    yargs.showHelp();
    return;
  }

  const sources = new Set((args.file || []).map(resolve));
  const roots = (args.root || []).map(resolve);
  const excluded = (args.exclude || []).map(resolve);

  const allFiles =
      await Promise.all(roots.map(r => findAllJsFiles(r, excluded)));
  for (const files of allFiles) {
    for (const file of files) {
      sources.add(file);
    }
  }

  const results = await Promise.all([...sources].map(parser.parseFileAsync));
  let fatal = false;
  const errors = [].concat.apply([], results.map(r => r.errors));

  for (const error of errors) {
    fatal = fatal || error.fatal;
  }

  if (fatal) {
    return {errors};
  }

  const deps = [];
  const depsFromDepFiles = new Set();

  for (const result of results) {
    for (const dep of result.dependencies) {
      if (result.isFromDepsFile) {
        depsFromDepFiles.add(dep);
      }
      deps.push(dep);
    }
  }

  const closureDep = getClosureDep(deps, args);
  const closurePath = path.dirname(closureDep.path);

  // Update the path to closure for any files that we don't know the full path
  // of (parsed from a goog.addDependency call).
  for (const dep of deps) {
    dep.setClosurePath(closurePath);
  }

  if (args.validate) {
    new depGraph.Graph(deps).validate();
  }

  const depsToWrite = args.mergeDeps
      ? deps
      // `deps` - `depsFromFiles`.
      : deps.filter(d => !depsFromDepFiles.has(d));

  const text = depFile.getDepFileText(closurePath, depsToWrite);
  return {errors, text};
}

if (require.main == module) {
  (async () => {
    // Log any uncaught exceptions as these are frowned upon in Node.
    try {
      const result = await main();
      for (const error of result.errors) {
        console.error(error.toString());
      }
      if (result.text) {
        console.log(result.text);
      }
    } catch (e) {
      console.error(e);
    }
  })();
}

module.exports.execute = main;
