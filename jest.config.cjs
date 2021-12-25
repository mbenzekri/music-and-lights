module.exports = {
    projects: [
        {
            "preset": "ts-jest",
            rootDir: __dirname,
            displayName: 'dom',
            testEnvironment: 'jsdom',
            moduleFileExtensions : [ "js" ],
            testMatch: [
                "**/*.test.js"
            ],
            "transform": {
                "^.+\\.tsx?$": "ts-jest"
            }
                        },
        {
            "preset": "ts-jest",
            rootDir: __dirname,
            displayName: 'node',
            testEnvironment: 'node',
            moduleFileExtensions : [ "js" ],
            testMatch: [
                "**/*.test.node.js",
            ],
            "transform": {
                "^.+\\.tsx?$": "ts-jest"
            }
        },
    ],
}