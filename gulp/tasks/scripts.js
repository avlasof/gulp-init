var babel = require('gulp-babel'),
    browserSync = require('browser-sync'),
    concat = require('gulp-concat'),
    configApp = require('../config'),
    gulp = require('gulp'),
    header = require('gulp-header'),
    jscs = require('gulp-jscs'),
    modernizr = require('gulp-modernizr'),
    sourcemaps = require('gulp-sourcemaps'),
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

gulp.task('postJS', function() {
    return gulp.src(configApp.app + '/scripts/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(babel())
        .pipe(concat('all.js'))
        .pipe(uglify())
        .pipe(header(configApp.banner))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(configApp.dist + '/scripts'))
        .pipe(browserSync.stream());
});

gulp.task('scripts', ['jscs', 'postJS']);
