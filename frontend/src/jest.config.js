module.exports = {
    transform: {
      '^.+\\.jsx?$': 'babel-jest', // Use Babel for transforming JS files
    },
    transformIgnorePatterns: [
      'node_modules/(?!(axios)/)', // Allow Jest to transform axios
    ],
    testEnvironment: 'jsdom', // For DOM-related testing
  };
  