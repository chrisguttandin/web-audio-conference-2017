const cspBuilder = require('content-security-policy-builder');
const cspProductionConfig = require('../csp/production');
const crypto = require('crypto');
const fs = require('fs');

// eslint-disable-next-line padding-line-between-statements
const computeHashOfFile = (filename, algorithm, encoding) => {
    const content = fs.readFileSync(filename, 'utf-8');

    return computeHashOfString(content, algorithm, encoding);
};
const computeHashOfString = (string, algorithm, encoding) => {
    return crypto
        .createHash(algorithm)
        .update(string)
        .digest(encoding);
};

module.exports = (grunt) => {
    return {
        'bundle': {
            files: {
                './': [
                    'build/main.*.bundle.js'
                ]
            },
            options: {
                patterns: [ {
                    match: /"\/ngsw-worker\.js"/g,
                    replacement: '"/web-audio-conference-2017/ngsw-worker.js"'
                } ]
            }
        },
        'chunks': {
            files: {
                './': [
                    'build/index.html'
                ]
            },
            options: {
                patterns: [ {
                    match: /""\+e\+"\."\+{([0-9]+:"[a-f0-9]{20}",?)+}/g,
                    replacement: (match) => match.replace(/""\+e\+"/g, '"scripts/"+e+"')
                } ]
            }
        },
        'csp-production': {
            files: {
                'build/index.html': [
                    'build/index.html'
                ]
            },
            options: {
                patterns: [ {
                    match: /<meta\shttp-equiv="content-security-policy">/,
                    replacement: () => {
                        const html = fs.readFileSync('build/index.html', 'utf-8');
                        const regex = /<script[^>]*?>([^<](.|[\n\r])*?)<\/script>/gm;
                        const scriptHashes = [];

                        let result = regex.exec(html);

                        while (result !== null) {
                            scriptHashes.push(`'sha256-${ computeHashOfString(result[1], 'sha256', 'base64') }'`);

                            result = regex.exec(html);
                        }

                        const cspConfig = Object.assign({}, cspProductionConfig, {
                            directives: Object.assign({}, cspProductionConfig.directives, {
                                'script-src': ('script-src' in cspProductionConfig.directives)
                                    ? (Array.isArray(cspProductionConfig.directives['script-src']))
                                        ? [ ...cspProductionConfig.directives['script-src'], ...scriptHashes ]
                                        : [ cspProductionConfig.directives['script-src'], ...scriptHashes ]
                                    : [ ...scriptHashes ]
                            })
                        });
                        const cspString = cspBuilder(cspConfig);

                        return `<meta content="${ cspString }" http-equiv="content-security-policy">`;
                    }
                } ]
            }
        },
        'inline': {
            files: {
                './': [
                    'build/index.html'
                ]
            },
            options: {
                patterns: [ {
                    match: /<script\stype="text\/javascript"\ssrc="(inline\.[a-z0-9]*\.bundle\.js)"\sintegrity="sha384-[a-zA-Z0-9+/]*=*"\scrossorigin="anonymous"><\/script>/g,
                    replacement: (match, filename) => {
                        return `<script type="text/javascript">${ fs.readFileSync(`build/${ filename }`) }</script>`;
                    }
                } ]
            }
        },
        'manifest': {
            files: {
                './': [
                    'build/ngsw.json'
                ]
            },
            options: {
                patterns: [ {
                    match: /assets\/apple-touch-icon\.png/g,
                    replacement: () => grunt.file.expand({ cwd: 'build' }, 'assets/*.apple-touch-icon.png')[0]
                }, {
                    match: /assets\/favicon\.ico/g,
                    replacement: () => grunt.file.expand({ cwd: 'build' }, 'assets/*.favicon.ico')[0]
                }, {
                    match: /\/([a-z0-9-]+\.[a-z0-9]*\.bundle\.css)"/g,
                    replacement: (_, filename) => `/styles/${ filename }"`
                }, {
                    match: /\/([a-z0-9-]+\.[a-z0-9]*\.(bundle|chunk)\.js)"/g,
                    replacement: (_, filename) => `/scripts/${ filename }"`
                }, {
                    match: /[\s]*"\/web-audio-conference-2017(\/scripts)?\/inline\.[a-z0-9]+.bundle.js",/g,
                    replacement: ''
                }, {
                    match: /[\s]*"\/web-audio-conference-2017(\/scripts)?\/inline\.[a-z0-9]+.bundle.js":\s"[a-z0-9]+",/g,
                    replacement: ''
                }, {
                    // Replace the hash value inside of the hashTable for "/scripts/main.*.bundle.js" because it was modified before.
                    match: /"\/web-audio-conference-2017(\/scripts\/main\.[a-z0-9]+.bundle.js)":\s"[a-z0-9]+"/g,
                    replacement: (_, filename) => {
                        return `"/web-audio-conference-2017${ filename }": "${ computeHashOfFile(`build${ filename }`, 'sha1', 'hex') }"`;
                    }
                }, {
                    // Replace the hash value inside of the hashTable for "/index.html" because it was modified before.
                    match: /"\/web-audio-conference-2017\/index\.html":\s"[a-z0-9]+"/g,
                    replacement: () => {
                        return `"/web-audio-conference-2017/index.html": "${ computeHashOfFile('build/index.html', 'sha1', 'hex') }"`;
                    }
                } ]
            }
        },
        'scripts': {
            files: {
                './': [
                    'build/index.html'
                ]
            },
            options: {
                patterns: [ {
                    match: /<script\stype="text\/javascript"\ssrc="([a-z-]*\.[a-z0-9]*\.bundle\.js)"\sintegrity="(sha384-[a-zA-Z0-9+/]*=*)"\scrossorigin="anonymous"><\/script>/g,
                    replacement: (match, filename, initialHash) => {
                        const updatedHash = (/main\.[a-z0-9]*\.bundle\.js/.test(filename)) ?
                            `sha384-${ computeHashOfFile(`build/scripts/${ filename }`, 'sha384', 'base64') }` :
                            initialHash;

                        return `<script type="text/javascript" src="scripts/${ filename }" integrity="${ updatedHash }" crossorigin="anonymous"></script>`;
                    }
                } ]
            }
        },
        'styles': {
            files: {
                './': [
                    'build/index.html'
                ]
            },
            options: {
                patterns: [ {
                    match: /<link\shref="(styles\.[a-z0-9]*\.bundle\.css)"\srel="stylesheet"\sintegrity="(sha384-[a-zA-Z0-9+/]*=*)"\scrossorigin="anonymous"\/>/g,
                    replacement: (match, filename, hash) => {
                        return `<link href="styles/${ filename }" rel="stylesheet" integrity="${ hash }" crossorigin="anonymous">`;
                    }
                } ]
            }
        }
    };
};
