import {promises as fsPromises} from 'fs';

/**
 * The transpile enforcer block that will be added to the end of Closure Library
 * JS source files.
 *
 * Note on updating this value:
 * -   The string must start and end with `MOE` strip directive comments (and
 *     blank lines).
 * -   The string must contain go/transpile-js between the `MOE` strip directive
 *     comments.
 *
 * The following is a valid minimal example to remain compatible with
 * `JS_CONTENT_REGEX` (though the resulting JS would not compile):
 *
 *     // MOE:begin_strip
 *     go/transpile-js
 *     // MOE:end_strip
 */
const TRANSPILE_ENFORCER_BLOCK = `

// MOE:begin_strip
// Ensure ES2021 inputs. go/transpile-js
null?.(6_6);
// MOE:end_strip
`;

/**
 * Multi-line regular expression with a capture group for the content of the JS
 * file excluding the transpile enforcer block at the end.
 *
 * Designed to be future-proof towards future updates to
 * `TRANSPILE_ENFORCER_BLOCK`.
 *
 * Note: Make sure not to make this global as it will then have side-effects
 */
const JS_CONTENT_REGEX =
    /^([\w\W]+)\n\/\/ MOE:begin_strip\n.*go\/transpile-js(\n.*)*\/\/ MOE:end_strip\s+$/m;


main()
    .then(() => {
      process.exit(0);
    })
    .catch((e) => {
      console.error(e);
      process.exit(1);
    });


async function main() {
  // Change working directory.
  const google3RootFromBlaze = process.env['BUILD_WORKSPACE_DIRECTORY'];
  if (!google3RootFromBlaze) {
    throw new Error('Run this tool with blaze run!');
  }
  process.chdir(google3RootFromBlaze);

  // The base case does not visit files in the root directory.
  await visitDir('third_party/javascript/closure', /* visitFiles= */ false);

  console.log(`Done! Read ${visited} JS files. Updated ${updated}. ${
      alreadyUpToDate} files were already up to date.`);

  if (readFailedPaths.length > 0) {
    console.warn(`Warning! ${
        readFailedPaths
            .length} JS files were not properly read! Consider re-running this command.\nThe failed files were:\n  ${
        readFailedPaths.join('\n  ')}`);
  }
}

let visited = 0;
let updated = 0;
let alreadyUpToDate = 0;
const readFailedPaths: string[] = [];

async function visitDir(dir: string, visitFiles: boolean) {
  const dirEnts = await fsPromises.readdir(dir, {withFileTypes: true});
  for (const dirEnt of dirEnts) {
    const path = dir + '/' + dirEnt.name;
    if (dirEnt.isDirectory()) {
      await visitDir(path, /* visitFiles= */ true);
    } else if (visitFiles && dirEnt.isFile() && path.endsWith('.js')) {
      await visitJsFile(path);
    }
  }
}

async function visitJsFile(filePath: string) {
  ++visited;

  // No need to read these files as they will never get the transpile enforcer
  // block.
  if (filePath.includes('/testdata/') ||
      filePath.endsWith('_test_vectors.js') && !filePath.endsWith('_test.js')) {
    ++alreadyUpToDate;
    return;
  }

  const content = await fsPromises.readFile(filePath, {encoding: 'utf8'});

  // Get the body of the file ignoring the inserted code-block, if present.
  let body = content;
  const result = JS_CONTENT_REGEX.exec(content);
  if (result != null) {
    body = result[1];
  }

  if (body.trim() === '') {
    readFailedPaths.push(filePath);
    // We did not correctly read the JS file or had some other related error.
    return;
  }

  // At present, we decide which JS files get the transpile enforcer block based
  // on whether the file is a "root" file meaning that it does nto goog.require
  // any other files.
  const fileShouldHaveForceTranspile = !content.includes('goog.require(\'');

  const newContent = fileShouldHaveForceTranspile ?
      body.trimEnd() + TRANSPILE_ENFORCER_BLOCK :
      body;

  // The content is unchanged so don't both writing back the file content.
  if (content === newContent) {
    ++alreadyUpToDate;
    return;
  }

  await fsPromises.writeFile(filePath, newContent, {encoding: 'utf8'});
  console.log(`Updated ${filePath}`);
  ++updated;
}
