// assume tests are in a directory relative to the module file
var Path = require('path');
var Util = require('./util');

module.exports = function (handlerOptions) {
  var _srcPath = srcPath(handlerOptions);
  var testsDirName = handlerOptions.testsDirName;
  var srcDirName = handlerOptions.srcDirName;
  if (!testsDirName && !handlerOptions.testFilePrefix && !handlerOptions.testFileSuffix) {
    // no defaults are provide and we can't have module files with the same absolute path
    handlerOptions.testFileSuffix = '-test';
  }
  var testFilePrefix = handlerOptions.testFilePrefix;
  var testFileSuffix = handlerOptions.testFileSuffix;

  return {
    srcPath: srcPath,
    testPath: function () { return false; },
    getFileData (options) {
      var testFilePath, moduleFilePath, isTestFile;

      if (testsDirName) {
        // tests are in a sub directory
        var pathParts = Path.dirname(options.filePath).split(Path.sep);
        var dirName = pathParts[pathParts.length - 1];
        var isTestFile = dirName === testsDirName;
        if (isTestFile) {
          // it is a test file
          testFilePath = options.absoluteFilePath;
          moduleFileName = Util.resolveModuleFileNameFromTestFileName(options.filePath, handlerOptions);
          moduleFilePath = Path.resolve(
            options.projectPath,
            srcDirName || '',
            Path.dirname(options.filePath),
            '../',
            moduleFileName
          );
        } else {
          // it is a module file
          moduleFilePath = options.absoluteFilePath;
          testFilePath = Path.resolve(
            options.projectPath,
            srcDirName || '',
            Path.dirname(options.filePath),
            handlerOptions.testsDirName || '',
            Util.resolveTestFileNameFromModuleFileName(options.filePath, handlerOptions)
          );
        }

      } else {
        // tests are in the same directory
        var moduleOrTestName = Util.removeFileExt(Path.basename(options.filePath));
        if (testFilePrefix) {
          isTestFile = moduleOrTestName.indexOf(testFilePrefix) === 0;
        }
        if (testFileSuffix) {
          var suffixIndex = moduleOrTestName.indexOf(testFileSuffix);
          var isStillTestFile = suffixIndex === moduleOrTestName.length - testFileSuffix.length && suffixIndex > -1;
          isTestFile = isTestFile ? isTestFile && isStillTestFile : isStillTestFile;
        }

        if (isTestFile) {
          // it is a test file
          testFilePath = options.absoluteFilePath;
          moduleFilePath = Path.resolve(
            options.projectPath,
            srcDirName || '',
            Path.dirname(options.filePath),
            Util.resolveModuleFileNameFromTestFileName(options.filePath, handlerOptions)
          );
        } else {
          // it is a module file
          moduleFilePath = options.absoluteFilePath;
          testFilePath = Path.resolve(
            options.projectPath,
            srcDirName || '',
            Path.dirname(options.filePath),
            Util.resolveTestFileNameFromModuleFileName(options.filePath, handlerOptions)
          );
        }
      }

      return {
        testFilePath: testFilePath,
        moduleFilePath: moduleFilePath,
        glob: [
          srcDirName ? srcDirName + '/' : '*/',
          '**/',
          testsDirName ? testsDirName + '/' : '',
          testFilePrefix ? testFilePrefix : '',
          '*',
          testFileSuffix ? testFileSuffix : '',
          '.js'
        ].join('')
      };
    }
  }
}

function srcPath (options) {
  return Path.resolve(options.projectPath, options.srcDirName || '');
}
