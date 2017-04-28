var gulp = require('gulp'),
    express = require('gulp-express'),
    concatCss = require('gulp-concat-css'),
    concatJS = require('gulp-concat'),
    sass = require('gulp-sass'),
    open = require('gulp-open'),
    minifyJs = require('gulp-minify'),
    minifyCss = require('gulp-minify-css'),
    webserver = require('gulp-webserver');


gulp.task('js', function() {
    gulp.src('./front/src/js/*.js')
        .pipe(minifyJs({ ext: { min: '.min.js' }, exclude: ['tasks'] }))
        .pipe(gulp.dest('./front/build/js/'));
});

gulp.task('css', function() {
    gulp.src('./front/src/css/*.css')
        .pipe(concatCss("build.min.css"))
        .pipe(minifyCss({ keepBreaks: false }))
        .pipe(gulp.dest('./front/build/css/'));
});

gulp.task('default', function() {
    express.run(['./back/server.js']);
    gulp.src('./front/build').pipe(webserver({
        host: 'localhost',
        port: 8000,
        fallback: 'index.html'
    })).pipe(open({ uri: 'localhost:8000' }));
});