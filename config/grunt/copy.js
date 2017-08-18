module.exports = {
    404: {
        files: [
            {
                cwd: 'src/',
                dest: 'build/',
                expand: true,
                src: [ '404.html' ]
            }
        ]
    },
    scripts: {
        files: [
            {
                cwd: 'build/',
                dest: 'build/scripts/',
                expand: true,
                src: [ '**/*.js' ]
            }
        ]
    },
    styles: {
        files: [
            {
                cwd: 'build/',
                dest: 'build/styles/',
                expand: true,
                src: [ '**/*.css' ]
            }
        ]
    }
};
