var gulp = require('gulp');
var del = require('del');
var runSequence = require('run-sequence');

var path = {
    main: { src: 'src/public/**/*.ts', dest: 'lib/public/' },
    test: { src: 'src/test/**/*.ts', dest: 'lib/test/' }
};

require('./gulp/ts')(path.main);
require('./gulp/test')(path.test);
require('./gulp/jade')();
require('./gulp/stylus')();
require('./gulp/serve')();

gulp.task('clean:dest', function (callback) {
    del([path.main.dest, path.test.dest], callback);
});

gulp.task('build', function (callback) {
    runSequence('clean:dest', ['ts', 'jade', 'stylus'], callback);
});

gulp.task('build-and-test', function (callback) {
    runSequence('build', ['test', 'serve:reload'], callback);
});

gulp.task('default', ['serve', 'watch', 'build-and-test']);

gulp.task('watch', function () {
    gulp.watch(path.main.src, ['build-and-test']);
    gulp.watch(path.test.src, ['test']);
    gulp.watch('src/**/*.jade', ['jade']);
    gulp.watch('src/**/*.stylus', ['stylus']);
    gulp.watch('lib/public/**/*.jade', ['serve:reload']);
});
