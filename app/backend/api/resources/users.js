// =============================================================================
//                              USER RESOURCE                                 //
// =============================================================================

// Load Modules ----------------------------------------------------------------

var crud = require('node-crud'),
    mongoose = require('mongoose'),
    debug = require('debug')('api:users'),
    policies = require('../policies'),
    tools = require('../tools'),
    Schema, Model;

// Create a Schema & Model -----------------------------------------------------

Schema = exports.Schema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName:  { type: String, required: true },
  booleans: {
    deleted: { type: Boolean, default: false }
  },
  dates: {
    created: { type: Date, default: Date.now, get: tools.getEpoch },
    updated: { type: Date, default: Date.now, get: tools.getEpoch },
    deleted: { type: Date, get: tools.getEpoch }
  }
});

Model = exports.Model = mongoose.model('users', Schema);

// All Users -------------------------------------------------------------------

crud.entity('/users').Read()
    // .pipe(policies.loggedIn())  authentication commented out for boilerplate
    .pipe(function(data, query, cb) {
      Model.find(query).lean().exec(cb);
    });

crud.entity('/users').on('error', function(method, e) {
  debug('%s error: %j', method, e);
});

// One User --------------------------------------------------------------------

crud.entity('/users/:_id').Read()
    // .pipe(policies.loggedIn())  authentication commented out for boilerplate
    .pipe(function(data, query, cb) {
      Model.findOne(query).lean().exec(cb);
    });

crud.entity('/users/:_id').on('error', function(method, e) {
  debug('one | %s error: %j', method, e);
});

