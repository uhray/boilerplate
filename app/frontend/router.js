define(
[
'director',
'pages/home/main',
'debug'
],
function(Director, p$home, debug) {
  var debug = debug('router'),
      routes = {
        '/': p$home,
      },
      router = new Director(routes);

  router.configure({
    before: clear
  });

  router.init('/');

  function clear() {
    debug('clearing for new page');
    var b = document && document.getElementById &&
            document.getElementById('body');
    if (b && 'innerHTML' in b) b.innerHTML = '';
  }
});
