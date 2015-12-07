var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();


//static server
gulp.task('browser-sync', function() {
  	browserSync.init(["css/*.css","js/*.js","*.html"],{
  		server:{
  			baseDir:"./"
  		}
  	});
});
gulp.task('default',['browser-sync']);


// gulp.task('sass',function(){
// 	gulp.src('scss/app.scss')
// 		.pipe(sass({
// 			includePaths:['scss']
// 		}))
// 		.pipe(gulp.dest('css'));
// });
// gulp.task('watch',['sass','browser-sync'],function(){
// 	gulp.watch(["scss/*.scss","scss/base/*.scss","scss/sections/*.scss","scss/style/*.scss"],['sass']);
// });