'use strict';

var gulp = require('gulp');
var browserify = require('browserify');
var del = require('del');
var source = require('vinyl-source-stream');
var browserSync = require('browser-sync');
var babel = require('babelify');
var rename = require('gulp-rename');
var reload = browserSync.reload;


gulp.task('clean', function(done) {
  del(['dist'], done);
});

gulp.task('bundle', function () {
  browserify('./src/index.js')
    .transform(babel)
    .bundle()
    .pipe(source('build.js'))
    .pipe(gulp.dest('dist'));
});

gulp.task('copy:css', function () {
  gulp.src('src/index.css')
    .pipe(rename('build.css'))
    .pipe(gulp.dest('dist'))
});

gulp.task('copy:html', function () {
  gulp.src('index.html')
    .pipe(gulp.dest('dist'))
});

gulp.task('build:dev', ['bundle', 'copy:css', 'copy:html'], function () {
  browserSync({
    notify: false,
    port: process.env.PORT || 9000,
    server: {
      baseDir: ['dist']
    }
  });

  gulp.watch('src/index.css', [reload]);
  gulp.watch('src/index.js', [reload]);
  gulp.watch('index.html', [reload]);
});

