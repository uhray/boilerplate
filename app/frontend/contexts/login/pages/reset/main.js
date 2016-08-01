define(
[
'ractive', 'jquery', 'lodash', 'bootstrap', 'rv!./template',
'crud'
],
function(Ractive, $, _, bootstrap, template, crud) {

  return function(code) {
    var ractive;

    ractive = new Ractive({
      el: '#body',
      template: template,
      data: {
        user: { code: code }
      },
      computed: {
      }
    });

    ractive.on('doUpdate', function() {
      if (ractive.get('submitting')) return;
      ractive.set('submitting', true);

      crud('/turnkey/reset').update(this.get('user'), function(e) {
        ractive.set('submitting', false);
        if (e) {
          ractive.set('error', false);
          // time to reset hidden div
          setTimeout(function() { ractive.set('error', true); });
        } else window.location = '#/';
      });
    })
  }
});
