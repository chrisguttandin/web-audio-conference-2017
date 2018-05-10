module.exports = {
    analyze: {
        cmd: 'ng build --prod --source-map --stats-json && (bundle-buddy build/web-audio-conference-2017/*.js.map & webpack-bundle-analyzer build/web-audio-conference-2017/stats.json)'
    },
    build: {
        cmd: 'ng build --base-href /web-audio-conference-2017/ --no-source-map --prod --subresource-integrity'
    },
    continuous: {
        cmd: 'ng test'
    },
    e2e: {
        cmd: (process.env.TRAVIS) ?
            'ng e2e' :
            'webdriver-manager update && ng e2e --no-webdriver-update'
    },
    lint: {
        cmd: 'ng lint web-audio-conference-2017 --type-check && ng lint web-audio-conference-2017-e2e --type-check && ng lint web-audio-conference-2017-unit --type-check'
    },
    monitor: {
        cmd: 'ng serve --aot --port 7733'
    },
    preview: {
        cmd: 'ng serve --aot --build-optimizer --port 7733 --prod'
    },
    smoke: {
        cmd: (process.env.TRAVIS) ?
            "IS_SMOKE_TEST=true ng e2e --dev-server-target '' && sonarwhal https://chrisguttandin.github.io/web-audio-conference-2017 && rm cdp.pid" :
            "webdriver-manager update && IS_SMOKE_TEST=true ng e2e --dev-server-target '' --no-webdriver-update && sonarwhal https://chrisguttandin.github.io/web-audio-conference-2017 && rm cdp.pid"
    },
    test: {
        cmd: 'ng test --watch false'
    }
};
