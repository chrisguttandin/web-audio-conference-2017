module.exports = {
    deploy: {
        ifTrue: [ 'deploy' ],
        options: {
            test: () => process.env.TRAVIS === 'true' &&
                    process.env.TRAVIS_PULL_REQUEST === 'false' &&
                    process.env.TRAVIS_SECURE_ENV_VARS === 'true' &&
                    process.env.TRAVIS_TAG !== ''
        }
    }
};
