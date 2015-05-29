define(
[
'director',
'loader!pages',
'crud',
'loader!'
],
function(Director, pages, crud) {
  var routes = {
        '/': pages.home
      },
      router = new Director(routes);

  crud.configure({ base: '/' });

  router.init('/');
});
