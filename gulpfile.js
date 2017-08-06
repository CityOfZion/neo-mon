/**
 *  Welcome to your gulpfile!
 *  The gulp tasks are split in to several files in the gulp directory
 */

'use strict';

var gulp = require('gulp');
var fs = require('fs');

/**
 *  This will load all js files in the gulp directory
 *  in order to load all gulp tasks
 */
fs.readdirSync('./gulp').filter(function (file) {
    return file.indexOf('.js') > -1;
}).map(function (file) {
    require('./gulp/' + file);
});

/**
 *  Default task cleans temporary directories and launch the
 *  main optimization build task
 */
gulp.task('default', ['clean'], function () {
    gulp.start('build');
});

gulp.task('publish', ['clean'], function () {
    gulp.start('build');
});
