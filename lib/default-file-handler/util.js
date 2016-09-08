var Path = require('path');

module.exports = {
  resolveModuleFileNameFromTestFileName: resolveModuleFileNameFromTestFileName,
  resolveTestFileNameFromModuleFileName: resolveTestFileNameFromModuleFileName,
  removeFileExt: removeFileExt
};

function resolveModuleFileNameFromTestFileName (fileName, options) {
  fileName = Path.basename(fileName);
  var testFileSuffix = options.testFileSuffix;
  var testFilePrefix = options.testFilePrefix;

  var moduleName = fileName.replace(/\..*/, '');
  if (testFileSuffix) {
    moduleName = moduleName.substr(0, moduleName.length - testFileSuffix.length);
  }
  if (testFilePrefix) {
    moduleName = moduleName.substr(testFilePrefix.length);
  }
  return moduleName + '.js';
}

function resolveTestFileNameFromModuleFileName (fileName, options) {
  fileName = Path.basename(fileName);
  var testFileSuffix = options.testFileSuffix;
  var testFilePrefix = options.testFilePrefix;

  var moduleName = fileName.replace(/\..*/, '');
  if (testFileSuffix) {
    moduleName = moduleName + testFileSuffix;
  }
  if (testFilePrefix) {
    moduleName = testFilePrefix + moduleName;
  }
  return moduleName + '.js';
}

function removeFileExt (fileName) {
  return fileName.replace(/\..*/, '');
}
