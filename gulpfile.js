var gulp = require('gulp');
var shell = require('gulp-shell');

gulp.task('default', shell.task([
    'mkdir -p dist/',
    'browserify src/js/main.js -o dist/oncoprint-bundle.js',
    'cp src/css/* dist/',
    'cp src/img/* dist/'
]));

gulp.task('test', shell.task(['browserify test.js -o oncoprint-test-bundle.js']));
