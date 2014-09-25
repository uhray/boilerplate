var crud = require('./crud'),
    models = require('./models'),
    nconf = require('nconf'),
    turnkey = require('turnkey'),
    url = nconf.get('MONGOHQ_URL'),
    logger = require('winston');

module.exports = exports = function(app) {
  // set up auth here //
  turnkey.launch({
    logger: logger,
    router: app,
    model: models.users,
  })

  // launch crud api
  crud.launch(app);
}

if (!url) return logger.warn('No MONGOHQ_URL. Not attaching to db.');

mongoose.connection.on('error',function (e) {
  console.error('Mongoose default connection error: ' + e);
});
mongoose.connection.once('connected', function() {
  console.log('connected to db.');
});
