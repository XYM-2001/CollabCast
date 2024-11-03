// jest.config.js
module.exports = {
    setupFilesAfterEnv: ['<rootDir>/frontend/src/setupTests.js'],
    testEnvironment: 'jsdom',
    moduleFileExtensions: ['js', 'jsx'],
    transform: {
        '^.+\\.jsx?$': 'babel-jest',
    },
    moduleNameMapper: {
        '\\.(css|less)$': '<rootDir>/frontend/__mocks__/styleMock.js',
    },
};