var browserSync = require('browser-sync').create(),
    configApp = require('../config'),
    git = require('gulp-git'),
    gulp = require('gulp');

gulp.task('serve', ['build'], function() {
    browserSync.init({
        server: configApp.dist
    });

    gulp.watch(configApp.app + '/sass/**/*.scss', ['styles']);
    gulp.watch(configApp.app + '/scripts/**/*.js', ['scripts']);
    gulp.watch(configApp.app + '/templates/**/*.html', ['htmlBuild']);
    gulp.watch(configApp.dist + '/*.html').on('change', browserSync.reload);
});

gulp.task('default', ['serve']);

gulp.task('build', ['styles', 'scripts', 'templates', 'images'], function() {
    // return gulp.src('./assets/*')
    //     .pipe(git.commit('Markup #1'));
});
