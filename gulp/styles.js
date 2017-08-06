'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');

var gulp_postcss = require('gulp-postcss');
var gulp_sass = require('gulp-sass');
var gulp_sourcemaps = require('gulp-sourcemaps');
var gulp_inject = require('gulp-inject');

var wiredep = require('wiredep').stream;
var autoprefixer = require('autoprefixer');

var buildStyles = function () {
    var sassOptions = {
        style: 'expanded'
    };

    var injectFiles = gulp.src([
        path.join(conf.paths.assets, '/css/**/*.scss'),
        path.join('!' + conf.paths.assets, '/css/main.scss')
    ], { read: false });

    var injectOptions = {
        transform: function (filePath) {
            filePath = filePath.replace(conf.paths.assets + '/', '');

            return '@import "' + filePath + '";';
        },
        starttag: '// injector',
        endtag: '// endinjector',
        addRootSlash: false
    };

    return gulp.src([
        path.join(conf.paths.assets, '/css/main.scss')
    ])
        .pipe(gulp_inject(injectFiles, injectOptions)).on('error', conf.errorHandler('injectOptions'))
        .pipe(wiredep(Object.assign({}, conf.wiredep))).on('error', conf.errorHandler('wiredep'))
        .pipe(gulp_sourcemaps.init()).on('error', conf.errorHandler('sourcemaps'))
        .pipe(gulp_sass(sassOptions)).on('error', conf.errorHandler('Sass'))
        .pipe(gulp_postcss([autoprefixer({ remove: false })])).on('error', conf.errorHandler('Autoprefixer'))
        .pipe(gulp_sourcemaps.write())
        .pipe(gulp.dest(path.join(conf.paths.tmp, '/serve/app/')));
};

gulp.task('styles-reload', ['styles'], function () {

    var browserSync = require('browser-sync');

    return buildStyles()
        .pipe(browserSync.stream());
});

gulp.task('styles', function () {
    return buildStyles();
});
