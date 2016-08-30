require.config({
  baseUrl: '/public',
  config: {
    loader: {
      pages: {
        home:         'contexts/angular/pages/home/main'
      },
      angularPlugins: {
        ngRoute:      'bower/angular-route/angular-route.min'
      }
    }
  },
  paths: {
    angular:     'bower/angular/angular',
    bootstrap:   'bower/bootstrap-sass/assets/javascripts/bootstrap.min',
    crud:        'bower/crud/dist/crud',
    debug:       'bower/debug/dist/debug',
    jquery:      'bower/jquery/dist/jquery.min',
    lodash:      'bower/lodash/dist/lodash.min',
    loader:      'bower/requirejs-loader-plugin/loader',
    router:      'contexts/angular/router',
    text:        'bower/text/text'
  },
  shim: {
    angular:  { exports: 'angular' },
    debug:    { exports: 'debug' },
    router:   ['loader!'],
    loader:   ['angular']
  }
});

requirejs(['debug', 'router'], function(debug, router) {
  window.Debug = debug;  // global "Debug" because chrome overwrites "debug"
});
