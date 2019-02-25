/*
  Modules
*/
const gulp = require('gulp');
const panini = require('panini');
const sass = require('gulp-sass');
const path = require('path');

sass.compiler = require('node-sass');

/*
  Tasks
*/
gulp.task('default', gulp.series(build, style));
gulp.task('watch', gulp.series(build, style, watch));

/*
  Functions
*/
function build() {
  return gulp
  .src('src/index.html')
  .pipe(
    panini({
      root: 'src/',
      layouts: 'src/',
      partials: 'src/partials',
      data: 'src/data'
    })
  )
  .pipe(
    gulp.dest('./')
  );
}

function style() {
  return gulp
  .src('src/scss/**/*.scss')
  .pipe(
    sass({
      includePaths: './node_modules/foundation-sites/scss'
    })
    .on('error', sass.logError)
  )
  .pipe(
    gulp.dest('./')
  );
}

function refresh(done) {
  panini.refresh();
  done();
}

function watch() {
  gulp.watch('src/**/*.html', gulp.series(refresh, build));
  gulp.watch('src/data/**/*.json', gulp.series(refresh, build));
  gulp.watch('src/scss/**/*.scss', gulp.series(style));
}
