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

const ArgumentParser = require('argparse').ArgumentParser;
const depFile = require('../lib/depfile');
const depGraph = require('../lib/depgraph');
const fs = require('fs');
const parser = require('../lib/parser');
const path = require('path');
const process = require('process');

const argparser = new ArgumentParser({
  version: '0.0.1',
  addHelp: true,
  description: 'Utility for Closure Library dependency calculation.'
});

argparser.addArgument(['-f', '--file'], {
  dest: 'inputs',
  action: 'append',
  defaultValue: [],
  help: 'One or more input files to calculate dependencies ' +
      'for.  The namespaces in these file will be combined with ' +
      'those given with the --root flag to form the set of ' +
      'namespaces to find dependencies for.',
});

argparser.addArgument(['-e', '--exclude'], {
  dest: 'exclude',
  action: 'append',
  defaultValue: [],
  help: 'One or more path prefixes to ignore. Useful when  combined with the ' +
      '--root flag to ignore specific subfiles or subdirectories.',
});

argparser.addArgument('--root', {
  dest: 'roots',
  action: 'append',
  defaultValue: [],
  help: 'Directories to scan for JavaScript (.js) files to include as ' +
      'inputs. These directories are scanned recursivley.',
});

argparser.addArgument('--closure-path', {
  dest: 'closurePath',
  help: 'Path to the Closure Library (folder containing the base.js file). ' +
      'Required unless the path can be determined automatically by base.js ' +
      'being included among the input files.'
});

/**
 * Resolves the given path against the working directory.
 * @param {string} p
 * @return {string}
 */
function resolve(p) {
  return path.resolve(process.cwd(), p);
}

/**
 * @param {function(...?)} fn
 * @param {...?} args
 * @return {Promise<?>}
 */
function promisify(fn, ...args) {
  return new Promise((resolve, reject) => {
    fn(...args, (err, arg) => err ? reject(err) : resolve(arg));
  });
}

/**
 * @param {string} pathToScan
 * @param {!Set<string>} excluded
 * @return {!Promise<!Array<string>>}
 */
async function findAllJsFiles(pathToScan, excluded) {
  if (excluded.has(pathToScan)) {
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
 * @param {!Array<string>=} opt_args
 * @return {!Promise<{errors:!Array<!ParseError>,text:(string|undefined)}>}
 */
async function main(opt_args) {
  const args = argparser.parseArgs(opt_args);

  if (!args.inputs && !args.roots) {
    argparser.error('Must supply inputs and/or roots.');
    return;
  }

  const sources = new Set((args.inputs || []).map(resolve));
  const roots = (args.roots || []).map(resolve);
  const excluded = new Set((args.exclude || []).map(resolve));

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

  const deps = results.map(r => r.dependency);
  // Make a graph to perform validation and potentially get the path to Closure.
  const graph = new depGraph.Graph(deps);

  if (!args.closurePath && !graph.depsBySymbol.has('goog')) {
    throw new Error(
        'Could not find path to Closure. Closure\'s base.js either needs to ' +
        'be included or --closure-path provided.');
  }

  const closurePath =
      args.closurePath || path.dirname(graph.depsBySymbol.get('goog').path);

  const text = depFile.getDepFileText(closurePath, deps);
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
