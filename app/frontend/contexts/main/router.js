define(
[
'director',
'loader!pages',
'crud',
'ractive',
'loader!'
],
function(Director, pages, crud, Ractive) {
  var routes = {
        '/': pages.home
      },
      router = new Director(routes);

  crud.configure({ base: '/' });

  Ractive.prototype.validatorDefaultOptions({
    orientation: 'inline',
    insertMode: 'append'
  });

  router.configure({
    before: function() {
      crud.cancelAll();
    }
  });
  router.init('/');
});
