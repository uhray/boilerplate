define(
[
'ractive', 'jquery', 'lodash',
'rv!./template'
],
function(Ractive, $, _, template) {

  return function() {
    var ractive;

    ractive = new Ractive({
      el: '#body',
      template: template,
      data: {
        time: new Date(),
        showModal: false
      },
      computed: {
        timestamp: function() {
          var t = this.get('time');
          return t.getHours() + ':' + t.getMinutes() + ':' + t.getSeconds();
        }
      }
    });

    ractive.on('modal.teardown', function() {
      this.set('showModal', false);
    });

    setInterval(function() {
      ractive.set('time', new Date());
    }, 1000);

  }

});
