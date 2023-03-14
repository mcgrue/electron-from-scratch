module.exports = {
  globals: {
    __TEST__: true,
    TextEncoder,
    TextDecoder,
    'ts-jest': {
      tsconfig: 'tsconfig.json',
    },
  },
  cache: false,
  //testEnvironment: 'jsdom',
  transform: {
    '.+\\.(ts|tsx|js|jsx)$': 'ts-jest',
    '.+\\.(css|styl|less|sass|scss)$': 'jest-css-modules-transform',
  },
  setupFiles: ['<rootDir>/test-infrastructure/globalInclude.js'],
};
