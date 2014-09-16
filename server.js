
var express = require('express'),
    logging = require('./lib/config/logging'),
    api = require('./lib/backend/api'),
    __production__ = !!~process.argv.indexOf('PRODUCTION'),
    mustache =  require('mustache-express')(),
    app = express();


// ============================== CONFIGURE APP ============================= //

// load configurations
require('nconf')
  .argv()  // overrides everything
  .env()   // overrides config file
  .file({ file: __dirname + '/lib/config/config.json' })
  .set('lib', __dirname + '/lib');

// configure express app
app.set('host', process.env.HOST || '127.0.0.1');
app.engine('mustache', mustache);
app.set('view engine', 'mustache');
app.set('views', __dirname + '/lib/backend/shells');
if (!__production__) mustache.cache._max = 0;  // turn off mustache caching

// toplevel middleware
app.use(require('morgan')('dev'));
app.use(require('serve-favicon')(__dirname +
                                '/lib/frontend/images/favicon.ico'));
app.use(require('compression')());
app.use('/public', require('serve-static')('lib/frontend'));
app.use(require('cookie-session')({ secret: '__SECRET__' }));
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('body-parser').json());

// configure methods to log route
configure_method(app, 'get');
configure_method(app, 'put');
configure_method(app, 'post');
configure_method(app, 'delete');

// start app
app.listen(process.env.PORT || 3000, function() {
  console.log('App listening on port %s', process.env.PORT || 3000);

  // Configure api
  api(app);


  // Configure routes for shells
  app.get('/*', function(req, res, next) {
    res.render('main', {
      production : __production__,
      locals : JSON.stringify({
        user: req.user || {}
      })
    });
  });


  // Error handlers
  if (!__production__) app.use(require('errorhandler')());
});


// ================================= TOOLS ================================== //

function configure_method(app, method) {
  var m = app[method];

  app[method] = function(path) {
    if (arguments.length < 2) return m.apply(this, arguments);
    console.log('%s route:', method, path);
    return m.apply(this, arguments);
  }
}

