'use strict';

var gulp = require('gulp'),
    scss = require('gulp-sass'),
    pug = require('gulp-pug'),
    plumber = require('gulp-plumber'),
    gutil = require('gulp-util'),
    notify = require('gulp-notify'),
    browserSync = require('browser-sync').create();

gulp.task('scss', function(){
    return gulp.src('scss/*/*.scss')
        // .pipe(scss({outputStyle: 'compressed'}).on('error', scss.logError))
        .pipe(scss().on('error', scss.logError))
        .pipe(gulp.dest('css'));
});

gulp.task('pug', function(){
    return gulp.src('pug/*/*.pug')
        // .pipe(plumber())
        .pipe( pug({ pretty: true }).on('error', notify.onError( (error) => { return `pug went wrong, ${error}`; } )) )
        .pipe(gulp.dest('page'));
});

gulp.task('build', ['scss', 'pug']);

var cwd = process.cwd();
gulp.task('default', ['scss', 'pug'], function(){
    browserSync.init({
        server: {
            baseDir: '.'
        }
    });
    gulp.watch('scss/*/*.scss', {cwd: cwd}, ['scss', browserSync.reload]);
    gulp.watch('pug/*/*.pug', {cwd: cwd}, ['pug', browserSync.reload]);
});

