module.exports = {
  jest: (config) => {
    config.moduleFileExtensions = ['js', 'jsx', 'ts', 'tsx'];
    config.testEnvironment = 'node';
    return config;
  },
};
