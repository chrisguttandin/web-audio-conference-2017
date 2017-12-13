module.exports = {
    default: {
        files: [ {
            cwd: 'build/',
            dest: 'build/',
            expand: true,
            src: [ '**/!(index).html' ]
        } ],
        options: {
            caseSensitive: true,
            collapseBooleanAttributes: true,
            collapseWhitespace: true,
            removeComments: true
        }
    }
};
