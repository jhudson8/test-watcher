module.exports = function (options) {
  return function (fileData) {
    return {
      spawnOptions: function () {
        return {
          exec: 'mocha',
          params: [fileData.projectTestFilePath]
        }
      }
    };
  }
};
