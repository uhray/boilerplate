define(
[
'director',
'loader!pages',
'loader!',
'crud'
],
function(Director, pages) {
  var routes = {
        '/': pages.home
      },
      router = new Director(routes);

  crud.configure({ base: '/' });

  router.init('/');
});
