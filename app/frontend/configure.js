require.config({
  baseUrl: '/public',
  config: {
    loader: {
      pages: {
        home:         'pages/home/main'
      },
      components: {
        modal:        'ractive-plugins/components/modal/main'
      },
      modules: {
        tools:        'modules/tools',
        polyfills:    'modules/polyfills'
      }
    }
  },
  paths: {
    crud:        'bower/crud/dist/crud',
    debug:       'bower/debug/dist/debug',
    director:    'bower/director/build/director.min',
    jquery:      'bower/jquery/dist/jquery.min',
    lodash:      'bower/lodash/lodash.min',
    loader:      'bower/requirejs-loader-plugin/loader',
    ractive:     'bower/ractive/ractive',
    rv:          'bower/rv/rv'
  },
  shim: {
    debug:    { exports: 'debug' },
    director: { exports: 'Router' },
    router:   ['loader!']
  }
});

requirejs(['debug', 'router'], function(debug) {
  window.Debug = debug;  // global "Debug" because chrome overwrites "debug"
});
