module.exports = {
    a11y: ['axe-webdriver'],
    analyze: ['sh:analyze'],
    continuous: ['sh:continuous'],
    deploy: [
        'sh:build',
        'sh:verify',
        'clean:source-maps',
        'replace:bundle',
        'copy:404',
        'replace:runtime',
        'clean:runtime',
        'replace:csp-production',
        'htmlmin',
        'replace:manifest',
        'gh-pages:deploy',
        'smoke'
    ],
    e2e: ['sh:e2e'],
    lint: ['sh:lint-config', 'sh:lint-src', 'sh:lint-test'],
    monitor: ['sh:monitor'],
    preview: ['sh:preview'],
    smoke: ['sh:smoke'],
    test: ['sh:test']
};
