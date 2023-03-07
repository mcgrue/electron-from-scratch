module.exports = {
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/build-infrastructure/tsconfig.json',
    },
  },
  transform: {
    '^.+\\.[tj]sx?$': ['ts-jest', {}],
    '^.+\\.css?$': ['<rootDir>/node_modules/jest-css-modules-transform', {}],
  },
};
