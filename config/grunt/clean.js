module.exports = {
    inline: [
        'build/inline.*.bundle.js'
    ],
    scripts: [
        'build/*.bundle.js',
        'build/*.bundle.js.gz',
        'build/*.chunk.js',
        'build/*.chunk.js.gz'
    ],
    styles: [
        'build/*.bundle.css',
        'build/*.bundle.css.gz'
    ]
};
