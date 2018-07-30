var gulp = require("gulp"),
	connect = require('gulp-connect'),
	watch = require('gulp-watch');
var uglify = require("gulp-uglify");
var rename = require('gulp-rename');
var imagemin = require("gulp-imagemin");
var stylus = require("gulp-stylus");
var CSS = require("gulp-minify-css");
var HTML = require("gulp-minify-html");
var del = require("del");
var paths = {
	html : "./static/*.html",
	css : "./static/stylue/*.css",
	styles : "./static/stylue/*.styl",
	scripts : "./static/js/*.js",
	images : "./static/image/*"
};

gulp.task("html", function(){
	// gulp.src(paths.html).pipe(connect.reload());
});
gulp.task("scripts", function(){
	gulp.src(paths.scripts).pipe(uglify())
	.pipe(rename({ extname: '.min.js' }))
	.pipe(gulp.dest("./static/minJs/"));
	// gulp.src(paths.html).pipe(connect.reload());
});
gulp.task("images", function(){
	// gulp.src(paths.html).pipe(connect.reload());
});
gulp.task("styles", function(){
	gulp.src(paths.styles).pipe(stylus({
		compress : 0
	})).pipe(gulp.dest("./static/stylue/"));
});
gulp.task("css", function(){
	gulp.src(paths.styles).pipe(stylus({
		compress : 1
	}))
	.pipe(rename({ extname: '.min.css' }))
	.pipe(gulp.dest("./static/minCss/"));
});
gulp.task("watch", function() {
	// gulp.watch(paths.html, ["html"]);
	// gulp.watch(paths.scripts, ["scripts"]);
	// gulp.watch(paths.images, ["images"]);
	gulp.watch(paths.styles, ["styles"]);
	// gulp.watch(paths.css, ["css"]);
});
gulp.task("default", ["watch"]);
// gulp.task("default", ["watch", 'connect']);