var Path = require('path');
var _handler = require('../lib/file-handler/relative-file-handler');

var projectPath = '/foo/bar';

describe('default-file-handler', function () {
  describe('relative file handler', function () {
    var options = function (additl) {
      return Object.assign(additl, {
        projectPath: projectPath
      });
    };

    describe('default format', function () {
      var _options = options({});
      var handler = _handler(_options);

      it('should have correct test and src path', function () {
        testSourcePath(handler, _options, '');
        expect(handler.testPath(_options)).to.equal(false);
      });

      var filePath = 'beep/boop.js';
      var testFilePath = 'beep/boop-test.js';
      it('should resolve using module file path', function () {
        var fileData = handler.getFileData({
          isKnownTestFile: false,
          projectPath: projectPath,
          basePath: projectPath,
          filePath: filePath,
          absoluteFilePath: Path.resolve(projectPath, filePath)
        });
        expect(fileData).to.eql({
          testFilePath: Path.resolve(projectPath, testFilePath),
          moduleFilePath: Path.resolve(projectPath, filePath)
        });
      });

      it('should resolve using test file path', function () {
        fileData = handler.getFileData({
          isKnownTestFile: false,
          projectPath: projectPath,
          basePath: projectPath,
          filePath: testFilePath,
          absoluteFilePath: Path.resolve(projectPath, testFilePath)
        });
        expect(fileData).to.eql({
          testFilePath: Path.resolve(projectPath, testFilePath),
          moduleFilePath: Path.resolve(projectPath, filePath)
        });
      });
    });

    describe('testsPath and prefix/suffix and srcDirName', function () {
      var _options = options({
        srcDirName: 'src/more',
        testsDirName: '_tests',
        testFilePrefix: '_test-',
        testFileSuffix: '-test'
      });
      var handler = _handler(_options);

      it('should have correct test and src path', function () {
        testSourcePath(handler, _options, 'src/more');
        expect(handler.testPath(_options)).to.equal(false);
      });

      var filePath = 'beep/boop.js';
      var testFilePath = 'beep/_tests/_test-boop-test.js';
      it('should resolve using module file path', function () {
        var fileData = handler.getFileData({
          isKnownTestFile: false,
          projectPath: projectPath,
          basePath: Path.resolve(projectPath, 'src/more'),
          filePath: filePath,
          absoluteFilePath: Path.resolve(projectPath, 'src/more', filePath)
        });
        expect(fileData).to.eql({
          testFilePath: Path.resolve(projectPath, 'src/more', testFilePath),
          moduleFilePath: Path.resolve(projectPath, 'src/more', filePath)
        });
      });

      it('should resolve using test file path', function () {
        fileData = handler.getFileData({
          isKnownTestFile: false,
          projectPath: projectPath,
          basePath: Path.resolve(projectPath, 'src/more'),
          filePath: testFilePath,
          absoluteFilePath: Path.join(projectPath, 'src/more', testFilePath)
        });
        expect(fileData).to.eql({
          testFilePath: Path.resolve(projectPath, 'src/more', testFilePath),
          moduleFilePath: Path.resolve(projectPath, 'src/more', filePath)
        });
      });
    });

  });
});

function testSourcePath (handler, options, path) {
  expect(handler.srcPath(options)).to.equal(Path.resolve(projectPath, path));
}
