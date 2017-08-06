'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');

var svgmin = require('gulp-svgmin');
var svgstore = require('gulp-svgstore');
var cheerio = require('gulp-cheerio');
var rename = require('gulp-rename');
var replace = require('gulp-replace');

gulp.task('svg', function () {
    return gulp.src([
        path.join(conf.paths.assets, '/icons/tsvg/*.svg')
    ])
        .pipe(svgmin(function (file) {
            var prefix = path.basename(file.relative, path.extname(file.relative));

            return {
                plugins: [
                    {
                        cleanupIDs: {
                            prefix: 'tsvg-' + prefix + '-',
                            minify: true
                        }
                    }, {
                        removeTitle: true
                    }
                ]
            };
        }))
        .pipe(svgstore())
        .pipe(cheerio({
            run: function ($) {
                $('symbol').each(function () {
                    $(this)[0].attribs.id = 'tsvg-' + $(this)[0].attribs.id;
                });
            },
            parserOptions: { xmlMode: true }
        }))
        .pipe(replace('<?xml version="1.0" encoding="UTF-8"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">', ''))
        .pipe(rename('sprite.min.svg'))
        .pipe(gulp.dest(conf.paths.tmp + '/assets/icons/tsvg/sprite/'));
});
