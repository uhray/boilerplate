define(
[
'loader!pages',
'crud',
'angular',
'loader!'
],
function(pages, crud, angular) {
  var app = angular.module('app.context', ['ngRoute']);

  crud.configure({ base: '/' });

  app.config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/', pages.home);
  }]);

  angular.bootstrap(document, ['app.context']);
});
