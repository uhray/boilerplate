({
    mainConfigFile: './lib/public/js/configure.js',
    baseUrl: './lib/public',
    name: 'bower_components/almond/almond',
    wrap: true,
    include: [ 'js/router' ],
    insertRequire: ['js/router'],
    exclude: [ ],
    out: './lib/public/js/main-built.js'
})
