define(
[
'ractive', 'jquery', 'lodash', 'bootstrap', 'rv!./template'
],
function(Ractive, $, _, bootstrap, template) {

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

    ractive.on('forgot', function() {
      this.set('user.email', '');
      this.set('message', true);
      this.set('error', null);
    });

    ractive.on('failedForgot', function() {
      this.set('error', false);
      this.set('message', false);

      // time to reset hidden div
      setTimeout(function() { ractive.set('error', true); });
    });
  }
});
