const { defaultProject, projects } = require('../../angular.json');

module.exports = {
    chrome: {
        options: {
            browser: 'chrome'
        },
        urls: [
            `http://localhost:${projects[defaultProject].architect.serve.options.port}/slides/1`
            // @todo Add all other slides.
        ]
    }
};
