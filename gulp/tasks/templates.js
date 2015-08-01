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
            bowerJson: require('../../bower.json'),
            ignorePath: new RegExp('^(\.\.\/)+' + configApp.dist),
            exclude: [
                'bower_components/jquery/',
                'bower_components/bootstrap/'
            ]
        };

    return gulp.src(configApp.app + '/templates/*.html')
        .pipe(fileinclude(fileincludeOptions))
        .pipe(wiredep(wiredepOptions))
        .pipe(gulp.dest(configApp.dist));
});

// Rules https://github.com/yaniswang/HTMLHint/wiki/Rules
gulp.task('htmlHint', function() {
    var htmlhintOptions = {
            'doctype-first': false
        };

    return gulp.src([
            configApp.app + '/templates/**/*.html',
            '!' + configApp.app + '/templates/include/header.html',
            '!' + configApp.app + '/templates/include/footer.html'
        ])
        .pipe(htmlhint(htmlhintOptions))
        .pipe(htmlhint.reporter())
});

gulp.task('templates', ['htmlBuild', 'htmlHint']);
