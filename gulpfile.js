var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    child = require('child_process');

// Top Level Commands ----------------------------------------------------------

gulp.task('default', ['info']);
gulp.task('install', ['npm_install', 'bower_clean', 'bower_install']);
gulp.task('static', ['install', 'scss_to_css', 'static_server', 'scss_watch']);
gulp.task('dev', ['install', 'scss_to_css', 'dev_server', 'scss_watch']);
gulp.task('prod', ['install', 'scss_to_css_prod', 'minify_js', 'prod_server']);
gulp.task('lint', ['dolint']);

// Helper Tasks ----------------------------------------------------------------

gulp.task('info', function() {
  console.log('\nUsage:\t gulp [ install | static | dev | prod | lint ]\n');
});

gulp.task('heroku', ['bower_install', 'scss_to_css_prod']);

gulp.task('npm_install', function(cb) {
  child.spawn('npm', ['install'], { stdio: 'inherit' })
       .on('close', cb);
});

gulp.task('bower_clean', function(cb) {
  child.spawn('./node_modules/bower/bin/bower', ['cache', 'clean'],
              { stdio: 'inherit' })
       .on('close', cb);
});

gulp.task('bower_install', ['bower_clean'], function(cb) {
  child.spawn('./node_modules/bower/bin/bower', ['install'],
              { stdio: 'inherit' })
       .on('close', cb);
});

gulp.task('scss_to_css_prod', function() {
  return gulp.src('app/frontend/styles/*.scss')
             .pipe(sass())
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

gulp.task('minify_js', ['bower_install'], function(cb) {
  child.spawn('./node_modules/requirejs/bin/r.js',
              ['-o', 'config/rjs-build.js'],
              { stdio: 'inherit' })
       .on('close', cb);
});

gulp.task('static_server', ['scss_to_css'], function() {
  child.spawn('foreman', ['start', 'static'], { stdio: 'inherit' });
});

gulp.task('dev_server', ['install', 'scss_to_css'], function() {
  child.spawn('foreman', ['start', 'dev'], { stdio: 'inherit' });
});

gulp.task('prod_server', ['install', 'scss_to_css_prod', 'minify_js'],
          function() {
  child.spawn('foreman', ['start', 'web'], { stdio: 'inherit' });
});

gulp.task('scss_watch', ['scss_to_css'], function() {
  gulp.watch('app/frontend/styles/*.scss', ['scss_to_css']);
});

gulp.task('dolint', function() {
  child.spawn('./node_modules/.bin/jscs', ['./'], { stdio: 'inherit' });
});
