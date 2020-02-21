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
const createChunkExpression = (index) => {
    return new RegExp(`${ index }:"sha384-[\\d+/A-Za-z]{64}"`);
};
const replaceHashInMatch = (grunt, match, prefix, index) => {
    const filename = grunt.file.expand({ cwd: 'build/web-audio-conference-2017/scripts' }, `${ prefix }.*.js`)[0];

    if (filename === undefined) {
        return match;
    }

    const hash = `sha384-${ computeHashOfFile(`build/web-audio-conference-2017/scripts/${ filename }`, 'sha384', 'base64') }`;

    return match.replace(createChunkExpression(index), `${ index }:"${ hash }"`);
};

module.exports = (grunt) => {
    return {
        'bundle': {
            files: {
                './': [
                    'build/web-audio-conference-2017/main*.js'
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
                    'build/web-audio-conference-2017/index.html'
                ]
            },
            options: {
                patterns: [ {
                    match: /""\+\({[^}]*}\[e]\|\|e\)\+"(?:-es(?:2015|5))?\."\+{(?:\d+:"[\da-f]{20}",?)+}/g,
                    replacement: (match) => match.replace(/^""/g, '"scripts/"')
                }, {
                    match: /{(?:[1-9]\d*:"sha384-[\d+/A-Za-z]{64}",?)+}/g,
                    replacement: (match) => {
                        let updatedMatch = replaceHashInMatch(grunt, match, 'common', 1);

                        const offset = (match === updatedMatch) ? 4 : 5;

                        for (let i = offset; createChunkExpression(i).test(match); i += 1) {
                            updatedMatch = replaceHashInMatch(grunt, updatedMatch, `${ i }`, i);
                        }

                        return updatedMatch;
                    }
                } ]
            }
        },
        'csp-production': {
            files: {
                'build/web-audio-conference-2017/index.html': [
                    'build/web-audio-conference-2017/index.html'
                ]
            },
            options: {
                patterns: [ {
                    match: /<meta\shttp-equiv="content-security-policy">/,
                    replacement: () => {
                        const html = fs.readFileSync('build/web-audio-conference-2017/index.html', 'utf-8');
                        const regex = /<script[^>]*?>(?<script>.*?)<\/script>/gm;
                        const scriptHashes = [];

                        let result = regex.exec(html);

                        while (result !== null) {
                            scriptHashes.push(`'sha256-${ computeHashOfString(result.groups.script, 'sha256', 'base64') }'`);

                            result = regex.exec(html);
                        }

                        const cspConfig = {
                            ...cspProductionConfig,
                            directives: {
                                ...cspProductionConfig.directives,
                                'script-src': ('script-src' in cspProductionConfig.directives)
                                    ? (Array.isArray(cspProductionConfig.directives['script-src']))
                                        ? [ ...cspProductionConfig.directives['script-src'], ...scriptHashes ]
                                        : [ cspProductionConfig.directives['script-src'], ...scriptHashes ]
                                    : [ ...scriptHashes ]
                            }
                        };
                        const cspString = cspBuilder(cspConfig);

                        return `<meta content="${ cspString }" http-equiv="content-security-policy">`;
                    }
                } ]
            }
        },
        'manifest': {
            files: {
                './': [
                    'build/web-audio-conference-2017/ngsw.json'
                ]
            },
            options: {
                patterns: [ {
                    match: /assets\/(?<filename>[\da-z-]+)\.(?<extension>ico|jpg|png)/g,
                    replacement: (_, filename, extension) => grunt.file.expand({ cwd: 'build/web-audio-conference-2017', ext: extension }, `assets/${ filename }.*`)[0]
                }, {
                    match: /\/(?<filename>[\da-z-]+\.[\da-z]*\.css)"/g,
                    replacement: (_, filename) => `/styles/${ filename }"`
                }, {
                    match: /\/(?<filename>[\da-z-]*\.[\da-z]*\.js)"/g,
                    replacement: (_, filename) => `/scripts/${ filename }"`
                }, {
                    match: /\s*"\/web-audio-conference-2017(?:\/scripts)?\/runtime(?:-es(?:2015|5))?.[\da-z]*\.js",/g,
                    replacement: ''
                }, {
                    match: /\s*"\/web-audio-conference-2017(?:\/scripts)?\/runtime(?:-es(?:2015|5))?.[\da-z]*\.js":\s"[\da-z]+",/g,
                    replacement: ''
                }, {
                    // Replace the hash value inside of the hashTable for "/scripts/*.js" because it may have been modified before.
                    match: /"\/web-audio-conference-2017(?<filename>\/scripts\/(?:\d+|main|scripts)(?:-es(?:2015|5))?.[\da-z]+.js)":\s"[\da-z]+"/g,
                    replacement: (_, filename) => {
                        return `"/web-audio-conference-2017${ filename }": "${ computeHashOfFile(`build/web-audio-conference-2017${ filename }`, 'sha1', 'hex') }"`;
                    }
                }, {
                    // Replace the hash value inside of the hashTable for "/styles/styles*.css" because it was modified before.
                    match: /"\/web-audio-conference-2017(?<filename>\/styles\/styles\.[\da-z]*\.css)":\s"[\da-z]+"/g,
                    replacement: (_, filename) => {
                        return `"/web-audio-conference-2017${ filename }": "${ computeHashOfFile(`build/web-audio-conference-2017${ filename }`, 'sha1', 'hex') }"`;
                    }
                }, {
                    // Replace the hash value inside of the hashTable for "/(index|start).html" because it was modified before.
                    match: /"\/web-audio-conference-2017\/(?<filename>index|start)\.html":\s"[\da-z]+"/g,
                    replacement: (_, filename) => {
                        return `"/web-audio-conference-2017/${ filename }.html": "${ computeHashOfFile(`build/web-audio-conference-2017/${ filename }.html`, 'sha1', 'hex') }"`;
                    }
                } ]
            }
        },
        'runtime': {
            files: {
                './': [
                    'build/web-audio-conference-2017/index.html'
                ]
            },
            options: {
                patterns: [ {
                    match: /<script\ssrc="(?<filename>runtime(?:-es(?:2015|5))?.[\da-z]*\.js)"\scrossorigin="anonymous"(?<moduleAttribute>\s(?:nomodule|type="module"))?\sdefer\sintegrity="sha384-[\d+/A-Za-z]+=*"><\/script>/g,
                    replacement: (match, filename, moduleAttribute) => {
                        if (moduleAttribute === undefined) {
                            return `<script>${ fs.readFileSync(`build/web-audio-conference-2017/${ filename }`) }</script>`;
                        }

                        return `<script${ moduleAttribute }>${ fs.readFileSync(`build/web-audio-conference-2017/${ filename }`) }</script>`;
                    }
                } ]
            }
        },
        'scripts': {
            files: {
                './': [
                    'build/web-audio-conference-2017/index.html'
                ]
            },
            options: {
                patterns: [ {
                    match: /<script\ssrc="(?<filename>[\da-z-]+\.[\da-z]+\.js)"\scrossorigin="anonymous"(?<moduleAttribute>\s(?:nomodule|type="module"))?\sdefer\sintegrity="(?<initialHash>sha384-[\d+/A-Za-z]+=*)"><\/script>/g,
                    replacement: (match, filename, moduleAttribute, initialHash) => {
                        const updatedHash = (/main(?:-es(?:2015|5))?\.[\da-z]+\.js/.test(filename)) ?
                            `sha384-${ computeHashOfFile(`build/web-audio-conference-2017/scripts/${ filename }`, 'sha384', 'base64') }` :
                            initialHash;

                        if (moduleAttribute === undefined) {
                            return `<script src="scripts/${ filename }" crossorigin="anonymous" defer integrity="${ updatedHash }"></script>`;
                        }

                        return `<script src="scripts/${ filename }" crossorigin="anonymous"${ moduleAttribute } defer integrity="${ updatedHash }"></script>`;
                    }
                } ]
            }
        },
        'styles': {
            files: {
                './': [
                    'build/web-audio-conference-2017/index.html'
                ]
            },
            options: {
                patterns: [ {
                    match: /<link\srel="stylesheet"\shref="(?<filename>styles\.[\da-z]+\.css)"\scrossorigin="anonymous"\sintegrity="sha384-[\d+/A-Za-z]+=*">/g,
                    replacement: (match, filename) => {
                        const hash = `sha384-${ computeHashOfFile(`build/web-audio-conference-2017/styles/${ filename }`, 'sha384', 'base64') }`;

                        return `<link href="styles/${ filename }" rel="stylesheet" crossorigin="anonymous" integrity="${ hash }">`;
                    }
                } ]
            }
        }
    };
};
