module.exports = {
    index: {
        options: {
            'doctype-first': true,
            'doctype-html5': true,
            'head-script-disabled': false,
            'htmlhintrc': 'config/htmlhint/config.json'
        },
        src: [ 'src/*.html' ]
    },
    templates: {
        options: {
            htmlhintrc: 'config/htmlhint/config.json'
        },
        src: [ 'src/app/**/*.html' ]
    }
};
