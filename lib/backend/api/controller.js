var crud = require('node-crud'),
    models = require('./models'),
    json = cbax_json(),
    logger = require('winston'),
    debug = require('debug')('api'),
    api = module.exports = exports = {};

// =========================== API CONTROLLERS ============================== //

// api.users - retrieve all users
api.users = function(d, cb) {
  cb(null, []);
};

api.users.create = crud.cb({
  username: { type: 'string', description: 'username of new user',
              required: true }
}, function(d, cb) {
  cb(null, { username: d.username });
});

// ============================= UTILITIES ================================== //

function cbax_json() {
  var json = require('cbax').fresh(),
      cv = convert;

  json.use(function(e, d, next) {
    var data = d instanceof Array ? d.map(cv) : (d && cv(d));
    logger.silly('json converted data: %j', data);
    next(e, data);
  });

  return json;
}

function convert(d) {
  return (d && d.toJSON) ? d.toJSON({ getters: true }) : d;
}

