var gulp = require('gulp');
var shell = require('gulp-shell');

gulp.task('default', shell.task(['mkdir -p dist', 'browserify src/js/main.js -o dist/oncoprint-bundle.js',
				'cp src/css/* dist/',
				'cp src/img/* dist/',
				]));
