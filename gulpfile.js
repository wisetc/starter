var gulp = require('gulp'),
    sass = require('gulp-sass'),
    pug = require('gulp-pug'),
    browserSync = require('browser-sync').create();

var files = {
    pug: 'pug/*.pug',
    markup: ['pug/*.pug', 'pug/**/*.html'],
    styles: 'scss/*.scss',
    scripts: 'js/*.js'
}
reload = browserSync.reload;

gulp.task('pug', function(){
    return gulp.src(files.pug)
    .pipe(pug({
        pretty: true
    }).on('error', function(){
        console.log('pug went wrong.');
        this.end();
    }))
    .pipe(gulp.dest('.'));
});

gulp.task('sass', function(){
    return gulp.src(files.styles)
    .pipe(sass({

    }).on('error', sass.logError))
    .pipe(gulp.dest('css'));
});

gulp.task('watch', function(){
    gulp.watch(files.styles, ['sass', reload]);
    gulp.watch(files.markup, ['pug', reload]);
    return gulp.watch(files.scripts, reload);
});

gulp.task('serve', function(){
    browserSync.init({
        server: {
            baseDir: '.'
        }
    });
});

gulp.task('default', ['watch', 'pug', 'sass', 'serve']);
