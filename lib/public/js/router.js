define(
[
'lodash', 'page', 'utools',
'controllers/home',
'modernizr'
],
function(_, page, utools, c$home) {

  page('/*', c$home);
  page();

});
