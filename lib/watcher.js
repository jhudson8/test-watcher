var fs = require('fs');
var Path = require('path');

module.exports = function (options) {
  var fileHandler = options.fileHandler;
  var srcBasePath = fileHandler.srcPath(options);
  var testBasePath = fileHandler.testPath(options);
  var projectPath = options.projectPath;

  return function (callback) {
    if (!srcBasePath) {
      throw new Error('File handler must provide "srcPath"');
    }

    function onFileChanaged (basePath, isKnownTestFile) {
      return function (eventType, filePath) {
        if (filePath) {
          var options = {
            isKnownTestFile: isKnownTestFile,
            projectPath: projectPath,
            basePath: basePath,
            filePath: filePath,
            absoluteFilePath: Path.join(basePath, filePath)
          };
          console.log('OPTIONS ', options);
          var fileData = fileHandler.getFileData(options);
          if (fileData) {
            fileData = Object.assign(options, fileData);
            console.log('CALLBACK: ', fileData);
            callback(fileData);
          } else {
            console.log('no file data');
          }
        }
      }
    }

    watchPath(srcBasePath, onFileChanaged(srcBasePath, false));
    if (testBasePath && testBasePath !== srcBasePath) {
      watchPath(testBasePath, onFileChanaged(testBasePath, true));
    }
  };
}

function watchPath (basePath, handler) {
  fs.watch(basePath, { recursive: true }, handler);
  console.log('watching ' + basePath);
}
