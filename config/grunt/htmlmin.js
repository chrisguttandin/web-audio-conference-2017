module.exports = {
    default: {
        files: [
            {
                cwd: 'build/web-audio-conference-2017',
                dest: 'build/web-audio-conference-2017',
                expand: true,
                src: ['**/*.html']
            }
        ],
        options: {
            caseSensitive: true,
            collapseBooleanAttributes: true,
            collapseWhitespace: true,
            removeComments: true
        }
    }
};
