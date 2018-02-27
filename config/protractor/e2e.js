const { SpecReporter } = require('jasmine-spec-reporter');
const tsNode = require('ts-node');

exports.config = {

    allScriptsTimeout: 11000,

    capabilities: {
        browserName: 'chrome',
        chromeOptions: {
            args: [ '--disable-gpu', '--force-device-scale-factor=1', '--headless', '--window-size=1024,768' ]
        }
    },

    directConnect: true,

    framework: 'jasmine',

    jasmineNodeOpts: {
        defaultTimeoutInterval: 30000,
        print () {},
        showColors: true
    },

    onPrepare () {
        tsNode.register({
            project: 'test/e2e'
        });

        jasmine.getEnv().addReporter(new SpecReporter({ spec: { displayStacktrace: true } })); // eslint-disable-line no-undef
    },

    suites: {
        e2e: '../../test/e2e/**/*.ts',
        regression: '../../test/regression/**/*.ts'
    }

};
