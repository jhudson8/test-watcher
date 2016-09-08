var clear = require('clear');
var chalk = require('chalk');
var spawn = require('child_process').spawn;

module.exports = function (options, runner) {
  var projectPath = options.projectPath;

  return function (fileData) {
    clear();

    var handler = runner(fileData);
    var spawnOptions = handler.spawnOptions(fileData);
    var params = [].concat(spawnOptions.params || []).concat(options.params || []);
    var stdoutLogged;
    var error;
    console.log(spawnOptions.exec + ' ' + params.join(' '));

    try {
      var cmd = spawn(spawnOptions.exec, params, { stdio: "inherit" });
      cmd.on('close', function (code) {
        if (code !== 0) {
          beep();
        }
      });
      cmd.on('error', function (code) {
        error = code;
      });
    } catch (e) {
      logSpawnError(spawnOptions);
    }
  }
};

function beep () {
  console.log('\007');
}

function logSpawnError(spawnOptions, code) {
  console.error(chalk.red('error spawning process: ' + code));
}
