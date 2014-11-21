var nconf = require('nconf'),
    turnkey = require('turnkey'),
    logger = require('winston'),
    mongoose = require('mongoose'),
    crud = require('node-crud'),
    resources = require('require-dir')('./resources');

module.exports = exports = function(app) {
  var url = nconf.get('MONGO_URL');

  // set up auth here //
  turnkey.launch({
    logger: logger,
    router: app,
    model: resources.users.Model,
    cors: nconf.get('cors'),
    verificationOn: false,
    forgotMailer: function(user, code, cb) {
      logger.info('Forgot code for %s: %s', user.username, code);
      cb();
    }
  });

  // launch crud api
  crud.configure({ cors: nconf.get('cors') });
  crud.launch(app);

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
