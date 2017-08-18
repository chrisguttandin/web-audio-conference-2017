const stylelint = require('stylelint');
const stylelintConfigHolyGrail = require('stylelint-config-holy-grail');

module.exports = {
    lint: {
        options: {
            processors: [
                // @todo This should use { extends: 'stylelint-config-holy-grail' } but that is not possible with grunt-postcss@0.8.0.
                stylelint(stylelintConfigHolyGrail)
            ],
            writeDest: false
        },
        src: [ 'src/**/*.css' ]
    }
};
