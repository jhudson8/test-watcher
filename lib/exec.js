var watcher = require('./watcher');
var runner = require('./runner');
var defaultFileHandler = require('./file-handler/default-file-handler');

module.exports = function (options) {
  options = Object.assign({
    projectPath: process.cwd()
  }, options);

  // provide most common defaults for module file <-> test file associations
  if (!options.fileHandler) {
    options.fileHandler = defaultFileHandler;
  }
  options.fileHandler = options.fileHandler(options);

  watcher(options)(runner(options));
}
