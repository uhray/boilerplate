({
    mainConfigFile: '../app/frontend/configure.js',
    baseUrl: '../app/frontend',
    name: 'bower/almond/almond',
    wrap: true,
    include: [ 'configure' ],
    insertRequire: [ 'configure' ],
    exclude: [ ],
    stubModules: [ 'rv' ],
    out: '../app/frontend/main-built.js'
})
