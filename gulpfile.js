var gulp = require('gulp'),
    sass = require('gulp-sass'),
    pug = require('gulp-pug'),
    browserSync = require('browser-sync').create();

gulp.task('pug', function(){
    return gulp.src('pug/*.pug')
    .pipe(pug({
        pretty: true
    }).on('error', function(){}))
    .pipe(gulp.dest('.'));
});

gulp.task('sass', function(){
    return gulp.src('scss/*.scss')
    .pipe(sass({

    }).on('error', sass.logError))
    .pipe(gulp.dest('css'));
});

reload = browserSync.reload;
gulp.task('default', function(){
    browserSync.init({
        server: {
            baseDir: '.'
        }
    });
    gulp.watch(['pug/*.pug'], ['pug']).on('change', reload);
    gulp.watch(['scss/*.scss'], ['sass']).on('change', reload);
});
