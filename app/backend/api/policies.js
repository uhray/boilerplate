var policies = module.exports = exports = {};

// policies.loggedIn - make sure a user is logged in
//
// The returns a crud middleware function to check if the user is logged in.
// If there are any vals, structured as an object of key-value, then in makes
// sure this user has the correct credentials.
//
// policies.loggedIn({ role: 'admin' })
//    --> makes sure the user is an admin
// policies.loggedIn({ role: [ 'admin', 'root' ] })
//    --> makes sure the user is an admin or root
policies.loggedIn = function(vals) {
  return function(data, query, callback) {
    var k;
    if (this.request && this.request.user && this.request.user._id) {
      for (k in vals) {
        if (vals[k] instanceof Array) {
          if (!~vals[k].indexOf(this.request.user[k]))
            return callback('unauthorized');
        } else if (vals[k] != this.request.user[k]) {
          return callback('unauthorized');
        }
      }

      return callback();
    }
    else return callback('you must be logged in');
  }
}
