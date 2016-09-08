var watcher = require('./watcher');
var runner = require('./runner');

var fileHandler = {
  srcPath: function (options) {
    return '/Users/jhudson/projects/oss/test-watcher-tdd';
  },
  testPath: function (options) {
    return '/Users/jhudson/projects/oss/test-watcher-tdd';
  },
  getFileData: function (options) {
    return {
      testFilePath: options.filePath,
      srcFilePath: options.filePath
    }
  }
};

var runnerHandler = {
  spawnOptions: function (options) {
    return {
      exec: 'node',
      params: ['/Users/jhudson/projects/oss/test-watcher-tdd/test.js']
    };
  }
}

var options = {
  projectPath: '/Users/jhudson/projects/oss/test-watcher-tdd',
  fileHandler: fileHandler,
  runner: runnerHandler
};

watcher(options, function (fileData) {
  runner(options)(fileData, options);
});
