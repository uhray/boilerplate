define(
[
'page',
'pages/home/main',
'debug'
],
function(page, p$home, debug) {
  var debug = debug('router');

  page(clear);
  page('/*', p$home);
  page();


  function clear(ctx, next) {
    debug('clearing for %s', ctx.path);
    document.getElementById('body')
    next();
  }
});
