var nconf = loadConfigs(require('nconf')),
    pkg = require('../package.json'),
    _ = require('lodash'),
    resources = require('require-dir')('../app/backend/api/resources'),
    debug = require('debug'),
    mongoose = require('mongoose'),
    crud = require('node-crud'),
    swagger = {},
    ObjectId = mongoose.Schema.Types.ObjectId,
    Mixed = mongoose.Schema.Types.Mixed,
    fs = require('fs'),
    editor = require('swagger-editor-server'),
    log = debug('bp');

swagger.swagger = '2.0';
swagger.info = {
  version: pkg.version,
  title: pkg.name,
  description: pkg.description || 'No description'
};

swagger.host = nconf.get('PUBLIC_URL').replace(/.*\/\//, '');
swagger.basePath = '/api';

swagger.schemes = ['http', 'https'];
swagger.consumes = ['application/json'];
swagger.produces = ['application/json'];

// definitions -----------------
swagger.definitions = {};

_.each(resources, function(d, k) {
  var props = {},
      def = { title: k, type: 'object', properties: props,
              required: [] };

  // If the resource does not have a mongoose model, then
  // there should be no associated swagger definitions.
  if (!(d && d.Model)) return;

  swagger.definitions[k] = def;

  log('resource: %s', k);

  d.Model.definitionName = k;  // saving for references in routes
  handleObj(def, props, d.Schema.tree);

  function handleObj(def, props, schema) {
    _.each(schema, function(val, key) {
      var info = {}, tmp;

      if (key == 'id') return;  // remove mongoose' virtual types
      if (key == '__v') return;  // remove mongoose' virtual types

      info.type = val.type || val;

      if (info.type instanceof Array) {
        tmp = info.type;
        info.type = 'array';
        if (tmp.length) {
          tmp = { type: 'object', required: [], properties: {} };
          handleObj(tmp, tmp.properties, { items: (val.type || val)[0] });
          info.items = tmp.properties.items;
        }
      } else if (info.type === Array) info.type = 'array';
      else if (info.type === String) info.type = 'string';
      else if (info.type === Number) info.type = 'number';
      else if (info.type === Date) {
        info.type = 'string';
        info.format = 'dateTime';
      } else if (info.type === ObjectId) {
        info.type = 'string';
        info.format = 'ObjectId';
        info.description = 'Mongo DB ObjectID'
      } else if (info.type === Mixed) {
        info.type = 'object';
        info.description = 'Mixed Object';
      } else if (typeof (info.type) == 'object' && _.size(info.type)) {
        info = { type: 'object', properties: {}, required: [] };
        handleObj(info, info.properties, val.type || val);
      } else {
        return log('Do not know type: ', val);
      }

      if (val.required) def.required.push(key);

      log('Adding %s', key);

      props[key] = info;
    });

    if (def.required.length == 0) delete def.required;
  }
});

// paths -----------------------
swagger.paths = {}

_.each(crud._entities, function(d, r) {
  var route = r.split('/').map(function(a) {
        if (a[0] == ':') return '{' + a.slice(1) + '}';
        else return a;
      }).join('/'),
      path = swagger.paths[route] = {},
      lookup = { post: 'Create', get: 'Read', put: 'Update', delete: 'Delete' };

  _.each(d._methods, function(info, method) {
    var m = path[method] = {},
        res = {};

    m.produces = ['applications/json'];
    m.responses = { 200: res };

    // TODO: enhance descriptions
    m.description = lookup[method] + ' ' + route.replace(/^\//, '');
    res.description = 'Data Response.';

    _.each(info._chain, function(fn) {
      if (fn.name == 'findAll' && fn.Model) {
        res.schema = standardResponse(true, fn.Model);
        m.parameters = findAllParameters();
      } else if (fn.name == 'createNew' && fn.Model) {
        res.schema = standardResponse(false, fn.Model);
        m.parameters = bodyParameters(fn.Model);
      } else if (fn.name == 'findOne' && fn.Model) {
        res.schema = standardResponse(false, fn.Model);
        m.parameters = oneObjectParameters(route);
      } else if (fn.name == 'updateOne' && fn.Model) {
        res.schema = standardResponse(false, fn.Model);
        m.parameters = bodyParameters(fn.Model);
        m.parameters = _.union(m.parameters, oneObjectParameters(route));
      } else if (fn.name == 'removeOne' && fn.Model) {
        res.schema = standardResponse(false, fn.Model);
        m.parameters = oneObjectParameters(route);
      }
    });

    // Finish up path parameters
    pathParameters(route, m);

    // Allow merging of other options
    _.merge(m, info._options);
  });
});

fs.writeFileSync(
  '/tmp/bp-swagger.yaml',
  require('js-yaml').dump(swagger),
  'utf8'
);

editor.edit('/tmp/bp-swagger.yaml');

// Useful Functions ------------------------------------------------------------

function loadConfigs(nconf) {
  nconf
    .argv()  // overrides everything
    .env()   // overrides config file
    .file({ file: __dirname + '/../config/settings.json' });
  nconf.set('PORT', '5000');
  nconf.set('HOST', '127.0.0.1');
  return nconf;
}

function oneObjectParameters(route) {
  var r = [];

  route.split('/').forEach(function(d) {
    if (!(/^{/.test(d) && /}$/.test(d))) return;
    d = d.replace('{', '').replace('}', '');

    r.push({
      name: d, in: 'path',
      type: 'string', required: true,
      description: 'ObjectID to find'
    })
  });

  return r;
}

function findAllParameters() {
  return [
    { name: 'limit', in: 'query',
      description: 'limits the number of records responded with',
      type: 'integer' },
    { name: 'skip', in: 'query',
      description: 'Skips this many records on the response',
      type: 'integer' },
    { name: 'page', in: 'query',
      description: 'Used for pagination. Indexed starting at zero.',
      type: 'integer' },
    { name: 'perPage', in: 'query',
      description: 'Number of records per page. Pagination doesn\'t ' +
                   'work well without a value here.',
      type: 'integer' },
    { name: 'sortBy', in: 'query',
      description: 'Sortable values. This is formatted like this: ' +
                   'firstvalue:asc,secondvalue:desc, where the comma denotes ' +
                   'different fields and the colon is used to show asc for ' +
                   'ascending or desc for descending. Default is ascending.',
      type: 'string' },
    { name: 'fields', in: 'query',
      description: 'A comma separated listed of fields to select.',
      type: 'string' },
    { name: '[other]', in: 'query',
      type: 'string',
      description: 'Any other mongo query on the object' }
  ]
}

function standardResponse(array, model) {
  var obj = {
    type: 'object',
    properties: {
      error: {
        type: 'object',
        description: 'Mixed object of error response. Null if no error.'
      }
    }
  };

  if (array) {
    obj.properties.data = { type: 'array' };
    if (model.definitionName) {
      obj.properties.data.items = {
        $ref: '#/definitions/' + model.definitionName
      };
    }
  } else if (model.definitionName) {
    obj.properties.data = {
      $ref: '#/definitions/' + model.definitionName
    }
  } else {
    obj.properties.data = { type: 'object' };
  }

  return obj;
}

function bodyParameters(model) {
  var p = {
      name: 'body',
      description: 'Full body of request',
      in: 'body',
      required: true
  };

  if (model.definitionName) {
    p.schema = { $ref: '#/definitions/' + model.definitionName };
  }

  return [p];
}

function pathParameters(route, method) {
  var matches = route.match(/({.*?})/g);

  if (_.get(matches, 'length') && !method.parameters) method.parameters = [];

  _.each(matches, function(name) {
    name = name.replace('{', '').replace('}', '');

    if (_.find(method.parameters, { name: name })) return;

    method.parameters.push({
      name: name,
      in: 'path',
      required: true,
      type: 'string',
      description: 'Path parameter for which {' + name + '}'
    });
  });
}
