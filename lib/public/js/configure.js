require.config({
  baseUrl : '/public',
  paths : {
    'emitter'    : 'bower_components/emitter/emitter',
    'jade'       : 'bower_components/require-jade/jade',
    'lodash'     : 'bower_components/lodash/dist/lodash',
    'modernizr'  : 'bower_components/modernizr/modernizr',
    'page'       : 'bower_components/page/index',
    'text'       : 'bower_components/requirejs-text/text',
    'utools'     : 'bower_components/utools/index',
    'waves'      : 'js/vendor/waves'
  },
  shim: {
    'page'       : { 'exports' : 'page' },
    'underscore' : { 'exports' : '_' },
    'utools'     : { 'exports' : 'utools' }
  },
  packages : [
    { name: 'views', location: 'js/views' },
    { name: 'controllers', location: 'js/controllers' },
    { name: 'js', location: 'js' },
  ]
});

requirejs([ 'js/router' ], Function());

