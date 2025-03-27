module.exports = () => {
    return {
        'analyze': {
            cmd: `npx ng build --configuration production --source-map --stats-json && \
                webpack-bundle-analyzer build/web-audio-conference-2017/stats.json`
        },
        'build': {
            cmd: 'npx ng build --base-href /web-audio-conference-2017/ --configuration production --subresource-integrity'
        },
        'continuous': {
            cmd: 'npx ng test'
        },
        'e2e': {
            cmd: `npx playwright install --with-deps && \
                npx playwright test --config config/playwright/config.ts`
        },
        'rimraf-source-maps': {
            cmd: 'rimraf build/web-audio-conference-2017/browser/**.map'
        },
        'smoke': {
            cmd: `npx playwright install --with-deps && \
                IS_SMOKE_TEST=true npx playwright test --config config/playwright/config.ts && \
                npx hint --telemetry=off https://chrisguttandin.github.io/web-audio-conference-2017`
        },
        'test': {
            cmd: 'npx ng test --watch false'
        },
        'verify': {
            cmd: `npx bundle-buddy build/web-audio-conference-2017/browser/*.js.map && \
                grep -r build/web-audio-conference-2017/browser/*.js.map -e '/environments/environment.ts'; test $? -eq 1`
        }
    };
};
