'use strict';

var gulp = require('gulp'),
    scss = require('gulp-sass'),
    pug = require('gulp-pug'),
    notify = require('gulp-notify'),
    browserSync = require('browser-sync').create();

var sourceFile = {
    scss: 'scss/*.scss',
    pug: 'pug/**/*.pug'
}

var outputDir = {
    css: 'css/site',
    html: '.'
}

gulp.task('scss', function(){
    return gulp.src(sourceFile.scss)
        // .pipe(scss({outputStyle: 'compressed'}).on('error', scss.logError))
        .pipe(scss().on('error', scss.logError))
        .pipe(gulp.dest(outputDir.css));
});

gulp.task('pug', function(){
    return gulp.src(sourceFile.pug)
        .pipe( pug({ pretty: true }).on('error', notify.onError( (error) => { return `pug went wrong, ${error}`; } )) )
        .pipe(gulp.dest(outputDir.html));
});

gulp.task('build', ['scss', 'pug']);

var cwd = process.cwd();
gulp.task('default', ['scss', 'pug'], function(){
    browserSync.init({
        server: {
            baseDir: '.'
        }
    });
    gulp.watch(sourceFile.scss, {cwd: cwd}, ['scss', browserSync.reload]);
    gulp.watch(sourceFile.pug, {cwd: cwd}, ['pug', browserSync.reload]);
});

