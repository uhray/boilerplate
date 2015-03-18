define(
[
'director',
'loader!pages',
'loader!'
],
function(Director, pages) {
  var routes = {
        '/': pages.home
      },
      router = new Director(routes);

  router.init('/');
});
