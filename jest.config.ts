import { Config } from 'jest';
import nextJest from 'next/jest';
import { pathsToModuleNameMapper } from 'ts-jest';

import tsConfig from './tsconfig.json';

const compilerOptions = tsConfig.compilerOptions;

// this creates a module name map based on all the path aliases from tsconfig
// (so you only need to add path aliases in tsconfig, not here).
const moduleNameMapper = compilerOptions.paths
  ? pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/' })
  : {};

const testPathIgnorePatterns = [
  '<rootDir>/node_modules',
  'src/tests/factories',
  'src/tests/tests/e2e',
];

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
});

// Add any custom config to be passed to Jest
/** @type {import('jest').Config} */
const config: Config = {
  // Add more setup options before each test is run
  preset: 'ts-jest',
  testPathIgnorePatterns,
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  globalSetup: '<rootDir>/jest.globalSetup.ts',
  globalTeardown: '<rootDir>/jest.globalTeardown.ts',
  testEnvironment: 'jest-environment-jsdom',
  transformIgnorePatterns: ['/node_modules/(?!(@swc|@trpc))/'],
  globals: {
    'ts-jest': {
      tsconfig: {
        jsx: 'react-jsx',
      },
    },
  },
  moduleNameMapper: {
    ...moduleNameMapper,
    // Handle image imports
    // https://jestjs.io/docs/webpack#handling-static-assets
    '^.+\\.(png|jpg|jpeg|gif|webp|avif|ico|bmp|svg)$/i': `<rootDir>/__mocks__/fileMock.js`,
  },
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(config);
