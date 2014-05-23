require.config({
  baseUrl : '/public',
  paths : {
    'jade'       : 'bower_components/require-jade/jade',
    'lodash'     : 'bower_components/lodash/dist/lodash',
    'modernizr'  : 'bower_components/modernizr/modernizr',
    'page'       : 'bower_components/page/index',
    'utools'     : 'bower_components/utools/index'
  },
  shim: {
    'page'       : { 'exports' : 'page' },
    'underscore' : { 'exports' : '_' },
    'utools'     : { 'exports' : 'utools' }
  },
  packages : [
    { name: 'partials', location: 'partials' },
    { name: 'js', location: 'js' },
  ]
});

requirejs([ 'js/main' ], Function());

