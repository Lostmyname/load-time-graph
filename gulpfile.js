'use strict';

var path = require('path');
var browserSync = require('browser-sync');
var gulp = require('gulp');
var loadLmnTask = require('lmn-gulp-tasks');

var buildPath = './demo/build/';

gulp.task('js-quality', loadLmnTask('js-quality', {
  src: './src/js/**/*.js'
}));

var jsOpts = {
  src: './src/js/load-time-graph.js',
  dest: path.join(buildPath, 'js/bundle.js')
};

gulp.task('js', gulp.series('js-quality', loadLmnTask('browserify', jsOpts)));

gulp.task('js-watch', gulp.series('js-quality', loadLmnTask('browserify', {
  src: jsOpts.src,
  dest: jsOpts.dest,
  watch: true
})));

gulp.task('scss', loadLmnTask('scss', {
  src: './src/scss/*.{sass,scss}',
  dest: path.join(buildPath, 'stylesheets'),
  imagePath: '../images'
}));

gulp.task('build', gulp.parallel('js', 'scss'));

function watchers() {
  var config = {
    server: {
      baseDir: '.'
    },
    ghostMode: {
      scroll: false,
      links: false,
      forms: false
    }
  };

  if (process.argv.indexOf('--no-open') !== -1) {
    config.open = false;
  }

  browserSync.init([
    'demo/build/**/*.css',
    'demo/build/**/*.js',
    'demo/**/*.html',
    'src/imgs/**/*',
    'test/**/*.js'
  ], config);

  gulp.watch('./src/scss/**/*.{sass,scss}', gulp.series('scss'));
}

gulp.task(watchers);

gulp.task('default', gulp.series(
  'build',
  gulp.parallel('js-watch', 'watchers')
));
