var watcher = require('./watcher');
var runner = require('./runner');
var runners = require('./runners');
var defaultFileHandler = require('./default-file-handler');

module.exports = function (options) {
  options = Object.assign({
    projectPath: process.cwd()
  }, options);

  // provide most common defaults for module file <-> test file associations
  var fileHandler = options.fileHandler;
  if (!fileHandler) {
    fileHandler = defaultFileHandler;
  }
  fileHandler = fileHandler(options);

  var runnerHandler = options.runner;
  // allow for standard runner replacement
  if (typeof runnerHandler === 'string') {
    runnerHandler = runners[runnerHandler] || options.runner;
  }
  if (!runnerHandler)  {
    throw new Error('the "runner" option must be provided');
  } else if (typeof runnerHandler === 'string') {
    throw new Error('invalid runner type: "' + runnerHandler + '"');
  } else if (typeof runnerHandler !== 'function') {
    throw new Error('invalid runner type: "' + typeof runnerHandler + '"');
  }
  runnerHandler = runnerHandler(options);

  watcher(options, fileHandler)(runner(options, runnerHandler));
}
