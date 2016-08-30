require.config({
  baseUrl: '/public',
  config: {
    loader: { }
  },
  paths: {
    bootstrap:   'bower/bootstrap-sass/assets/javascripts/bootstrap.min',
    crud:        'bower/crud/dist/crud',
    debug:       'bower/debug/dist/debug',
    director:    'bower/director/build/director.min',
    jquery:      'bower/jquery/dist/jquery.min',
    lodash:      'bower/lodash/dist/lodash.min',
    loader:      'bower/requirejs-loader-plugin/loader',
    moment:      'bower/moment/min/moment.min',
    ractive:     'bower/ractive/ractive',
    router:      'contexts/home/router',
    rv:          'bower/rv/rv',
    semantic:    'semantic/semantic.min'
  },
  shim: {
    debug:    { exports: 'debug' },
    director: { exports: 'Router' },
    bootstrap: ['jquery'],
    router:   ['loader!'],
    semantic: ['jquery']
  }
});

requirejs(['debug', 'router', 'ractive'], function(debug, router, ractive) {
  window.Debug = debug;  // global "Debug" because chrome overwrites "debug"
  window.Ractive = ractive;
});
