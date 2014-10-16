var nconf = require('nconf'),
    turnkey = require('turnkey'),
    logger = require('winston'),
    mongoose = require('mongoose'),
    crud = require('node-crud'),
    resources = require('require-dir')('./resources');

module.exports = exports = function(app) {
  var url = nconf.get('MONGOHQ_URL');

  // set up auth here //
  turnkey.launch({
    logger: logger,
    router: app,
    model: resources.users.Model
  })

  // launch crud api
  crud.launch(app);

  // connect to db
  if (!url) return logger.warn('No MONGOHQ_URL. Not attaching to db.');

  mongoose.connect(url);
  mongoose.connection.on('error',function (e) {
    console.error('Mongoose default connection error: ' + e);
  });
  mongoose.connection.once('connected', function() {
    console.log('connected to db.');
  });
}


