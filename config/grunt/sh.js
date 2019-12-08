const { env } = require('process');
const documentConfig = require('../htmlhint/document');
const templateConfig = require('../htmlhint/template');

// eslint-disable-next-line padding-line-between-statements
const convertConfig = (config) => Object
    .entries(config)
    .map(([ key, value ]) => (typeof value === 'string') ? `${ key }=${ value }` : key)
    .join(',');

module.exports = (grunt) => {
    const fix = (grunt.option('fix') === true);

    return {
        'analyze': {
            cmd: 'ng build --prod --source-map --stats-json && webpack-bundle-analyzer build/web-audio-conference-2017/stats.json'
        },
        'build': {
            cmd: 'ng build --base-href /web-audio-conference-2017/ --prod --subresource-integrity'
        },
        'continuous': {
            cmd: 'ng test'
        },
        'e2e': {
            cmd: (env.TRAVIS) ?
                'ng e2e' :
                'webdriver-manager update && ng e2e --no-webdriver-update'
        },
        'lint-config': {
            cmd: `eslint --config config/eslint/config.json ${ (fix) ? '--fix ' : '' }--report-unused-disable-directives *.js config/**/*.js`
        },
        'lint-src': {
            cmd: `htmlhint --rules ${ convertConfig(documentConfig) } 'src/**/index.html' && htmlhint --rules ${ convertConfig(templateConfig) } 'src/app/**/*.component.html' && ng lint web-audio-conference-2017 --type-check`
        },
        'lint-test': {
            cmd: 'ng lint web-audio-conference-2017 --configuration test'
        },
        'monitor': {
            cmd: 'ng serve --aot'
        },
        'preview': {
            cmd: 'ng serve --aot --prod'
        },
        'smoke': {
            cmd: (env.TRAVIS) ?
                "IS_SMOKE_TEST=true ng e2e --dev-server-target '' && hint --telemetry=off https://chrisguttandin.github.io/web-audio-conference-2017" :
                "webdriver-manager update && IS_SMOKE_TEST=true ng e2e --dev-server-target '' --no-webdriver-update && hint --telemetry=off https://chrisguttandin.github.io/web-audio-conference-2017"
        },
        'test': {
            cmd: 'ng test --watch false'
        },
        'verify': {
            cmd: "bundle-buddy build/web-audio-conference-2017/*.js.map && grep -r build/**/*.map -e '/environments/environment.ts'; test $? -eq 1"
        }
    };
};
