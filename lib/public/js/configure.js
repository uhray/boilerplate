require.config({
  baseUrl : '/public',
  paths : {
    'crud'       : 'bower_components/crud/crud',
    'emitter'    : 'bower_components/emitter/emitter',
    'jquery'     : 'bower_components/jquery/dist/jquery',
    'lodash'     : 'bower_components/lodash/dist/lodash',
    'modernizr'  : 'bower_components/modernizr/modernizr',
    'page'       : 'bower_components/page/index',
    'text'       : 'bower_components/requirejs-text/text',
    'utools'     : 'bower_components/utools/index',
    'waves'      : 'js/vendor/waves'
  },
  shim: {
    'jquery'     : { 'exports' : '$' },
    'page'       : { 'exports' : 'page' },
    'underscore' : { 'exports' : '_' },
    'utools'     : { 'exports' : 'utools' }
  },
  packages : [
    { name: 'controllers', location: 'js/controllers' },
    { name: 'js', location: 'js' },
    { name: 'views', location: 'js/views' }
  ]
});

requirejs([ 'js/router' ], Function());

