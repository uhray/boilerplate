var express = require('express'),
    app = express();


// ============================ CONFIGURE APP ============================= //
app.set('host', process.env.HOST || '127.0.0.1');
app.set('view engine', 'jade');
app.engine('jade', require('jade').__express);
app.use(require('morgan')('dev'));
app.use(require('compression')());
app.set('views', 'lib/views/static');
app.use('/public', require('serve-static')('lib/public'));

app.listen(process.env.PORT || 3000, function() {

  console.log('App listening on port %s', process.env.PORT || 3000);

  // Configure web
  app.get('/:page', function(req, res, next) {
    res.render(req.params.page, {});
  });

  // Error handlers
  app.use(function(e, req, res, n) {
    // silence errors
  });

});
