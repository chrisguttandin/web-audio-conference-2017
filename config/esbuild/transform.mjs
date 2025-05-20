import { glob, readFile, writeFile } from 'node:fs/promises';
import buildContentSecurityPolicy from 'content-security-policy-builder';
import { hash } from 'node:crypto';
import { join } from 'node:path';
import { minify } from 'html-minifier';
import process from 'node:process';

// eslint-disable-next-line import/no-default-export
export default (indexHtml) =>
    minify(indexHtml, {
        caseSensitive: true,
        collapseBooleanAttributes: true,
        collapseWhitespace: true,
        minifyCSS: true,
        removeComments: true
    });

const ENABLE_STYLES_SCRIPT = "document.head.querySelectorAll('link[media=print]').forEach(l=>l.onload=()=>l.media='all')";
const PATH = 'build/web-audio-conference-2017/browser';

process.once('beforeExit', async () => {
    const ngsw = JSON.parse(await readFile(join(PATH, 'ngsw.json'), 'utf8'));

    for await (const filename of glob(join(PATH, '**/*.html'))) {
        if (filename.endsWith('index.csr.html')) {
            continue;
        }

        const html = await readFile(filename, 'utf8');
        const regex = /<script[^>]*?>(?<script>.*?)<\/script>/gm;
        const scriptHashes = [`'sha256-${hash('sha256', ENABLE_STYLES_SCRIPT, 'base64')}'`];

        let result = regex.exec(html);

        while (result !== null) {
            const script = result.groups.script;

            if (script.trim() !== '') {
                scriptHashes.push(`'sha256-${hash('sha256', script, 'base64')}'`);
            }

            result = regex.exec(html);
        }

        const cspProductionConfig = JSON.parse(await readFile('config/csp/production.json', 'utf8'));
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
        const content = html
            .replace(
                '<meta http-equiv="content-security-policy">',
                `<meta content="${buildContentSecurityPolicy(cspConfig)}" http-equiv="content-security-policy">`
            )
            .replace('</head>', `<script>${ENABLE_STYLES_SCRIPT}</script></head>`)
            .replace(' onload="this.media=\'all\'"', '');

        await writeFile(filename, content);

        if (ngsw.hashTable[filename] !== undefined) {
            ngsw.hashTable[filename] = hash('sha1', content, 'hex');
        }
    }

    await writeFile(join(PATH, 'ngsw.json'), JSON.stringify(ngsw, null, 2));
});
