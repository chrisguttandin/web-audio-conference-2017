module.exports = (config) => {

    config.set({

        angularCli: {
            environment: 'dev'
        },

        basePath: '../../',

        client: {
            clearContext: false
        },

        coverageIstanbulReporter: {
            fixWebpackSourcePaths: true,
            reports: [ 'html', 'lcovonly' ]
        },

        files: [
            {
                pattern: './config/karma/test.ts',
                watched: false
            }
        ],

        frameworks: [
            '@angular/cli',
            'jasmine'
        ],

        mime: {
            'text/x-typescript': [ 'ts', 'tsx' ]
        },

        plugins: [
            '@angular/cli/plugins/karma',
            'karma-*'
        ],

        preprocessors: {
            './config/karma/test.ts': [ '@angular/cli' ]
        },

        reporters: config.angularCli && config.angularCli.codeCoverage
            ? [ 'progress', 'coverage-istanbul' ]
            : [ 'progress', 'kjhtml' ]

    });

    if (process.env.TRAVIS) {
        config.set({

            browserNoActivityTimeout: 120000,

            browsers: [
                'ChromeSauceLabs'
            ],

            captureTimeout: 120000,

            customLaunchers: {
                ChromeSauceLabs: {
                    base: 'SauceLabs',
                    browserName: 'chrome',
                    platform: 'OS X 10.11'
                }
            },

            tunnelIdentifier: process.env.TRAVIS_JOB_NUMBER

        });
    } else {
        config.set({

            browsers: [
                'ChromeHeadless'
            ]

        });
    }

};
