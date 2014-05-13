require.config({
  baseUrl : '/public/js',
  paths : {
    // 'd3' : 'plugins/d3',
    'page' : '/public/bower_components/page/index',
    'underscore' : '/public/bower_components/underscore/underscore'
  },
  shim: {
    'page' : { 'exports' : 'page' },
    'underscore' : { 'exports' : '_' },
  },
  packages : [
    // { name: 'plugins',
    //  location: 'plugins' },
  ]
});

requirejs([ './main' ], function() {
});



