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
    minifyCSS = require('gulp-minify-css');

// Top Level Commands ----------------------------------------------------------

gulp.task('default', ['info']);
gulp.task('dev', ['doDev']);
gulp.task('prod', ['doProd']);
gulp.task('build', ['prod-build']);
gulp.task('lint', ['dolint']);

// Helper Tasks ----------------------------------------------------------------

gulp.task('info', function() {
  console.log('\nUsage:\t gulp [ dev | prod | lint | build ]\n');
});

gulp.task('heroku', ['bower_install']);

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
  return gulp.src('app/frontend/styles/*.scss')
             .pipe(sass())
             .on('error', function(e) {
                console.log('sass error:', e.message);
              })
             .pipe(autoprefixer())
             .pipe(gulp.dest('app/frontend/styles/css'));
});

gulp.task('scss_to_css', function() {
  return gulp.src('app/frontend/styles/*.scss')
             .pipe(sass())
             .on('error', function(e) {
                console.log('sass error:', e.message);
              })
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
          .pipe(minifyCSS())
          .pipe(concat(name + '.css'))
          .pipe(gulp.dest('app/frontend/styles/css/_prod'))
      }));
});

gulp.task('minify_js', function() {
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
