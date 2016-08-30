define(
[
'ractive', 'jquery', 'lodash', 'rv!./template',
'crud'
],
function(Ractive, $, _, template, crud) {

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

    ractive.on('doSubmit', function() {
      if (ractive.get('loading')) return;
      ractive.set('loading', true);

      crud('/turnkey/reset').update(this.get('user'), function(e) {
        ractive.set('loading', false);
        if (e) {
          ractive.set('error', false);
          // time to reset hidden div
          setTimeout(function() { ractive.set('error', true); });
        } else window.location = '#/';
      });
    })
  }
});
