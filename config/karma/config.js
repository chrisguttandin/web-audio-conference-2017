const { join } = require('path');

module.exports = (config) => {

    config.set({

        basePath: '../../',

        client: {
            clearContext: false
        },

        coverageIstanbulReporter: {
            dir: join(__dirname, '../../coverage'),
            fixWebpackSourcePaths: true,
            reports: [ 'html', 'lcovonly' ]
        },

        frameworks: [
            '@angular-devkit/build-angular',
            'jasmine'
        ],

        plugins: [
            '@angular-devkit/build-angular/plugins/karma',
            'karma-*'
        ],

        reporters: [ 'progress', 'kjhtml' ]

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
