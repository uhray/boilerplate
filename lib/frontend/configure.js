require.config({
  baseUrl : '/public',
  paths : {
    crud       : 'bower/crud/crud',
    debug      : 'bower/debug/dist/debug',
    page       : 'bower/page/index',
    ractive    : 'bower/ractive/ractive',
    ractivejs  : 'bower/ractive/ractive.runtime',
    rv         : 'bower/rv/rv'
  },
  shim: {
    page       : { exports : 'page' },
    debug      : { exports : 'debug' },
  },
  packages : [
    { name: 'components', location: 'components' },
    { name: 'pages', location: 'pages' },
    { name: 'modules', location: 'modules' }
  ]
});

requirejs([ 'debug', 'router' ], function(debug) {
  window.Debug = debug;  // global Debug because chrome overwrites "debug"
});
