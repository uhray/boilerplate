require.config({
  baseUrl: '/public',
  config: {
    loader: {
      pages: {
        login:         'contexts/login/pages/login/main',
        signup:       'contexts/login/pages/signup/main',
        reset:        'contexts/login/pages/reset/main',
        forgot:       'contexts/login/pages/forgot/main'
      },
      components: {
        modal:        'ractive-plugins/components/modal/main'
      },
      modules: {
        tools:        'modules/tools',
        polyfills:    'modules/polyfills'
      },
      events: {
        uhray:        'bower/ractive-uhray-events/dist/events.min'
      },
      extensions: {
        validator: 'bower/ractive-extensions-validator/dist/validator.min',
        crud:      'bower/ractive-extensions-crud/dist/crud.min'
      }
    }
  },
  paths: {
    bootstrap:   'bower/bootstrap-sass/assets/javascripts/bootstrap.min',
    crud:        'bower/crud/dist/crud',
    debug:       'bower/debug/dist/debug',
    director:    'bower/director/build/director.min',
    jquery:      'bower/jquery/dist/jquery.min',
    lodash:      'bower/lodash/lodash.min',
    loader:      'bower/requirejs-loader-plugin/loader',
    moment:      'bower/moment/min/moment.min',
    ractive:     'bower/ractive/ractive',
    router:      'contexts/login/router',
    rv:          'bower/rv/rv'
  },
  shim: {
    debug:    { exports: 'debug' },
    director: { exports: 'Router' },
    bootstrap: ['jquery'],
    router:   ['loader!']
  }
});

requirejs(['debug', 'router', 'ractive'], function(debug, router, ractive) {
  window.Debug = debug;  // global "Debug" because chrome overwrites "debug"
  window.Ractive = ractive;
});
