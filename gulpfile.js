var gulp = require('gulp');
var browserify = require('browserify');
//allow JSX syntax
var babelify = require('babelify');
//allows us to use gulp and browserify together
var source = require('vinyl-source-stream');

gulp.task('default', function(){
    return browserify('./source/App.jsx')
        .transform(babelify)
        .bundle()
        .pipe(source('build.js'))
        .pipe(gulp.dest('./build'));
});
