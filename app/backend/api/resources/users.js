// =============================================================================
//                              USER RESOURCE                                 //
// =============================================================================

// Load Modules ----------------------------------------------------------------

var crud = require('node-crud'),
    cm = require('crud-mongoose'),
    mongoose = require('mongoose'),
    debug = require('debug')('api:users'),
    policies = require('../policies'),
    Schema, Model;

// Create a Schema & Model -----------------------------------------------------

Schema = exports.Schema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName:  { type: String, required: true },
  info: {
    gender: String,
    age: Number
  },
  dates: {
    created: { type: Date, default: Date.now },
    updated: { type: Date, default: Date.now },
    deleted: { type: Date }
  }
});

Model = exports.Model = mongoose.model('users', Schema);

// All Users -------------------------------------------------------------------

crud.entity('/users').Read()
  // .pipe(policies.loggedIn())  authentication commented out for boilerplate
  .pipe(cm.findAll(Model));

crud.entity('/users').Create()
  // .pipe(policies.loggedIn())  authentication commented out for boilerplate
  .pipe(cm.createNew(Model));

crud.entity('/users').Delete()
  // .pipe(policies.loggedIn())  authentication commented out for boilerplate
  .pipe(cm.removeAll(Model));

crud.entity('/users').on('error', function(method, e) {
  debug('%s error: %j', method, e);
});

// One User --------------------------------------------------------------------

crud.entity('/users/:_id').Read()
  // .pipe(policies.loggedIn())  authentication commented out for boilerplate
  .pipe(cm.findOne(Model));

crud.entity('/users/:_id').Update()
  // .pipe(policies.loggedIn())  authentication commented out for boilerplate
  .pipe(cm.updateOne(Model));

crud.entity('/users/:_id').Delete()
  // .pipe(policies.loggedIn())  authentication commented out for boilerplate
  .pipe(cm.removeOne(Model));

crud.entity('/users/:_id').on('error', function(method, e) {
  debug('one | %s error: %j', method, e);
});

