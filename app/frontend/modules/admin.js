var myApp = angular.module('myApp', ['ng-admin']);

myApp.config(
['NgAdminConfigurationProvider', 'RestangularProvider',
function(NgAdminConfigurationProvider, RestangularProvider) {
    var nga = NgAdminConfigurationProvider,
        admin = nga.application('Admin Panel');

    admin.baseApiUrl('/api/');

    // Creating entities -------------------------------------------------------

    userEntity(nga, admin);

    // Configure REST API ------------------------------------------------------

    RestangularProvider.addResponseInterceptor(
      function(obj, op, what, url, res, deffered) {
        return obj && obj.data || [];
      }
    );

    RestangularProvider.addFullRequestInterceptor(
      function(element, operation, what, url, headers, params, httpConfig) {
        var p = {};
        if (operation == 'getList') {
          p.page = params._page - 1;
          p.perPage = params._perPage;
          p.sortBy = params._sortField + ':' + params._sortDir.toLowerCase();
        }
        return { params: p };
      }
    );

    // attach and run ----------------------------------------------------------

    nga.configure(admin);
}]);

function userEntity(nga, admin) {
  var user = nga.entity('users');

  user.identifier(nga.field('_id'));

  user.listView().fields([
    nga.field('name').isDetailLink(true),
    nga.field('email'),
    nga.field('role')
  ]);

  user.creationView().fields([
    nga.field('name', 'string')
       .validation({ required: true }),
    nga.field('email', 'email')
       .validation({ required: true }),
    nga.field('role', 'choice')
       .validation({ required: true })
       .choices([{ label: 'admin', value: 'admin' },
                 { label: 'user', value: 'user' }]),
    nga.field('dates.created', 'datetime')
       .validation({ required: true }),
    nga.field('dates.updated', 'datetime')
       .validation({ required: true }),
  ]);

  user.deletionView().enable(true);

  user.editionView().fields(user.creationView().fields());

  admin.addEntity(user);
}
