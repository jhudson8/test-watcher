#!/usr/bin/env node
var Path = require('path');
var chalk = require('chalk');

try {
  var options = require(Path.resolve(process.cwd(), '.test-watcher-tdd.js'));
  if (!options) {
    console.log(chalk.red('Missing ".test-watcher-tdd.js" options file'));
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
