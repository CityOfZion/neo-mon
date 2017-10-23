'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');

var del = require('del');

var gulp_clean_css = require('gulp-clean-css');
var gulp_filter = require('gulp-filter');
var gulp_htmlmin = require('gulp-htmlmin');
var gulp_ng_annotate = require('gulp-ng-annotate');
var gulp_rev = require('gulp-rev');
var gulp_rev_replace = require('gulp-rev-replace');
var gulp_size = require('gulp-size');
//var gulp_sourcemaps = require('gulp-sourcemaps');
var gulp_uglify = require('gulp-uglify');
var gulp_useref = require('gulp-useref');

var uglify_save_license = require('uglify-save-license');

var merge = require('merge-stream');

gulp.task('index', ['inject'], function () {

    var htmlFilter = gulp_filter('*.html', { restore: true });
    var jsFilter = gulp_filter('**/*.js', { restore: true });
    var cssFilter = gulp_filter('**/*.css', { restore: true });
    var assets;

    return gulp.src(path.join(conf.paths.tmp, '/serve/index.html'))
        .pipe(assets = gulp_useref.assets())
        .pipe(gulp_rev())
        .pipe(jsFilter)
        //.pipe(gulp_sourcemaps.init())
        .pipe(gulp_ng_annotate())
        .pipe(gulp_uglify({ preserveComments: uglify_save_license })).on('error', conf.errorHandler('Uglify'))
        //.pipe(gulp_sourcemaps.write('maps'))
        .pipe(jsFilter.restore)
        .pipe(cssFilter)
        //.pipe(gulp_sourcemaps.init())
        .pipe(gulp_clean_css({
            advanced: false,
            aggressiveMerging: false,
            mediaMerging: false,
            processImport: false,
            roundingPrecision: -1
        }))
        //.pipe(gulp_sourcemaps.write('maps'))
        .pipe(cssFilter.restore)
        .pipe(assets.restore())
        .pipe(gulp_useref())
        .pipe(gulp_rev_replace())
        .pipe(htmlFilter)
        .pipe(gulp_htmlmin({
            collapseWhitespace: true,
            conservativeCollapse: true,
            removeTagWhitespace: true
        }))
        .pipe(htmlFilter.restore)
        .pipe(gulp.dest(path.join(conf.paths.dist, '/')))
        .pipe(gulp_size({ title: path.join(conf.paths.dist, '/'), showFiles: true }));
});

gulp.task('other', function () {
    var fileFilter = gulp_filter(function (file) {
        return file.stat.isFile();
    });

    return gulp.src([
        path.join(conf.paths.src, '/**/*'),
        path.join('!' + conf.paths.src, '/**/*.{html,css,js,scss}')
    ])
        .pipe(fileFilter)
        .pipe(gulp.dest(path.join(conf.paths.dist, '/')));
});

gulp.task('dist-assets', function () {

    var a = gulp.src(path.join(conf.paths.assets, '/json/*.json'))
            .pipe(gulp.dest(conf.paths.dist + '/assets'));

    var b = gulp.src(path.join(conf.paths.assets, '/images/**/*.*'))
            .pipe(gulp.dest(conf.paths.dist + '/assets/images'));

    var c = gulp.src(path.join(conf.paths.assets, 'CNAME'))
        .pipe(gulp.dest(conf.paths.dist + '/'));

    return merge(a,b,c);
});

gulp.task('clean', function () {
    return del([path.join(conf.paths.dist, '/'), path.join(conf.paths.tmp, '/'), path.join(conf.paths.src, '/*.twig.html')]);
});

gulp.task('build', ['index', 'dist-assets']);

//Configure to be run from dev machine, but build for production env
gulp.task('build-dist', ['index', 'other']);
