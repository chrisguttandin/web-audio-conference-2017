const { SpecReporter } = require('jasmine-spec-reporter');
const tsNode = require('ts-node');

exports.config = {

    allScriptsTimeout: 11000,

    capabilities: {
        browserName: 'chrome'
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

    specs: [
        '../../test/e2e/**/*.ts'
    ]

};
