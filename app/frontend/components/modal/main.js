define(
[
'ractive',
'rv!./template'
],
function(Ractive, template) {

  return Ractive.extend({
    // by default, the modal should sit atop the <body>...
    el: document.body,

    // ...but it should append to it rather than overwriting its contents
    append: true,

    // should have only isolated data
    isolated: true,

    // all Modal instances will share a template (though you can override it
    // on a per-instance basis, if you really want to)
    template: template,

    // the onrender function will be called as soon as the instance has
    // finished rendering
    onrender: function() {
      var self = this, resizeHandler, keyupHandler;

      // store references to the background, and to the modal itself
      // we'll assume we're in a modern browser and use querySelector
      this.outer = this.find('.modal-component-outer');
      this.modal = this.find('.modal-component');
      this.background = this.find('.modal-component-background');

      // if the user taps on the background, close the modal
      this.on('close', function(event) {
        if (!this.modal.contains(event.original.target)) {
          this.teardown();
        }
      });

      // when the window resizes,
      // keep the modal horizontally and vertically centered
      window.addEventListener('resize', resizeHandler = function() {
        self.center();
      }, false);

      // listen for escape click
      window.addEventListener('keyup', keyupHandler = function(event) {
        if (!event || event.keyCode !== 27) return;
        self.teardown();
      });

      // clean up after ourselves later
      this.on('teardown', function() {
        window.removeEventListener('resize', resizeHandler);
        window.removeEventListener('keyup', keyupHandler);
      }, false);

      // manually call this.center() the first time
      this.center();
    },

    center: function() {
      var outerHeight, modalHeight, verticalSpace;

      // horizontal centring is taken care of by CSS, but we need to
      // vertically centre
      outerHeight = this.background.clientHeight;
      modalHeight = this.modal.clientHeight;

      verticalSpace = (outerHeight - modalHeight) / 2;

      this.modal.style.top = verticalSpace + 'px';
    }
  });

});
