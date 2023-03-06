/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/build-infrastructure/tsconfig.json',
    },
  },
  preset: 'ts-jest',
  testEnvironment: 'node',

  /*transform: {
    '^(\\.[jt]sx?$)': 'jest-css-modules-transform',
  },
  */
};
