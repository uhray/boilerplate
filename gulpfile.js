var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    runSequence = require('run-sequence'),
    htmlreplace = require('gulp-html-replace'),
    replace = require('gulp-replace'),
    assets = require('gulp-assets-grabber'),
    child = require('child_process'),
    concat = require('gulp-concat'),
    foreach = require('gulp-foreach'),
    path = require('path'),
    uglify = require('gulp-uglify'),
    minifyCSS = require('gulp-minify-css'),
    fs = require('fs'),
    _ = require('lodash');

// Top Level Commands ----------------------------------------------------------

gulp.task('default', ['info']);
gulp.task('dev', ['doDev']);
gulp.task('prod', ['doProd']);
gulp.task('build', ['prod-build']);
gulp.task('lint', ['dolint']);

// Helper Tasks ----------------------------------------------------------------

gulp.task('info', function() {
  console.log('\nUsage:\t gulp [ dev | prod | lint | build | swagger ]\n');
});

gulp.task('heroku', ['bower_install']);

gulp.task('swagger', function() {
  require('./scripts/swagger');
});

gulp.task('install', function(cb) {
  runSequence(
    'npm_install',
    'bower_clean',
    'bower_install',
    cb
  );
});

gulp.task('npm_install', function(cb) {
  child.spawn(
    'npm',
    ['install', '--ignore-scripts'],
    { stdio: 'inherit' }
  ).on('close', cb);
});

gulp.task('bower_clean', function(cb) {
  child.spawn(
    './node_modules/bower/bin/bower',
    ['cache', 'clean'],
    { stdio: 'inherit' }
  ).on('close', cb);
});

gulp.task('bower_install', function(cb) {
  child.spawn(
    './node_modules/bower/bin/bower',
    ['install'],
    { stdio: 'inherit' }
  ).on('close', cb);
});

gulp.task('scss_to_css_prod', function() {
  return sass('app/frontend/styles/[^_]*.scss')
             .on('error', sass.logError)
             .pipe(autoprefixer())
             .pipe(gulp.dest('app/frontend/styles/css'));
});

gulp.task('scss_to_css', function() {
  return sass('app/frontend/styles/[^_]*.scss')
             .on('error', sass.logError)
             .pipe(gulp.dest('app/frontend/styles/css'));
});

gulp.task('dev-server', function() {
  child.spawn('foreman', ['start', 'dev'], { stdio: 'inherit' });
});

gulp.task('prod-server', function() {
  child.spawn('foreman', ['start', 'web'], { stdio: 'inherit' });
});

gulp.task('scss_watch', function() {
  gulp.watch('app/frontend/styles/*.scss', ['scss_to_css']);
  gulp.watch('app/frontend/styles/**/*.scss', ['scss_to_css']);
});

gulp.task('prod_watch', function() {
  gulp.watch('app/frontend/styles/*.scss', ['scss_to_css_prod']);
  gulp.watch('app/frontend/*/**/*.js', ['minify_js']);
  gulp.watch('app/frontend/configure.js', ['minify_js']);
  gulp.watch('app/frontend/router.js', ['minify_js']);
});

gulp.task('dolint', function(cb) {
  child.spawn('./node_modules/.bin/jscs', ['./'], { stdio: 'inherit' })
       .on('close', cb);
});

gulp.task('html_replace', function() {
  return gulp.src('app/backend/shells/*.html')
      .pipe(htmlreplace({
        css: {
          src: null,
          tpl: '<link rel="stylesheet" href="/public/styles/css/_prod/%f.css">'
        }
      }))
      .pipe(replace(/src="\/public\/bower\/requirejs\/require.js"/, ''))
      .pipe(replace(
        /data-main="(.*)"/,
        'src="/public/contexts/_prod/{{context}}.js"'
      ))
      .pipe(gulp.dest('app/backend/shells/_prod'))
});

