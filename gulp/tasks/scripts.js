var browserSync = require('browser-sync').create(),
    configApp = require('../config'),
    gulp = require('gulp'),
    header = require('gulp-header'),
    jscs = require('gulp-jscs'),
    modernizr = require('gulp-modernizr'),
    uglify = require('gulp-uglify');

gulp.task('jscs', function() {
    return gulp.src(configApp.app + '/scripts/**/*.js')
        .pipe(jscs());
});

gulp.task('modernizr', function() {
    var modernizrOptions = {
            tests: ['webp'],
            excludeTests: ['fnbind']
        };

    return gulp.src(configApp.app + '/scripts/**/*.js')
        .pipe(modernizr(modernizrOptions))
        .pipe(uglify())
        .pipe(gulp.dest(configApp.dist + '/scripts'))
});

gulp.task('uglifyJs', function() {
    return gulp.src(configApp.app + '/scripts/**/*.js')
        .pipe(uglify())
        .pipe(header(configApp.banner))
        .pipe(gulp.dest(configApp.dist + '/scripts'))
        .pipe(browserSync.stream());
});

gulp.task('scripts', ['jscs', 'uglifyJs']);
