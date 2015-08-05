var gulp = require('gulp');
var del = require('del');
var runSequence = require('run-sequence');

var paths = [
    { src: 'src/**/*.ts', dest: 'lib/' },
    { src: 'src/test/**/*.ts', dest: 'tmp/test/' }
];

require('./gulp/ts')({
    commonjs: paths
});
require('./gulp/test')({
    raw: paths[1].dest,
    powered: 'lib/test/'
});

gulp.task('clean:dest', function (callback) {
    del(paths[0].dest, callback);
});

gulp.task('build', function (callback) {
    runSequence('clean:dest', 'ts', callback);
});

gulp.task('build-and-test', function (callback) {
    runSequence('build', 'test', callback);
});

gulp.task('default', ['watch', 'build-and-test']);

gulp.task('watch', function () {
    gulp.watch([paths[0].src], ['build-and-test']);
    gulp.watch([paths[1].src], ['test']);
});
