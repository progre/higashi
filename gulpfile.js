var gulp = require('gulp');
var del = require('del');
var runSequence = require('run-sequence');

require('./gulp/copy')();
require('./gulp/jade')();
require('./gulp/serve')();
require('./gulp/stylus')();
require('./gulp/test')();
require('./gulp/ts')();

gulp.task('default', ['serve', 'watch']);

gulp.task('serve', ['build'], function (callback) {
    runSequence('serve:init', callback);
});

gulp.task('build', ['clean'], function (callback) {
    runSequence('ts', 'jade', 'stylus', 'copy', callback);
});

gulp.task('clean', function (callback) {
    del('lib/', callback);
});

gulp.task('ts', function (callback) {
    runSequence('ts:build', ['test', 'serve:reload'], callback);
});

gulp.task('jade', function (callback) {
    runSequence('jade:build', 'serve:reload', callback);
});

gulp.task('stylus', function (callback) {
    runSequence('stylus:build', 'serve:reload', callback);
});

gulp.task('watch', function () {
    gulp.watch(['src/**/*.ts', '!src/test/'], ['ts']);
    gulp.watch('src/test/**/*.ts', ['test']);
    gulp.watch('src/**/*.jade', ['jade']);
    gulp.watch('src/**/*.stylus', ['stylus']);
});
