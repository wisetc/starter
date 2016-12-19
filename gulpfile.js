var gulp = require('gulp'),
    sass = require('gulp-sass'),
    pug = require('gulp-pug'),
    ts = require("gulp-typescript"),
    tsProject = ts.createProject("tsconfig.json"),
    browserSync = require('browser-sync').create(),
    reload = browserSync.reload;

var files = {
    pug: 'pug/*.pug',
    markup: ['pug/*.pug', 'pug/**/*.html'],
    scss: 'scss/*.scss',
    typescript: 'ts/*.ts'
}

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
    return gulp.src(files.scss)
    .pipe(sass({

    }).on('error', sass.logError))
    .pipe(gulp.dest('css'));
});

gulp.task("ts", function () {
    return tsProject.src()
        .pipe(tsProject())
        .js.pipe(gulp.dest("js"));
});

gulp.task('watch', function(){
    gulp.watch(files.scss, ['sass', reload]);
    gulp.watch(files.markup, ['pug', reload]);
    return gulp.watch(files.typescript, ['ts', reload]);
});

gulp.task('serve', function(){
    browserSync.init({
        server: {
            baseDir: '.'
        }
    });
});

gulp.task('default', ['watch', 'pug', 'sass','ts', 'serve']);
