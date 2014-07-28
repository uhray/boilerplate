var express = require('express'),
    fs = require('fs'),
    path = require('path'),
    util = require('util'),
    app = express();


// ============================ CONFIGURE APP ============================= //
app.set('host', process.env.HOST || '127.0.0.1');
app.set('view engine', 'jade');
app.engine('jade', require('jade').__express);
app.use(require('morgan')('dev'));
app.use(require('serve-favicon')(__dirname + '/lib/public/img/favicon.ico'));
app.use(require('compression')());
app.set('views', 'lib/views/static');
app.use('/public', require('serve-static')('lib/public'));

app.listen(process.env.PORT || 3000, function() {

  console.log('App listening on port %s', process.env.PORT || 3000);

  // Configure web
  app.get('/', function(req, res, next) {
    var files = fs.readdirSync(path.join(__dirname, 'lib/views/static'))
                  .filter(function(d) { return d[0] != '_'; })
                  .map(function(d) { return d.replace(/\.jade$/, '') }),
        _ = [ '<body><ul>',
             files.map(function(d) {
               return util.format('<li><a href="/%s">%s</a></li>', d, d)
             }).join('\n'),
             '</body></ul>' ];
    res.send(_.join('\n'));

  });

  app.get('/:page', function(req, res, next) {
    res.render(req.params.page, {});
  });

  // Error handlers
  app.use(require('errorhandler')());
});
