({
    mainConfigFile: '../frontend/configure.js',
    baseUrl: '../frontend',
    name: 'bower/almond/almond',
    wrap: true,
    include: [ 'router' ],
    insertRequire: [ 'router' ],
    exclude: [ ],
    stubModules: [ 'rv' ],
    out: '../frontend/main-built.js'
})
