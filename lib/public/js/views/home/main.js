define([
  'lodash', 'utools', 'waves',
  'text!./template.mustache'
],
function(_, utools, waves, template) {
  var view = waves(template);

  view.prototype.h1click = function(event) {
    console.log('You have clicked the h1');
  }

  return view;
});
