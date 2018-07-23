'use strict';

const gulp = require('gulp');
const browserify = require('browserify');
const del = require('del');
const source = require('vinyl-source-stream');
const browserSync = require('browser-sync');
const babel = require('babelify');
const rename = require('gulp-rename');
const reload = browserSync.reload;

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

