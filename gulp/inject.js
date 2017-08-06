'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');
var fs = require('fs');
var merge = require('merge-stream');

var gulp_cheerio = require('gulp-cheerio');
var gulp_angular_filesort = require('gulp-angular-filesort');
var gulp_angular_templatecache = require('gulp-angular-templatecache');
var gulp_htmlmin = require('gulp-htmlmin');
var gulp_inject = require('gulp-inject');
var gulp_replace = require('gulp-replace');
var wiredep = require('wiredep').stream;

gulp.task('partials', function () {
    return gulp.src([
        path.join(conf.paths.src, '/app/**/*.html'),
        path.join(conf.paths.tmp, '/serve/app/**/*.html')
    ])
        .pipe(gulp_htmlmin({
            collapseWhitespace: true,
            conservativeCollapse: true,
            removeTagWhitespace: true
        }))
        .pipe(gulp_angular_templatecache('templateCacheHtml.js', {
            module: 'neomon',
            root: 'app'
        }))
        .pipe(gulp_replace(/\\n\s*/g, ' '))
        .pipe(gulp.dest(conf.paths.tmp + '/serve/'));
});

gulp.task('ui-assets', function () {

    var a = gulp.src(path.join(conf.paths.assets, '/json/**/*.json'))
            .pipe(gulp.dest(conf.paths.tmp + '/serve/assets'));

    var b = gulp.src(path.join(conf.paths.assets, '/images/**/*.*'))
            .pipe(gulp.dest(conf.paths.tmp + '/serve/assets/images'));

    return merge(a,b);
});

gulp.task('inject', ['partials', 'ui-assets', 'styles', 'svg'], function () {

    var inject = require('gulp-inject');

    var injectStyles = gulp.src([
        path.join(conf.paths.tmp, '/serve/app/**/*.css'),
        path.join('!' + conf.paths.tmp, '/serve/app/vendor.css')
    ], { read: false });

    var injectScripts = gulp.src([
        path.join(conf.paths.tmp, '/serve/app/**/*.module.js'),
        path.join(conf.paths.tmp, '/serve/app/**/*.js'),
        path.join(conf.paths.src, '/app/**/*.module.js'),
        path.join(conf.paths.src, '/app/**/*.js'),
        path.join('!' + conf.paths.src, '/app/**/*.spec.js'),
        path.join('!' + conf.paths.src, '/app/**/*.mock.js')
    ])
    .pipe(gulp_angular_filesort()).on('error', conf.errorHandler('AngularFilesort'));

    var injectOptions = {
        ignorePath: [conf.paths.src, path.join(conf.paths.tmp, '/serve')],
        addRootSlash: false
    };

    var partialsInjectFile = gulp.src(path.join(conf.paths.tmp, '/serve/templateCacheHtml.js'), { read: false });
    var partialsInjectOptions = {
        starttag: '<!-- inject:partials -->',
        ignorePath: path.join(conf.paths.tmp, '/serve'),
        addRootSlash: false
    };

    var injectSvg = function () {
        return gulp_cheerio({
            run: function ($, file, done) {
                try {
                    var svgContent = fs.readFileSync(conf.paths.tmp + '/assets/icons/tsvg/sprite/sprite.min.svg');
                    var div = $('<div></div>');

                    div.addClass('svg-injected-sprites');
                    div.html(svgContent);

                    $('body').prepend(div);
                }
                catch (e) {
                    if (e.code === 'ENOENT') {
                        $('body').addClass('no-tsvg');
                    }
                    else {
                        throw e;
                    }
                }
                done();
            }
        });
    };

    //wiredep gets configuration from conf.wiredep

    return gulp.src(path.join(conf.paths.src, '*.html'))
        .pipe(gulp_inject(injectStyles, injectOptions))
        .pipe(gulp_inject(injectScripts, injectOptions))
        .pipe(gulp_inject(partialsInjectFile, partialsInjectOptions))
        .pipe(injectSvg())
        .pipe(wiredep(Object.assign({}, conf.wiredep))).on('error', conf.errorHandler('inject.wiredep'))
        .pipe(gulp.dest(path.join(conf.paths.tmp, '/serve')));
});
