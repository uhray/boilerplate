({
    mainConfigFile: './lib/public/js/configure.js',
    baseUrl: './lib/public',
    name: 'bower_components/almond/almond',
    wrap: true,
    include: [ 'js/main' ],
    insertRequire: ['js/main'],
    exclude: [ 'jade' ],
    out: './lib/public/js/main-built.js'
})
