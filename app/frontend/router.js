define(
[
'director',
'loader!pages',
'debug'
],
function(Director, pages, debug) {
  var debug = debug('router'),
      routes = {
        '/': pages.home
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
