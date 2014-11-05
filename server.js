
var nconf = loadConfigs(require('nconf')),
    express = require('express'),
    api = require('./app/backend/api'),
    __production__ = !!~process.argv.indexOf('PRODUCTION'),
    mustache =  require('mustache-express')(),
    winston = require('winston'),
    app = express();

// ============================== CONFIGURE APP ============================= //

// configure logging
winston.remove(winston.transports.Console);
winston.add(winston.transports.Console, {
  level: nconf.get('log_level') || 'info',
  colorize: true,
  prettyPrint: true
});
winston.exitOnError = false;

// configure express app
app.set('host', nconf.get('HOST'))
app.engine('html', mustache);
app.set('view engine', 'html');
app.set('views', __dirname + '/app/backend/shells');
if (!__production__) mustache.cache._max = 0;  // turn off mustache caching

// toplevel middleware
if (!__production__) app.use(require('morgan')('dev'));
app.use(require('serve-favicon')(__dirname +
                                '/app/frontend/images/favicon.ico'));
app.use(require('compression')());
app.use('/public', require('serve-static')(__dirname + '/app/frontend'));
app.use(require('cookie-session')({ secret: '__SECRET__' }));
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('body-parser').json());

// configure methods to log route
configureMethod(app, 'get');
configureMethod(app, 'put');
configureMethod(app, 'post');
configureMethod(app, 'delete');

// start app
app.listen(nconf.get('PORT'), function() {
  console.log('App listening on port %s', nconf.get('PORT'));

  // Configure api
  api(app);

  // Configure routes for shells
  app.get('/*', function(req, res, next) {
    res.render('main', {
      production: __production__,
      locals: JSON.stringify({
        user: req.user || {},
        production: __production__
      })
    });
  });

  // Error handlers
  if (!__production__) app.use(require('errorhandler')());
});

// ================================= TOOLS ================================== //

function configureMethod(app, method) {
  var m = app[method];

  app[method] = function(path) {
    if (arguments.length < 2) return m.apply(this, arguments);
    console.log('%s route:', method, path);
    return m.apply(this, arguments);
  }
}

function loadConfigs(nconf) {
  nconf
    .argv()  // overrides everything
    .env()   // overrides config file
    .file({ file: __dirname + '/config/settings.json' });
  nconf.set('lib', __dirname + '/app');
  nconf.set('PORT', '5000');
  nconf.set('HOST', '127.0.0.1');
  return nconf;
}
