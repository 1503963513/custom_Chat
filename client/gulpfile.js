const gulp = require('gulp')
const watch = require('gulp-watch')
const sass = require('gulp-sass')(require('sass'));
gulp.task('handelScss', function () {
    // sass下面的所以scss文件 通过sass编译输出到css目录下
    return gulp.src('./sass/*.scss').pipe(sass()).pipe(gulp.dest('./css'));
})

gulp.task('wch', function() {
    // 监听所有sass下面的scss文件变化 在执行gulpseries [] 执行的顺序 parallel并行执行 series 按依赖顺序执行
    watch('./sass/*.scss', gulp.series(['handelScss']))
})

