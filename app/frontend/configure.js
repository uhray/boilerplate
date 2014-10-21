require.config({
  baseUrl: '/public',
  paths: {
    crud:        'bower/crud/dist/crud',
    debug:       'bower/debug/dist/debug',
    director:    'bower/director/build/director.min',
    ractive:     'bower/ractive/ractive',
    rv:          'bower/rv/rv'
  },
  shim: {
    page:     { exports: 'page' },
    debug:    { exports: 'debug' },
    director: { exports: 'Router' }
  },
  packages: [
    { name: 'components', location: 'components' },
    { name: 'pages', location: 'pages' },
    { name: 'modules', location: 'modules' }
  ]
});

requirejs(['debug', 'router'], function(debug) {
  window.Debug = debug;  // global "Debug" because chrome overwrites "debug"
});
