
var type = module.exports = exports = {};

type.array = function(d) { return d instanceof Array; }
type.object = function (d) { return !type.array(d) && typeof(d) == 'object'; }
type.string = function(d) { return typeof(d) == 'string'; }
type.number = function(d) { return typeof(d) == 'number'; }

type.email = function(d) {
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(d);
}
