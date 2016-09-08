// fileData { testFilePath, moduleFilePath }

var Path = require('path');
var relativeFileHandler = require('./relative-file-handler');

module.exports = function (options) {
  if (options.style === 'relative') {
    return relativeFileHandler(options);
  }
};
