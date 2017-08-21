var gulp = require('gulp');
var clean = require('gulp-clean');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify-es').default; // works with ES6
var inject = require('gulp-js-text-inject'); // used to parse out using RegExp ( @@import {filename.**} ) in javascript files and replacing them with inline contents from those filename.**



const webpack = require('webpack-stream');
const webpackConfig = require('./webpack.config.js');


// /*******************************Minify Core Metrics**************************/
gulp.task('clean', function () {
    return gulp.src([

        ], {read: false})
        .pipe(clean({force: true}))
});


gulp.task('webpack', ['clean'], function () {
    return gulp.src([
            'js/main.js'
        ])
        .pipe(webpack({
          output:{
            filename: 'main.bundle.js'
          },
          module: webpackConfig.module,
          devtool: 'source-map',
        }))
        .pipe(gulp.dest('src/temp'));
});

gulp.task('minify', ['webpack'], function() {
  return gulp.src(['src/temp/main.bundle.js'])
    .pipe(sourcemaps.init({
      loadMaps: true,
    }))
    .pipe(uglify({
      compress: {
        unused: false,
      }
    }))
    .pipe(sourcemaps.write('src/temp/main.min.js.map', {
      sourceMappingURL: function(file) {
        return '/maps/' + file.relative + '.map';
      }
    }))
    .pipe(gulp.dest('src/temp'));
});


gulp.task('default', ['minify'], function () {
    // place code for your default task here
});
