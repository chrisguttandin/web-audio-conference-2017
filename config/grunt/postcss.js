const stylelint = require('stylelint');

module.exports = {
    lint: {
        options: {
            failOnError: true,
            processors: [stylelint({ config: { extends: 'stylelint-config-holy-grail' } })],
            writeDest: false
        },
        src: ['src/**/*.css']
    }
};
