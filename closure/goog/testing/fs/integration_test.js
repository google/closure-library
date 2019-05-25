// Copyright 2011 The Closure Library Authors. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS-IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

goog.module('goog.testing.fs.integrationTest');
goog.setTestOnly();

const FsDirectoryEntry = goog.require('goog.fs.DirectoryEntry');
const FsError = goog.require('goog.fs.Error');
const FsFileSaver = goog.require('goog.fs.FileSaver');
const GoogPromise = goog.require('goog.Promise');
const PropertyReplacer = goog.require('goog.testing.PropertyReplacer');
const events = goog.require('goog.events');
const googFs = goog.require('goog.fs');
const testSuite = goog.require('goog.testing.testSuite');
const testingFs = goog.require('goog.testing.fs');

const TEST_DIR = 'goog-fs-test-dir';

const Behavior = FsDirectoryEntry.Behavior;
const EventType = FsFileSaver.EventType;
const ReadyState = FsFileSaver.ReadyState;

const deferredFs = testingFs.getTemporary();

function loadTestDir() {
  return deferredFs.then(
      (fs) => fs.getRoot().getDirectory(TEST_DIR, Behavior.CREATE));
}

function loadFile(filename, behavior) {
  return loadTestDir().then((dir) => dir.getFile(filename, behavior));
}

function loadDirectory(filename, behavior) {
  return loadTestDir().then((dir) => dir.getDirectory(filename, behavior));
}

function startWrite(content, fileEntry) {
  return fileEntry.createWriter()
      .then(goog.partial(checkReadyState, ReadyState.INIT))
      .then((writer) => {
        writer.write(googFs.getBlob(content));
        return writer;
      })
      .then(goog.partial(checkReadyState, ReadyState.WRITING));
}

function waitForEvent(type, target) {
  return new GoogPromise((resolve, reject) => {
    events.listenOnce(target, type, resolve);
  });
}

function writeToFile(content, fileEntry) {
  return startWrite(content, fileEntry)
      .then(goog.partial(waitForEvent, EventType.WRITE))
      .then(() => fileEntry);
}

function checkFileContent(content, fileEntry) {
  return fileEntry.file()
      .then((blob) => googFs.blobToString(blob))
      .then(goog.partial(assertEquals, content));
}

function checkFileRemoved(filename) {
  return loadFile(filename)
      .then(goog.partial(fail, 'expected file to be removed'))
      .thenCatch((err) => {
        assertEquals(err.code, FsError.ErrorCode.NOT_FOUND);
        return true;  // Go back to the non-rejected path.
      });
}

function checkReadyState(expectedState, writer) {
  assertEquals(expectedState, writer.getReadyState());
  return writer;
}
testSuite({
  setUpPage() {
    testingFs.install(new PropertyReplacer());
  },

  tearDown() {
    return loadTestDir().then((dir) => dir.removeRecursively());
  },

  testWriteFile() {
    return loadFile('test', Behavior.CREATE)
        .then(goog.partial(writeToFile, 'test content'))
        .then(goog.partial(checkFileContent, 'test content'));
  },

  testRemoveFile() {
    return loadFile('test', Behavior.CREATE)
        .then(goog.partial(writeToFile, 'test content'))
        .then((fileEntry) => fileEntry.remove())
        .then(goog.partial(checkFileRemoved, 'test'));
  },

  testMoveFile() {
    const subdir = loadDirectory('subdir', Behavior.CREATE);
    const writtenFile = loadFile('test', Behavior.CREATE)
                            .then(goog.partial(writeToFile, 'test content'));

    return GoogPromise.all([subdir, writtenFile])
        .then((results) => {
          const dir = results[0];
          const fileEntry = results[1];
          return fileEntry.moveTo(dir);
        })
        .then(goog.partial(checkFileContent, 'test content'))
        .then(goog.partial(checkFileRemoved, 'test'));
  },

  testCopyFile() {
    const file = loadFile('test', Behavior.CREATE);
    const subdir = loadDirectory('subdir', Behavior.CREATE);
    const writtenFile = file.then(goog.partial(writeToFile, 'test content'));

    return GoogPromise.all([subdir, writtenFile])
        .then((results) => {
          const dir = results[0];
          const fileEntry = results[1];
          return fileEntry.copyTo(dir);
        })
        .then(goog.partial(checkFileContent, 'test content'))
        .then(() => file)
        .then(goog.partial(checkFileContent, 'test content'));
  },

  testAbortWrite() {
    const file = loadFile('test', Behavior.CREATE);

    file.then(goog.partial(startWrite, 'test content'))
        .then((writer) => {
          writer.abort();
          return writer;
        })
        .then(goog.partial(waitForEvent, EventType.ABORT));

    return file.then(goog.partial(checkFileContent, ''));
  },

  testSeek() {
    const file = loadFile('test', Behavior.CREATE);

    return file.then(goog.partial(writeToFile, 'test content'))
        .then((fileEntry) => fileEntry.createWriter())
        .then(goog.partial(checkReadyState, ReadyState.INIT))
        .then((writer) => {
          writer.seek(5);
          writer.write(googFs.getBlob('stuff and things'));
          return writer;
        })
        .then(goog.partial(checkReadyState, ReadyState.WRITING))
        .then(goog.partial(waitForEvent, EventType.WRITE))
        .then(() => file)
        .then(goog.partial(checkFileContent, 'test stuff and things'));
  },

  testTruncate() {
    const file = loadFile('test', Behavior.CREATE);

    return file.then(goog.partial(writeToFile, 'test content'))
        .then((fileEntry) => fileEntry.createWriter())
        .then(goog.partial(checkReadyState, ReadyState.INIT))
        .then((writer) => {
          writer.truncate(4);
          return writer;
        })
        .then(goog.partial(checkReadyState, ReadyState.WRITING))
        .then(goog.partial(waitForEvent, EventType.WRITE))
        .then(() => file)
        .then(goog.partial(checkFileContent, 'test'));
  },
});
