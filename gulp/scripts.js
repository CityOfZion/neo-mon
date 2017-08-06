'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');

var eslintOptions = {
    configFile: '.eslintrc',
    useEslintrc: true,
    fix: false
};

gulp.task('scripts-reload', function () {

    var browserSync = require('browser-sync');

    return buildScripts()
        .pipe(browserSync.stream());
});

gulp.task('scripts', function () {
    return buildScripts();
});

gulp.task('fix', function () {
    eslintOptions.fix = true;
    return buildScripts();
});

function isFixed(file) {
    return file.eslint != null && file.eslint.fixed;
}

function buildScripts() {

    var gulp_eslint = require('gulp-eslint');
    var gulp_if = require('gulp-if');
    var gulp_size = require('gulp-size');

    return gulp.src(path.join(conf.paths.src, '/app/**/*.js'))
        .pipe(gulp_eslint(eslintOptions))
        .pipe(gulp_eslint.format())
        //         if fixed, write the file to dest
        .pipe(gulp_if(isFixed, gulp.dest(path.join(conf.paths.src, '/app/'))))
        .pipe(gulp_size());
}
