define([
  'lodash', 'views/home/main'
],
function(_, view) {

return function(req, next) {
  var home = new view({ data: { title: 'Welcome Home' } });

  home.appendTo(document.body);
}

});
