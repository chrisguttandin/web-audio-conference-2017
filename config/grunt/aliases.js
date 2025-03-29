module.exports = {
    analyze: ['sh:analyze'],
    build: ['sh:build', 'sh:verify', 'sh:rimraf-source-maps', 'copy:404', 'replace:csp-production', 'htmlmin', 'replace:manifest']
};
