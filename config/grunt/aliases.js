const filter = (tasks) => tasks.filter((task) => task !== null);
const isVersionUpdate = (process.env.TRAVIS === 'true' &&
    process.env.TRAVIS_PULL_REQUEST === 'false' &&
    process.env.TRAVIS_SECURE_ENV_VARS === 'true' &&
    process.env.TRAVIS_TAG !== '');

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
        'replace:bundle',
        'copy:404',
        'htmlmin',
        'replace:inline',
        'replace:chunks',
        'replace:csp-production',
        'clean:inline',
        'copy:scripts',
        'replace:scripts',
        'clean:scripts',
        'copy:styles',
        'replace:styles',
        'clean:styles',
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
        'htmlhint',
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
