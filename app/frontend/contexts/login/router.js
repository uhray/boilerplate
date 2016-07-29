define(
[
'director',
'loader!pages',
'crud',
'loader!'
],
function(Director, pages, crud) {
  var routes = {
        '/': pages.home,
        '/reset/:id': pages.reset,
        '/forgot': pages.forgot
      },
      router = new Director(routes);

  crud.configure({ base: '/' });

  router.configure({
    notfound: pages.home,
    before: function() {
      crud.cancelAll();
    }
  });
  router.init('/');
});