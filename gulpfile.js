'use strict';

var autoprefixer = require('gulp-autoprefixer');
var browserify = require('browserify');
var cache = require('gulp-cache');
var concat = require('gulp-concat');
var del = require('del');
var gulp = require('gulp');
var jshint = require('gulp-jshint');
var livereload = require('gulp-livereload');
var minifycss = require('gulp-minify-css');
var notify = require('gulp-notify');
var rename = require('gulp-rename');
var source = require('vinyl-source-stream');
var streamify = require('gulp-streamify');
var uglify = require('gulp-uglify');

// JavaScript
gulp.task('js', function() {
  browserify({entries: './src/js/genomic.js',
              debug: process.env.production    // TODO weird, is this backwards??
             }).bundle()
  .pipe(source('genomic.js'))
  .pipe(rename('genomic-bundle.js'))
  .pipe(gulp.dest('dist/asset/js'))
  .pipe(streamify(uglify())) .pipe(notify("Done with JavaScript."))
});

// Clean
gulp.task('clean', function(cb) {
    del(['dist'], cb)
});

// Default
gulp.task('default', ['clean'], function() {
    gulp.start('js');
});

// Watch
gulp.task('watch', function() {
  gulp.watch('src/js/**/*.js', ['js']);
});
