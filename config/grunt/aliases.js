const { env } = require('process');

// eslint-disable-next-line padding-line-between-statements
const filter = (tasks) => tasks.filter((task) => task !== null);
const isVersionUpdate = (env.TRAVIS === 'true' &&
    env.TRAVIS_PULL_REQUEST === 'false' &&
    env.TRAVIS_SECURE_ENV_VARS === 'true' &&
    env.TRAVIS_TAG !== '');

module.exports = {
    'a11y': [
        'axe-webdriver'
    ],
    'analyze': [
        'sh:analyze'
    ],
    'continuous': [
        'sh:continuous'
    ],
    'deploy': [
        'sh:build',
        'sh:verify',
        'clean:source-maps',
        'replace:bundle',
        'copy:404',
        'replace:runtime',
        'replace:chunks',
        'replace:csp-production',
        'clean:runtime',
        'copy:scripts',
        'replace:scripts',
        'clean:scripts',
        'copy:styles',
        'replace:styles',
        'clean:styles',
        'htmlmin',
        'replace:manifest',
        'gh-pages:deploy',
        'smoke'
    ],
    'deploy-on-version-updates': filter([
        (isVersionUpdate) ? 'deploy' : null
    ]),
    'e2e': [
        'sh:e2e'
    ],
    'lint': [
        'eslint',
        'postcss:lint',
        'sh:lint',
        'depcheck'
    ],
    'monitor': [
        'sh:monitor'
    ],
    'preview': [
        'sh:preview'
    ],
    'smoke': [
        'sh:smoke'
    ],
    'test': [
        'sh:test'
    ]
};
