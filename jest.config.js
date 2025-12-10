module.exports = {
  moduleFileExtensions: ['js', 'json', 'vue'],
  transform: {
    '^.+\\.vue$': 'vue-jest',
    '^.+\\.js$': 'babel-jest'
  },
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/resources/js/$1',
    '\\.(css|less|scss)$': 'identity-obj-proxy'
  },
  snapshotSerializers: ['jest-serializer-vue'],
  testMatch: ['**/tests/js/**/*.spec.{js,jsx}'],
  setupFilesAfterEnv: ['<rootDir>/tests/js/setup.js'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/resources/js/$1',
    '\\.(css|less|scss)$': 'identity-obj-proxy',
    '^tinymce$': '<rootDir>/tests/js/mocks/tinymce.js'
  }
};
