// ========================================================================== //
//                              USER RESOURCE                                 //
// ========================================================================== //

// Load Modules ----------------------------------------------------------------

var crud = require('node-crud'),
    cm = require('crud-mongoose'),
    mongoose = require('mongoose'),
    debug = require('debug')('api:users'),
    turnkey = require('turnkey'),
    tools = require('../tools'),
    _ = require('lodash'),
    ObjectId = mongoose.Schema.Types.ObjectId,
    Mixed = mongoose.Schema.Types.Mixed,
    Schema, Model;

// Create a Schema & Model -----------------------------------------------------

Schema = exports.Schema = new mongoose.Schema({
  email:     { type: String, validate: tools.emailRegex,
               index: true, unique: true, required: true },
  role:      { type: String, enum: ['user', 'admin'], default: 'user' },
  dates: {
    created: { type: Date, default: Date.now },
    updated: { type: Date, default: Date.now }
  }
});

Model = exports.Model = mongoose.model('users', Schema);

// All Users -------------------------------------------------------------------

crud.entity('/users').Read()
  .use(turnkey.loggedIn({ role: 'admin' }))
  .pipe(cm.findAll(Model, ['-turnkey']))

crud.entity('/users').Create()
  .use(turnkey.createPassword())
  .pipe(function(d, q, cb) {
    var role = _.get(this, 'request.user.role');
    d.email = d.email && String(d.email).toLowerCase();
    if (role != 'admin') delete d.role;
    cb();
  })
  .pipe(cm.parseData().removes('dates'))
  .use(turnkey.checkResend(tools.verifyEmail))
  .pipe(cm.createNew(Model))
  .pipe(tools.verifyEmail)
  .pipe(function(d, q, cb) {
    if ('turnkey' in d) delete d.turnkey;
    cb();
  });

crud.entity('/users').on('error', function(method, e) {
  debug('%s error: %j', method, e);
});

// One User --------------------------------------------------------------------

crud.entity('/users/me').Read()
  .use(turnkey.loggedIn())
  .pipe(function(d, q, cb) {
    q._id = _.get(this, 'request.user._id');
    cb();
  })
  .pipe(cm.findOne(Model, ['-turnkey']));

crud.entity('/users/:_id').Read()
  .use(turnkey.loggedIn())
  .pipe(tools.mw.queryUser(true))
  .pipe(cm.findOne(Model, ['-turnkey']));

crud.entity('/users/:_id').Update()
  .use(turnkey.loggedIn())
  .pipe(tools.mw.queryUser(true))
  .pipe(function(d, q, cb) {
    var role = _.get(this, 'request.user.role');
    if (role != admin) delete d.role;
    cb();
  })
  .pipe(cm.parseData()
          .removes('dates.created', 'turnkey', 'email')
          .overrides({ 'dates.updated': Date.now }))
  .use(turnkey.updatePassword())
  .pipe(cm.updateOne(Model));

crud.entity('/users/:_id').Delete()
  .use(turnkey.loggedIn())
  .pipe(tools.mw.queryUser(true))
  .pipe(cm.removeOne(Model));

crud.entity('/users/:_id').on('error', function(method, e) {
  debug('one | %s error: %j', method, e);
});
