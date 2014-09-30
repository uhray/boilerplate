var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    child = require('child_process');

// Top Level Commands ----------------------------------------------------------
gulp.task('default', ['info']);
gulp.task('install', ['npm_install', 'post_install']);
gulp.task('static', ['install', 'static_server', 'scss_to_css', 'watch_scss']);
gulp.task('dev', ['install', 'dev_server', 'scss_to_css', 'watch_scss']);
gulp.task('prod', ['install', 'prod_server']);

// Helper Tasks ----------------------------------------------------------------

gulp.task('info', function() {
  console.log('\nUsage:\t gulp [ install | static | dev | prod ]\n');
});

gulp.task('npm_install', function() {
  child.spawn('npm', ['install'], { stdio: 'inherit' });
});

gulp.task('post_install', function() {
  child.spawn('./node_modules/bower/bin/bower', ['cache', 'clean'],
              { stdio: 'inherit' });
  child.spawn('./node_modules/bower/bin/bower', ['install'],
              { stdio: 'inherit' });
  child.spawn('./node_modules/requirejs/bin/r.js', ['-o', 'config/rjs-build.js'],
              { stdio: 'inherit' });
});

gulp.task('static_server', function() {
  child.spawn('foreman', ['start', 'static'], { stdio: 'inherit' });
});

gulp.task('dev_server', function() {
  child.spawn('foreman', ['start', 'dev'], { stdio: 'inherit' });
});

gulp.task('prod_server', function() {
  child.spawn('foreman', ['start', 'web'], { stdio: 'inherit' });
});

gulp.task('scss_to_css', function() {
  return gulp.src('app/frontend/styles/*.scss')
             .pipe(sass({
                sourcemap: true,
                sourcemapPath: '..'
              }))
             .on('error', function (err) { console.log(err.message); })
             .pipe(gulp.dest('app/frontend/styles/css'));
});

gulp.task('watch_scss', function() {
  gulp.watch('app/frontend/styles/*.scss', ['scss_to_css']);
});

