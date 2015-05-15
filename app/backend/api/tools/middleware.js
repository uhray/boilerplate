var mw = module.exports = exports = {};

mw.hasRole = function() {
  var roles = Array.prototype.slice.call(arguments);

  return function(d, q, cb) {
    var req = this.request,
        user = req && req.user;

    if (!user) cb('unauthorized');
    if (!~roles.indexOf(user.role)) cb('unauthorized');
    cb();
  }
}
