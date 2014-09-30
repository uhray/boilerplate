var gulp = require('gulp'),
    sass = require('gulp-ruby-sass');

gulp.task('express', function() {
  return require('./server');
});

gulp.task('sass', function() {
  return gulp.src('app/frontend/styles/sass/*.scss')
             .pipe(sass({
                sourcemap: true,
                sourcemapPath: '../sass'
              }))
             .on('error', function (err) { console.log(err.message); })
             .pipe(gulp.dest('app/frontend/styles/css'));
});

gulp.task('watch', function() {
  gulp.watch('app/frontend/styles/sass/*.scss', ['sass']);
});


gulp.task('default', ['express', 'sass', 'watch']);
