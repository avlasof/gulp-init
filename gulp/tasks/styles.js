var autoprefixer = require('gulp-autoprefixer'),
    browserSync = require('browser-sync').create(),
    configApp = require('../config'),
    csscomb = require('gulp-csscomb'),
    csso = require('gulp-csso'),
    gulp = require('gulp'),
    header = require('gulp-header'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    webpcss = require('gulp-webpcss');

gulp.task('sass', ['comb'], function() {
    return gulp.src(configApp.app + '/sass/**/main.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(configApp.app + '/styles/'))
        .pipe(browserSync.stream());
});

gulp.task('comb', function() {
    return gulp.src([configApp.app + '/sass/**/*', '!' + configApp.app + '/sass/**/_*'])
        .pipe(csscomb())
        .pipe(gulp.dest(configApp.app + '/sass'))
});

gulp.task('css', function() {
    return gulp.src(configApp.app + '/styles/**/*.css')
        .pipe(sourcemaps.init())
        .pipe(autoprefixer('last 2 version', 'safari 6', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
        .pipe(webpcss({}))
        .pipe(csso())
        .pipe(header(configApp.banner))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(configApp.dist + '/styles'));
});

gulp.task('styles', ['sass', 'css']);
