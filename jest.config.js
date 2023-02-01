module.exports = {
  collectCoverage: true,
  coveragePathIgnorePatterns: ['/node_modules/', '/__generated__/'],
  testMatch: ['**/src/**/?(*.)test.ts?(x)'],
  testEnvironment: 'jsdom',
}
