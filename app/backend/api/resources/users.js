// ========================================================================== //
//                              USER RESOURCE                                 //
// ========================================================================== //

// Load Modules ----------------------------------------------------------------

var crud = require('node-crud'),
    cm = require('crud-mongoose'),
    mongoose = require('mongoose'),
    debug = require('debug')('api:users'),
    turnkey = require('turnkey'),
    ObjectId = mongoose.Schema.Types.ObjectId,
    Mixed = mongoose.Schema.Types.Mixed,
    Schema, Model;

// Create a Schema & Model -----------------------------------------------------

Schema = exports.Schema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName:  { type: String, required: true },
  username: { type: String, index: true, unique: true },
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
  // .use(turnkey.loggedIn()) authentication commented out for boilerplate
  .pipe(cm.findAll(Model, ['-turnkey']));

crud.entity('/users').Create()
  .use(turnkey.createPassword())
  .use(function(d, q, cb) {
    d.username = d.username && d.username.toLowerCase();
    cb();
  })
  .pipe(cm.createNew(Model));

crud.entity('/users').Delete()
  // .use(turnkey.loggedIn()) authentication commented out for boilerplate
  .pipe(cm.removeAll(Model));

crud.entity('/users').on('error', function(method, e) {
  debug('%s error: %j', method, e);
});

// One User --------------------------------------------------------------------

crud.entity('/users/:_id').Read()
  // .use(turnkey.loggedIn()) authentication commented out for boilerplate
  .pipe(cm.findOne(Model, ['-turnkey']));

crud.entity('/users/:_id').Update()
  // .use(turnkey.loggedIn()) authentication commented out for boilerplate
  .pipe(cm.parseData()
          .removes('dates.created', 'turnkey')
          .overrides({ 'dates.updated': Date.now }))
  .use(turnkey.updatePassword())
  .pipe(cm.updateOne(Model));

crud.entity('/users/:_id').Delete()
  // .use(turnkey.loggedIn()) authentication commented out for boilerplate
  .pipe(cm.removeOne(Model));

crud.entity('/users/:_id').on('error', function(method, e) {
  debug('one | %s error: %j', method, e);
});
