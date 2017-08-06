'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');

function isOnlyChange (event) {
    return event.type === 'changed';
}

gulp.task('inject-reload', ['inject'], function () {
    var browserSync = require('browser-sync');

    browserSync.reload();
});

gulp.task('partials-reload', ['partials'], function () {
    var browserSync = require('browser-sync');

    browserSync.reload();
});

gulp.task('watch', ['scripts', 'inject'], function () {

    gulp.watch([path.join(conf.paths.src, '/*.html'), 'bower.json'], ['inject-reload']);

    gulp.watch([
        path.join(conf.paths.assets, '/css/**/*.scss')
    ], function (event) {
        if (isOnlyChange(event)) {
            gulp.start('styles-reload');
        }
        else {
            gulp.start('inject-reload');
        }
    });

    gulp.watch(path.join(conf.paths.src, '/app/**/*.js'), function (event) {
        if (isOnlyChange(event)) {
            gulp.start('scripts-reload');
        }
        else {
            gulp.start('inject-reload');
        }
    });

    gulp.watch(path.join(conf.paths.src, '/app/**/*.html'), function (event) {
        if (isOnlyChange(event)) {
            gulp.start('partials-reload');
        }
        else {
            gulp.start('inject-reload');
        }
    });

    gulp.watch([
        path.join(conf.paths.assets, '/icons/tsvg/**/*.svg')
    ], function (event) {
        var browserSync = require('browser-sync');

        browserSync.reload(event.path);
    });

});
