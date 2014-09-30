var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    child = require('child_process');

// Top Level Commands ----------------------------------------------------------
gulp.task('default', ['info']);
gulp.task('static', ['static-server', 'dev-scss', 'dev-watch']);
gulp.task('dev', ['dev-server', 'dev-scss', 'dev-watch']);
gulp.task('prod', ['prod-server']);

// Helper Tasks ----------------------------------------------------------------

gulp.task('info', function() {
  console.log('\nUsage:\t gulp [ static | dev | prod ]\n');
});

gulp.task('static-server', function() {
  child.spawn('foreman', ['start', 'static'], { stdio: 'inherit' });
});

gulp.task('dev-server', function() {
  child.spawn('foreman', ['start', 'dev'], { stdio: 'inherit' });
});

gulp.task('prod-server', function() {
  child.spawn('foreman', ['start', 'web'], { stdio: 'inherit' });
});

gulp.task('dev-scss', function() {
  return gulp.src('app/frontend/styles/*.scss')
             .pipe(sass({
                sourcemap: true,
                sourcemapPath: '..'
              }))
             .on('error', function (err) { console.log(err.message); })
             .pipe(gulp.dest('app/frontend/styles/css'));
});

gulp.task('dev-watch', function() {
  gulp.watch('app/frontend/styles/*.scss', ['dev-scss']);
});

