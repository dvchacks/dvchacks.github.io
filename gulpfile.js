/*
  Modules
*/
const gulp = require('gulp');
const panini = require('panini');
const path = require('path');

/*
  Tasks
*/
gulp.task('default', build);
gulp.task('watch', gulp.series(build, watch));

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

function refresh(done) {
  panini.refresh();
  done();
}

function watch() {
  gulp.watch('src/**/*.html', gulp.series(refresh, build));
  gulp.watch('src/data/**/*.json', gulp.series(refresh, build));
}
