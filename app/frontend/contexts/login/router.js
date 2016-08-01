define(
[
'director',
'loader!pages',
'crud',
'ractive',
'loader!extensions'
],
function(Director, pages, crud, Ractive) {
  var routes = {
        '/': pages.login,
        '/signup': pages.signup,
        '/reset/:id': pages.reset,
        '/forgot': pages.forgot
      },
      router = new Director(routes);

  crud.configure({ base: '/' });

  Ractive.prototype.validatorDefaultOptions({
    orientation: 'inline',
    insertMode: 'append'
  });

  router.configure({
    notfound: pages.home,
    before: function() {
      crud.cancelAll();
    }
  });
  router.init('/');
});
