require.config({
  baseUrl : '/public',
  paths : {
    'jade'       : 'bower_components/require-jade/jade',
    'modernizr'  : 'bower_components/modernizr/modernizr',
    'page'       : 'bower_components/page/index',
    'underscore' : 'bower_components/underscore/underscore',
    'utools'     : 'bower_components/utools/index'
  },
  shim: {
    'page'       : { 'exports' : 'page' },
    'underscore' : { 'exports' : '_' },
    'utools'     : { 'exports' : 'utools' }
  },
  packages : [
    { name: 'views', location: 'views' },
    { name: 'js', location: 'js' },
  ]
});

requirejs([ 'js/main' ], Function());

