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

    ractive.on('failedLogin', function(event) {
      var em = event.error && event.error.message || event.error;
      
      this.set('error', false);

      // time to reset hidden div
      setTimeout(function() {
        ractive.set({
          error: true,
          takenEmail: /E11000/.test(String(em))
        });
      });
    });

    ractive.on('success', function(event) {
      console.log(event);
      ractive.set({ error: null, success: true });
    });
  }
});
