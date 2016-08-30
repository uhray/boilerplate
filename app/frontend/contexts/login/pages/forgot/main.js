define(
[
'ractive', 'jquery', 'lodash', 'crud', 'rv!./template'
],
function(Ractive, $, _, crud, template) {

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

    ractive.on('doSubmit', function() {

      if (this.get('loading')) return;
      this.set({ loading: true, error: false, message: false });

      crud('/turnkey/forgot').create(this.get('user'), function(e, d) {
        ractive.set('loading', false);
        if (e) ractive.set('error', true);
        else {
          ractive.set('user.email', '');
          ractive.set('message', true);
        }
      });
    });
  }
});
