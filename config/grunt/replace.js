const cspBuilder = require('content-security-policy-builder');
const cspProductionConfig = require('../csp/production');
const crypto = require('crypto');
const fs = require('fs');

// eslint-disable-next-line padding-line-between-statements
const ENABLE_STYLES_SCRIPT = "document.head.querySelectorAll('link[media=print]').forEach(l=>l.onload=()=>l.media='all')";

// eslint-disable-next-line padding-line-between-statements
const computeHashOfFile = (filename, algorithm, encoding) => {
    const content = fs.readFileSync(filename, 'utf8'); // eslint-disable-line node/no-sync

    return computeHashOfString(content, algorithm, encoding);
};
const computeHashOfString = (string, algorithm, encoding) => {
    return crypto.createHash(algorithm).update(string).digest(encoding);
};

module.exports = (grunt) => {
    return {
        'csp-production': {
            files: {
                './': ['build/web-audio-conference-2017/browser/**/index.html']
            },
            options: {
                patterns: [
                    {
                        match: /<meta\shttp-equiv="content-security-policy"\s*\/?>/,
                        replacement: (_1, _2, _3, filename) => {
                            const html = fs.readFileSync(filename, 'utf8'); // eslint-disable-line node/no-sync
                            const regex = /<script[^>]*?>(?<script>.*?)<\/script>/gm;
                            const scriptHashes = [`'sha256-${computeHashOfString(ENABLE_STYLES_SCRIPT, 'sha256', 'base64')}'`];

                            let result = regex.exec(html);

                            while (result !== null) {
                                const script = result.groups.script;

                                if (script.trim() !== '') {
                                    scriptHashes.push(`'sha256-${computeHashOfString(script, 'sha256', 'base64')}'`);
                                }

                                result = regex.exec(html);
                            }

                            const scriptSrcConfig =
                                'script-src' in cspProductionConfig.directives
                                    ? Array.isArray(cspProductionConfig.directives['script-src'])
                                        ? [...cspProductionConfig.directives['script-src'], ...scriptHashes]
                                        : [cspProductionConfig.directives['script-src'], ...scriptHashes]
                                    : [...scriptHashes];
                            const cspConfig = {
                                ...cspProductionConfig,
                                directives: {
                                    ...cspProductionConfig.directives,
                                    'script-src': scriptSrcConfig.sort((a, b) => {
                                        if (a.startsWith("'") && b.startsWith("'")) {
                                            return a.slice(0) < b.slice(0) ? -1 : a.slice(0) > b.slice(0) ? 1 : 0;
                                        }

                                        if (a.startsWith("'")) {
                                            return -1;
                                        }

                                        if (b.startsWith("'")) {
                                            return 1;
                                        }

                                        return a < b ? -1 : a > b ? 1 : 0;
                                    })
                                }
                            };
                            const cspString = cspBuilder.default(cspConfig);

                            return `<meta content="${cspString}" http-equiv="content-security-policy">`;
                        }
                    },
                    {
                        match: /<link\srel="stylesheet"\shref="(?<filename>styles-[\dA-Z]+\.css)"\scrossorigin="anonymous"\sintegrity="(?<hash>sha384-[\d+/A-Za-z]+=*)"(?<media>\smedia="print")?[^>]*>/g,
                        replacement: (_, filename, hash, media) =>
                            `<link crossorigin="anonymous" href="${filename}" rel="stylesheet" integrity="${hash}"${media ?? ''}>`
                    },
                    {
                        match: /<\/head>/,
                        replacement: () => `<script>${ENABLE_STYLES_SCRIPT}</script></head>`
                    }
                ]
            }
        },
        'manifest': {
            files: {
                './': ['build/web-audio-conference-2017/browser/ngsw.json']
            },
            options: {
                patterns: [
                    {
                        match: /assets\/(?<filename>[\da-z-]+)\.(?<extension>ico|jpg|png)/g,
                        replacement: (_, filename, extension) =>
                            grunt.file.expand({ cwd: 'build/web-audio-conference-2017', ext: extension }, `assets/${filename}.*`)[0]
                    },
                    {
                        // Replace the hash value inside of the hashTable for "/(index|start).html" because it was modified before.
                        match: /"\/web-audio-conference-2017\/(?<filename>index|start)\.html":\s*"[\da-z]+"/g,
                        replacement: (_, filename) => {
                            return `"/web-audio-conference-2017/browser/${filename}.html": "${computeHashOfFile(
                                `build/web-audio-conference-2017/browser/${filename}.html`,
                                'sha1',
                                'hex'
                            )}"`;
                        }
                    }
                ]
            }
        }
    };
};
