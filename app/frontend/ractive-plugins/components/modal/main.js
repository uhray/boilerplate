define(
[
'ractive',
'rv!./template'
],
function(Ractive, template) {

  return Ractive.components.modal = Ractive.extend({
    isolated: true,
    template: template,
    onrender: function(options) {
      var self = this, resizeHandler, keyupHandler;

      this._super(options);

      this.outer = this.find('.modal-component-outer');
      this.modal = this.find('.modal-component');
      this.background = this.find('.modal-component-background');

      this.on('close', function(event) {
        if (!this.modal.contains(event.original.target)) {
          this.teardown();
        }
      });

      window.addEventListener('resize', resizeHandler = function() {
        self.center();
      }, false);

      window.addEventListener('keyup', keyupHandler = function(event) {
        if (!event || event.keyCode !== 27) return;
        self.teardown();
      });

      this.on('teardown', function() {
        window.removeEventListener('resize', resizeHandler);
        window.removeEventListener('keyup', keyupHandler);
      }, false);

      this.center();
    },

    center: function() {
      var outerHeight, modalHeight, verticalSpace;

      outerHeight = this.background.clientHeight;
      modalHeight = this.modal.clientHeight;

      verticalSpace = (outerHeight - modalHeight) / 2;

      this.modal.style.top = verticalSpace + 'px';
    }
  });

});
