var changed = require('gulp-changed'),
    configApp = require('../config'),
    gulp = require('gulp'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    webp = require('gulp-webp');

gulp.task('imagemin', function() {
    var imageminOptions = {
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        };

    return gulp.src(configApp.app + '/images/**/*.{png,jpg,gif,svg}')
        .pipe(changed(configApp.dist + '/images'))
        .pipe(imagemin(imageminOptions))
        .pipe(gulp.dest(configApp.dist + '/images'));
});

gulp.task('webp', function() {
    return gulp.src(configApp.app + '/images/**/*.{png,jpg,gif}')
        .pipe(changed(configApp.dist + '/images'))
        .pipe(webp())
        .pipe(gulp.dest(configApp.dist + '/images'));
});

gulp.task('images', ['imagemin', 'webp']);
