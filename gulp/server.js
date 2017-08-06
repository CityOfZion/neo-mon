'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');

var util = require('util');

function browserSyncInit (baseDir, browser) {

    var browserSync = require('browser-sync');
    var browserSyncSpa = require('browser-sync-spa');

    browserSync.use(browserSyncSpa({
        selector: '[ng-app]'// Only needed for angular apps
    }));

    browser = browser === undefined ? 'default' : browser;

    var routes = null;

    if (baseDir === conf.paths.src || util.isArray(baseDir) && baseDir.indexOf(conf.paths.src) !== -1) {
        routes = {
            '/bower_components': 'bower_components'
        };
    }

    var server = {
        baseDir: baseDir,
        routes: routes
    };

    browserSync.instance = browserSync.init({
        startPath: '/',
        server: server,
        browser: browser,
        https: false
    });
}

gulp.task('serve', ['watch'], function () {
    browserSyncInit([path.join(conf.paths.tmp, '/serve'), conf.paths.src]);
});

gulp.task('serve:fix', ['fix', 'watch'], function () {
    browserSyncInit([path.join(conf.paths.tmp, '/serve'), conf.paths.src]);
});

gulp.task('serve:dist', ['build-dist'], function () {
    browserSyncInit(conf.paths.dist);
});

