const pkg = require('../../package.json');

module.exports = {
    deploy: {
        options: {
            base: 'build/',
            message: `build page for version ${ process.env.TRAVIS_TAG }`,
            repo: pkg.repository.url.replace(/:\/\//, `://${ process.env.GIT_HUB_ACCESS_TOKEN }@`),
            silent: true,
            user: {
                email: process.env.GIT_HUB_USER_EMAIL,
                name: process.env.GIT_HUB_USER_NAME
            }
        },
        src: [ '**' ]
    }
};
