var nconf = require('nconf'),
    turnkey = require('turnkey'),
    logger = require('winston'),
    mongoose = require('mongoose'),
    crud = require('node-crud'),
    tools = require('./tools'),
    resources = require('require-dir')('./resources');

module.exports = exports = function(app) {
  var url = nconf.get('MONGO_URL');

  // set up auth here //
  turnkey.launch({
    logger: logger,
    router: app,
    model: resources.users.Model,
    cors: nconf.get('cors'),
    usernameKey: 'email',
    verificationOn: true,
    forgotMailer: tools.forgotMailer
  });

  // launch crud api
  crud.configure({ cors: nconf.get('cors') });
  crud.launch(app);

  // all other routes
  app.get('/api/*', function(req, res) {
    res.status(404).json({ error: 'Route not found' });
  });

  // connect to db
  if (!url) return logger.warn('No MONGO_URL. Not attaching to db.');

  mongoose.connect(url);
  mongoose.connection.on('error', function(e) {
    console.error('Mongoose default connection error: ' + e);
  });
  mongoose.connection.once('connected', function() {
    console.log('connected to db.');
  });
}

// Middleware ------------------------------------------------------------------

tools.mw = {};

tools.mw.queryUser = function() {
  return function(d, q, cb) {
    var req = this.request;

    if (!(req && req.user)) return cb('unauthorized');

    // not needed for admins
    if (req.user.role == 'admin') return cb();

    q.user = String(req.user._id);
    cb();
  };
};

tools.mw.dataUser = function() {
  return function(d, q, cb) {
    var req = this.request;

    if (!(req && req.user)) return cb('unauthorized');

    // if an admin specifies otherwise, it can do things on
    // another user's behalf
    if (req.user.role == 'admin' && d && d.user) return cb();

    d.user = String(req.user._id);
    cb();
  };
};
