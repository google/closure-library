const Buffer = require('buffer').Buffer;
const {parser, depGraph, depFile} = require('google-closure-deps');
const path = require('path');
const PluginError = require('plugin-error');
const through = require('through2');
const Vinyl = require('vinyl');

const PLUGIN_NAME = 'gulp-google-closure-deps';

let files = [];
let argsClosurePath;

function transformFunc(file, enc, cb) {
  if (file.isNull()) return;
  if (file.isStream()) {
    throw new PluginError(PLUGIN_NAME, 'Streaming not supported');
  }
  files.push(file);
  cb();
}

function flushFunc(cb) {
  const results = files.map((file) => parser.parseFile(file.path).dependency);
  const graph = new depGraph.Graph(results);

  if (!argsClosurePath && !graph.depsBySymbol.has('goog')) {
    throw new Error(
        'Could not find path to Closure. Closure\'s base.js either needs to ' +
        'be included or specified in argument.');
  }
  const closurePath =
      argsClosurePath || path.dirname(graph.depsBySymbol.get('goog').path);
  const deps = depFile.getDepFileText(closurePath, results);

  const depsFile = new Vinyl({
    base: '/public/',
    contents: new Buffer(deps),
    cwd: '/',
    path: '/public/deps.js',
  });

  this.push(depsFile);
  cb();
}

function main(arg = {}) {
  argsClosurePath = arg.closurePath;
  return through.obj(transformFunc, flushFunc);
}

module.exports = main;
