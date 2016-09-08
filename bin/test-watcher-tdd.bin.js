#!/usr/bin/env node
var Path = require('path');
var chalk = require('chalk');

try {
  var options;
  var path = Path.resolve(process.cwd(), '.test-watcher-tdd.js');
  try {
    requre.resolve(path);
  } catch (e) {
    console.log('missing .test-watcher-tdd.js file.  defaulting to { style: "relative", testFileSuffix: "-test", runner: "mocha", params: ["-R", "spec"] }');
    options = { style: 'relative', testFileSuffix: '-test', runner: 'mocha', params: ['-R', 'spec'] };
  }
  if (!options) {
    options = require(path);
  }

  if (!options) {
    console.log(chalk.red('".test-watcher-tdd.js" did not export any configuration'));
    process.exit(-1);
  } else if (typeof options === 'function') {
    options = options() || {};
  }
} catch (e) {
  console.log(chalk.red('Invalid ".test-watcher-tdd.js" options file'));
  process.exit(-2);
}

var exec = require('../lib/exec');
exec(options);
