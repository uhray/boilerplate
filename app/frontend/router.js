define(
[
'director',
'loader!pages'
],
function(Director, pages) {
  var routes = {
        '/': pages.home
      },
      router = new Director(routes);

  router.init('/');
});
