'use strict';

var gulp = require('gulp'),
    watch = require('gulp-watch'),
    livereload = require('gulp-livereload'),
    csso = require('gulp-csso'),
    connect = require('gulp-connect'),
    concat = require('gulp-concat'),
    jsmin = require('gulp-minify');

//concat & minify css files
gulp.task('concatCSS', function () {
    return gulp.src([
        './node_modules/bootstrap/dist/css/bootstrap.css',
        './assets/css/style.css'
    ])
        .pipe(concat('style.css'))
        .pipe(csso())
        .pipe(gulp.dest('build/style/'))
        .pipe(connect.reload());
});

//concat & minify css files
gulp.task('min-js', function () {
    return gulp.src([
            './assets/js/functions.js',
            './assets/js/main.js',
            './node_modules/bootstrap/dist/js/bootstrap.js'
        ])
        .pipe(concat('scripts.js'))
        .pipe(jsmin())
        .pipe(gulp.dest('build/js'))
        .pipe(connect.reload());
});

//file to change & reload window
gulp.task('watch', function(){
    gulp.watch('assets/css/*.css', ['concatCSS']);
    gulp.watch('assets/js/*.js', ['min-js']);
});

//start to connect with local server
gulp.task('connect', function() {
    connect.server({
        livereload: true
    });
});

gulp.task('build', ['concatCSS', 'min-js']);

gulp.task('default', ['connect', 'watch']);
