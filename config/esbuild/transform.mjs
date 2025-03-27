import { minify } from 'html-minifier';

// eslint-disable-next-line import/no-default-export
export default (indexHtml) =>
    minify(indexHtml, {
        caseSensitive: true,
        collapseBooleanAttributes: true,
        collapseWhitespace: true,
        minifyCSS: true,
        removeComments: true
    });
