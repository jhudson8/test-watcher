# test-watcher
A lightweight un-opinionated watcher which will execute unit tests when either the test or module file changes.  Test driven development is the way to go!

## Setup
```
npm install --save-dev test-watcher
```
Create your test watcher config file `.test-watcher.js` in your project root.
```
// simple example for mocha (you must have mocha installed)
module.exports = {
  style: 'relative', // our test files are relatively located to the module files
  testFileSuffix: '-test', // x.js would have a test file called x-test.js
  testsDirName: '_tests', // foo/bar/x.js would have a test file foo/bar/_tests/x-test.js
  runner: 'mocha', // use the provided "mocha" runner (or your own implementation as a function)
  params: ['-R', 'spec'] // additional parameters to be included when the test is run
};
```

## Running the watcher
As long as you have `node_modules/.bin` in your path
```
test-watcher
```
that's it!


## Configuration Options
You can use a custom file handler (thing that associates test files with module files) but default handler is robust.  Use the `fileHandler` option to provide your own (more details below).

* ***style***: `relative` for test files relative to the module file or N/A for test files in a separate directory
* ***testsDirName***: if `relative` style then the relative dir name for tests;  otherwise the directory under the project root for tests
* ***testFilePrefix***: optional prefix for test files; `x.js` with prefix of `test-` would have a test file of `test-x.js`
* ***testFileSuffix***: optional suffix for test files; `x.js` with suffix of `test-` would have a test file of `x-test.js`
* ***runner***: `mocha` or a custom implementation (more details below)
* ***params***: array of any additional parameters for the test execution
* ***fileHandler***: optional custom function that associates module files with unit test files (usually the default handler will suit your needs)