gulp.task('join_css', function() {
  return gulp.src('app/backend/shells/*.html')
      .pipe(foreach(function(stream, file) {
        var name = path.basename(file.history[file.history.length - 1])
                       .replace('.html', '');

        return stream
          .pipe(assets.css('css', function(d) {
            return d.replace('\/public', 'app/frontend');
          }))
          .pipe(foreach(function(stream, file) {
            var p = _.last(file.history);

            if (!p) return stream;

            p = p.replace(/^\/?app\/frontend/, '/public');
            p = p.replace(path.basename(p), '');

            return stream.pipe(replace(
              /url\((["'])?((\.\/)|(.)([a-zA-Z0-9]+\/))/g,
              'url($1' + p + '$4$5'
            ))
          }))
          .pipe(minifyCSS())
          .pipe(replace(/url\((["'])?.*?\/bower/g, 'url($1/public/bower'))
          .pipe(concat(name + '.css'))
          .pipe(gulp.dest('app/frontend/styles/css/_prod'))
      }));
});

gulp.task('minify_js', ['join_js'], function() {
  return gulp.src('app/frontend/contexts/_prod/*.js')
             .pipe(uglify({ compress: { unused: false } }))
             .pipe(gulp.dest('app/frontend/contexts/_prod'));
});

gulp.task('join_js', function() {
  return gulp.src('app/frontend/contexts/*/configure.js')
      .pipe(foreach(function(stream, file) {
        var name = file.history[file.history.length - 1]
                       .replace(process.cwd(), '..'),
            dirs = name.split('/'),
            ctx = dirs[dirs.length - 2];

        return child.spawn(
          './node_modules/requirejs/bin/r.js',
          [
            '-o', 'config/rjs-build.js',
            'mainConfigFile=' + name,
            'out=' + './app/frontend/contexts/_prod/' + ctx + '.js',
            'include=contexts/' + ctx + '/configure',
            'insertRequire=contexts/' + ctx + '/configure'
          ],
          { stdio: 'inherit' }
        ).on('close', function() {
          this._events.end();
        });
      }));
});

gulp.task('prod-build', function(cb) {
  runSequence(
    'install',
    'semantic',
    'scss_to_css_prod',
    'minify_js',
    'join_css',
    'html_replace',
    cb
  );
});

gulp.task('dev-build', function(cb) {
  runSequence(
    'install',
    'scss_to_css',
    cb
  );
});

gulp.task('semantic', function(cb) {
  runSequence(
    'semantic-build',
    'semantic-to-scss',
    cb
  )
});

gulp.task('semantic-build', function(cb) {
  child.spawn('gulp', ['build'], { cwd: __dirname + '/semantic' })
    .on('close', cb);
});

gulp.task('semantic-to-scss', function(cb) {
  var css = String(fs.readFileSync(
        __dirname + '/app/frontend/semantic/components/site.min.css'
      )),
      many = /ui\.text\.([a-zA-Z0-9]+){color:#([a-zA-Z0-9]+)}/g,
      one = /ui\.text\.([a-zA-Z0-9]+){color:#([a-zA-Z0-9]+)}/,
      many2 = /ui\.text\.([a-zA-Z0-9]+),\.ui\.text\.[a-zA-Z0-9]+{color:#([a-zA-Z0-9]+)}/g,
      one2 = /ui\.text\.([a-zA-Z0-9]+),\.ui\.text\.[a-zA-Z0-9]+{color:#([a-zA-Z0-9]+)}/,
      str = '// Colors imported from Semantic-UI\n\n';

  (css.match(many) || []).forEach(function(m) {
    var a = m.match(one);
    if (!a) return;

    str += '$' + a[1] + ': #' + a[2] + ' !default;\n';
    str += '$color--' + a[1] + ': #' + a[2] + ' !default;\n';
  });

  (css.match(many2) || []).forEach(function(m) {
    var a = m.match(one2);
    if (!a) return;

    str += '$' + a[1] + ': #' + a[2] + ' !default;\n';
    str += '$color--' + a[1] + ': #' + a[2] + ' !default;\n';
  });

  fs.writeFileSync(
    __dirname + '/app/frontend/styles/_semantic.scss',
    str
  );

  return setTimeout(cb);
});

gulp.task('doDev', function(cb) {
  runSequence(
    'dev-build',
    'dev-server',
    'scss_watch',
    cb
  );
})

gulp.task('doProd', function(cb) {
  runSequence(
    'prod-build',
    'prod-server',
    cb
  );
})
