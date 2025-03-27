module.exports = {
    analyze: ['sh:analyze'],
    build: ['sh:build', 'sh:verify', 'sh:rimraf-source-maps', 'copy:404', 'replace:csp-production', 'htmlmin', 'replace:manifest'],
    continuous: ['sh:continuous'],
    e2e: ['sh:e2e'],
    monitor: ['sh:monitor'],
    preview: ['sh:preview'],
    smoke: ['sh:smoke'],
    test: ['sh:test']
};
