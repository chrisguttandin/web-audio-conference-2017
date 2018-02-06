module.exports = {
    analyze: {
        cmd: 'ng build --aot --build-optimizer --prod --sourcemaps --stats-json && (bundle-buddy build/*.map & webpack-bundle-analyzer build/stats.json)'
    },
    build: {
        cmd: "ng build --aot --base-href /web-audio-conference-2017/ --build-optimizer --no-sourcemaps --prod --stats-json && webpack-stats-duplicates build/stats.json --whitelist 'multi ./node_modules/prismjs' && rm build/stats.json"
    },
    continuous: {
        cmd: 'ng test'
    },
    e2e: {
        cmd: 'ng e2e --aot'
    },
    lint: {
        cmd: 'ng lint --type-check'
    },
    monitor: {
        cmd: 'ng serve --aot --port 7733'
    },
    preview: {
        cmd: 'ng serve --aot --build-optimizer --port 7733 --prod'
    },
    smoke: {
        cmd: 'IS_SMOKE_TEST=true ng e2e --serve false && sonarwhal https://chrisguttandin.github.io/web-audio-conference-2017 && rm cdp.pid'
    },
    test: {
        cmd: 'ng test --watch false'
    }
};
