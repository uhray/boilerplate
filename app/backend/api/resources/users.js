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
    ObjectId = mongoose.Schema.Types.ObjectId,
    Mixed = mongoose.Schema.Types.Mixed,
    Schema, Model;

// Create a Schema & Model -----------------------------------------------------

Schema = exports.Schema = new mongoose.Schema({
  firstName: { type: String },
  lastName:  { type: String },
  email:     { type: String, pattern: tools.emailRegex,
               index: true, unique: true, required: true },
  role:      { type: String, enum: ['user', 'admin'] },
  info: {
    gender: { type: String, enum: ['M', 'F'] },
    age: Number
  },
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
    d.email = d.email && String(d.email).toLowerCase();
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

crud.entity('/users').Delete()
  // .use(turnkey.loggedIn())
  // authentication commented out for boilerplate
  .pipe(cm.removeAll(Model));

crud.entity('/users').on('error', function(method, e) {
  debug('%s error: %j', method, e);
});

// One User --------------------------------------------------------------------

crud.entity('/users/:_id').Read()
  // .use(turnkey.loggedIn())
  // authentication commented out for boilerplate
  .pipe(cm.findOne(Model, ['-turnkey']));

crud.entity('/users/:_id').Update()
  // .use(turnkey.loggedIn())
  // authentication commented out for boilerplate
  .pipe(cm.parseData()
          .removes('dates.created', 'turnkey', 'email')
          .overrides({ 'dates.updated': Date.now }))
  .use(turnkey.updatePassword())
  .pipe(cm.updateOne(Model));

crud.entity('/users/:_id').Delete()
  // .use(turnkey.loggedIn())
  // authentication commented out for boilerplate
  .pipe(cm.removeOne(Model));

crud.entity('/users/:_id').on('error', function(method, e) {
  debug('one | %s error: %j', method, e);
});
