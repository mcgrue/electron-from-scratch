module.exports = {
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/build-infrastructure/tsconfig.json',
    },
    TextEncoder: require('util').TextEncoder,
    TextDecoder: require('util').TextDecoder,
  },
  testEnvironment: 'node',
  transform: {
    '^.+\\.[tj]sx?$': ['ts-jest', {}],
    '^.+\\.css?$': ['<rootDir>/node_modules/jest-css-modules-transform', {}],
  },
};
