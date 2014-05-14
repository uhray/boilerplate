var requirejs = require('requirejs'),
    express = require('express'),
    api = require('./lib/api'),
    app = express();


// ============================ CONFIGURE APP ============================= //
app.set('host', process.env.HOST || '127.0.0.1');
app.set('view engine', 'jade');
app.engine('jade', require('jade').__express);
app.use(require('connect-timeout')(5000));
app.use(require('morgan')('dev'));
app.use(require('cookie-parser')());
app.use(require('express-session')({ secret: '__SECRET__' }));
app.use(require('body-parser')());
app.use(require('compression')());
app.set('views', 'lib/views');
app.use('/public', require('serve-static')('lib/public'));
configure_method(app, 'get');
configure_method(app, 'put');
configure_method(app, 'post');
configure_method(app, 'delete');

app.listen(process.env.PORT || 3000, function() {
  console.log('App listening on port %s', process.env.PORT || 3000);


  // Configure api
  api(app);


  // Configure web
  app.get('/*', function(req, res, next) {
    res.render('main', {
      production : process.env.ENV == 'PRODUCTION',
      locals : {
        user: req.user || {}
      }
    });
  });


  // Error handlers
  app.use(require('errorhandler')());
});



// ================================ TOOLS ================================= //

function configure_method(app, method) {
  var m = app[method];

  app[method] = function(path) {
    if (arguments.length < 2) return m.apply(this, arguments);
    console.log('%s route:', method, path);
    return m.apply(this, arguments);
  }
}

