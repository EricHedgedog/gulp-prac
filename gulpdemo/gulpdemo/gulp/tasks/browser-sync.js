var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var config = require('../config');

gulp.task('browser-sync',function(){
	browserSync.init({
	// browserSync.init(["./build/css/*.css","./src/js/*.js","./src/*.html"],{
		files:"**",
		server:{
			baseDir:"./",
			directory:true
		}
	})
});