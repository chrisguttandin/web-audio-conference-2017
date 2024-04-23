import { minify } from 'html-minifier';

export default (indexHtml) =>
    minify(indexHtml, {
        caseSensitive: true,
        collapseBooleanAttributes: true,
        collapseWhitespace: true,
        minifyCSS: true,
        removeComments: true
    });
