module.exports = {
  testEnvironment: 'jsdom',
  preset: 'ts-jest/presets/js-with-babel',
  transform: {
    '^.+\\.svg$': 'jest-transform-stub',
    '^.+\\.tsx?$': ['ts-jest', {}]
  },
  setupFilesAfterEnv: ['<rootDir>/test/setupTest.ts'],
  snapshotSerializers: ['enzyme-to-json/serializer'],
  moduleNameMapper: {
    '^.+\\.(css|less|scss)$': 'identity-obj-proxy',
    '\\.svg$': '<rootDir>/src/__mocks__/svg.ts'
  },
  coverageDirectory: 'coverage',
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/**/*.d.ts',
    '!dist',
    '!coverage'
  ]
};
