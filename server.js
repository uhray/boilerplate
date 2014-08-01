__production__ = !!~process.argv.indexOf('PRODUCTION');

var express = require('express'),
    api = require('./lib/api'),
    app = express();


// ============================ CONFIGURE APP ============================= //

// configure app
app.set('host', process.env.HOST || '127.0.0.1');
app.set('view engine', 'jade');
app.set('views', 'lib/views');
app.engine('jade', require('jade').__express);

// toplevel middleware
app.use(require('morgan')('dev'));
app.use(require('serve-favicon')(__dirname + '/lib/public/img/favicon.ico'));
app.use(require('compression')());
app.use('/public', require('serve-static')('lib/public'));
app.use(require('cookie-session')({
  secret: 'fdajk89n432;;fajkdjf',
}));
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


  // Configure web
  app.get('/*', function(req, res, next) {
    res.render('main', {
      production : __production__,
      locals : {
        user: req.user || {}
      }
    });
  });


  // Error handlers
  if (!__production__) app.use(require('errorhandler')());
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

