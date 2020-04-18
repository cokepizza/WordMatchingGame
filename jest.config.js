module.exports = {
    moduleFileExtensions: ["js", "json", "ts"],
    transform: {
        '^.+\\.(js)?$': 'babel-jest',
    },
    testEnvironment: 'node',
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/$1',
        "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    },
    testMatch: [
        '<rootDir>/**/*.test.(js|ts)', '<rootDir>/(tests/unit/**/*.spec.(js|ts)|**/__tests__/*.(js|ts))'
    ],
    transformIgnorePatterns: ['<rootDir>/node_modules/']
};