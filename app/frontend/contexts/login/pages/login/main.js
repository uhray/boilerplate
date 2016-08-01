define(
[
'ractive', 'jquery', 'lodash', 'bootstrap', 'rv!./template'
],
function(Ractive, $, _, bootstrap, template) {

  y = Ractive;
  return function() {
    var ractive;

    ractive = new Ractive({
      el: '#body',
      template: template,
      data: {
        user: {}
      },
      computed: {
      }
    });

    ractive.on('failedLogin', function() {
      this.set('error', false);

      // time to reset hidden div
      setTimeout(function() { ractive.set('error', true); });
    });

    ractive.on('login', function() {
      window.location = '/';
    });
  }
});
