const { join } = require('path');
const { env } = require('process');

module.exports = (config) => {
    config.set({
        basePath: '../../',

        browserDisconnectTimeout: 100000,

        browserNoActivityTimeout: 100000,

        client: {
            clearContext: false
        },

        coverageReporter: {
            dir: join(__dirname, '../../coverage/web-audio-conference-2017'),
            reporters: [{ type: 'html' }, { type: 'text-summary' }],
            subdir: '.'
        },

        frameworks: ['@angular-devkit/build-angular', 'jasmine'],

        jasmineHtmlReporter: {
            suppressAll: true
        },

        plugins: ['@angular-devkit/build-angular/plugins/karma', 'karma-*'],

        reporters: ['progress', 'kjhtml'],

        restartOnFileChange: true
    });

    if (env.CI) {
        config.set({
            browsers: ['ChromeSauceLabs'],

            captureTimeout: 300000,

            customLaunchers: {
                ChromeSauceLabs: {
                    base: 'SauceLabs',
                    browserName: 'chrome',
                    captureTimeout: 300,
                    platform: 'macOS 12'
                }
            },

            sauceLabs: {
                recordVideo: false
            }
        });
    } else {
        config.set({
            browsers: ['ChromeHeadless']
        });
    }
};
