const cspBuilder = require('content-security-policy-builder');
const cspProductionConfig = require('../csp/production');
const crypto = require('crypto');
const fs = require('fs');

module.exports = {
    'chunks': {
        files: {
            './': [
                'build/index.html'
            ]
        },
        options: {
            patterns: [ {
                match: /""\+e\+"\."\+{([0-9]+:"[a-f0-9]{20}",?)+}/g,
                replacement: (match) => match.replace(/""\+e\+"/g, '"web-audio-conference-2017/scripts/"+e+"')
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
                        scriptHashes.push(`'sha256-${ crypto
                            .createHash('sha256')
                            .update(result[1])
                            .digest('base64') }'`);

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
                match: /<script\stype="text\/javascript"\ssrc="(inline\.[a-z0-9]*\.bundle\.js)"><\/script>/g,
                replacement: (match, filename) => {
                    return `<script type="text/javascript">${ fs.readFileSync(`build/${ filename }`) }</script>`;
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
                match: /<script\stype="text\/javascript"\ssrc="([a-z]*\.[a-z0-9]*\.bundle\.js)"><\/script>/g,
                replacement: (match, filename) => {
                    return `<script type="text/javascript" src="web-audio-conference-2017/scripts/${ filename }"></script>`;
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
                match: /<link\shref="(styles\.[a-z0-9]*\.bundle\.css)"\srel="stylesheet">/g,
                replacement: (match, filename) => {
                    return `<link href="web-audio-conference-2017/styles/${ filename }" rel="stylesheet">`;
                }
            } ]
        }
    }
};
