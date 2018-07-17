const { SpecReporter } = require('jasmine-spec-reporter');
const { env } = require('process');
const tsNode = require('ts-node');

// eslint-disable-next-line padding-line-between-statements
const chromeCapabilities = {
    browserName: 'chrome',
    chromeOptions: {
        args: [ '--device-scale-factor=2', '--disable-gpu', '--force-device-scale-factor=2', '--headless', '--window-size=1024,768' ]
    }
};

exports.config = {

    allScriptsTimeout: 11000,

    directConnect: !!env.TRAVIS,

    framework: 'jasmine',

    jasmineNodeOpts: {
        defaultTimeoutInterval: 30000,
        print () {},
        showColors: true
    },

    multiCapabilities: (env.TRAVIS) ?
        [ chromeCapabilities ] :
        [ chromeCapabilities, { browserName: 'safari' } ],

    onPrepare () {
        tsNode.register({
            project: 'test/e2e/tsconfig.json'
        });

        jasmine.getEnv().addReporter(new SpecReporter({ spec: { displayStacktrace: true } })); // eslint-disable-line no-undef
    },

    suites: {
        e2e: '../../test/e2e/**/*.ts',
        regression: '../../test/regression/**/*.ts'
    }

};
