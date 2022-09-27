module.exports = {
    analyze: ['sh:analyze'],
    build: [
        'sh:build',
        'sh:verify',
        'clean:source-maps',
        'replace:bundle',
        'copy:404',
        'replace:runtime',
        'clean:runtime',
        'replace:csp-production',
        'htmlmin',
        'replace:manifest'
    ],
    continuous: ['sh:continuous'],
    e2e: ['sh:e2e'],
    lint: ['sh:lint-config', 'sh:lint-src', 'sh:lint-test'],
    monitor: ['sh:monitor'],
    preview: ['sh:preview'],
    smoke: ['sh:smoke'],
    test: ['sh:test']
};
