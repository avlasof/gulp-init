var configApp = require('../config'),
    fileinclude = require('gulp-file-include'),
    gulp = require('gulp'),
    htmlhint = require('gulp-htmlhint'),
    wiredep = require('wiredep').stream;

gulp.task('htmlBuild', function() {
    var fileincludeOptions = {
            prefix: '@@',
            basepath: '@file',
            indent: true
        },
        wiredepOptions = {
            cwd: configApp.dist,
            ignorePath: new RegExp('^(\.\.\/)+' + configApp.dist)
        };

    return gulp.src(configApp.app + '/templates/*.html')
        .pipe(fileinclude(fileincludeOptions))
        .pipe(wiredep(wiredepOptions))
    .pipe(gulp.dest(configApp.dist));
});

gulp.task('htmlHint', function() {
    var htmlhintOptions = {
            'doctype-first': false
        };

    return gulp.src(configApp.app + '/templates/**/*.html')
        .pipe(htmlhint(htmlhintOptions))
        .pipe(htmlhint.reporter())
});

gulp.task('templates', ['htmlBuild', 'htmlHint']);
