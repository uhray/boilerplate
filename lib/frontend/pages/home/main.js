define(
[
'ractivejs',
'rv!./template'
],
function(Ractive, template) {

return function() {
  var ractive = new Ractive({
        el: '#body',
        template: template,
        data: {
          time: new Date(),
          format: function(d) {
            return d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
          }
        }
      });

  setInterval(function() {
    ractive.set('time', new Date());
  }, 1000);

}
});
