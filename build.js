({
    mainConfigFile: './lib/frontend/configure.js',
    baseUrl: './lib/frontend',
    name: 'bower/almond/almond',
    wrap: true,
    include: [ 'router' ],
    insertRequire: [ 'router' ],
    exclude: [ ],
    stubModules: [ 'rv' ],
    out: './lib/frontend/main-built.js'
})
