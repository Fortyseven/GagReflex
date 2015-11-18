var gulp = require('gulp');
var uglify = require('gulp-uglify');
var less = require('gulp-less');
var minify_html = require('gulp-minify-html');
var minify_css = require('gulp-minify-css');
var del = require('del');
var es = require('event-stream');
var run_sequence = require('run-sequence');

var debug  = require('gulp-debug');

//var concat = require('gulp-concat');

/***********************/
var OUTPUT_PATH = 'dist/';

/***********************/
gulp.task('misc', function(){
	return gulp.src(
				[
				 'manifest.json', 
				 'LICENSE'				 
				 ]
			)			
			.pipe(gulp.dest(OUTPUT_PATH));	
});

/***********************/
gulp.task('vendor', function() {
	return gulp.src(
		['vendor/google/material-design-lite.js'])
		.pipe(uglify()).on('error', errorHandler)
		.pipe(gulp.dest(OUTPUT_PATH + "vendor/google/"));
});

/***********************/
gulp.task('bower', function(){
	return gulp.src(
		['bower_components/micromustache/dist/**/*.min.js',
		'bower_components/zepto/zepto.min.js']
		, {base: './bower_components'})
		.pipe(uglify())
		.pipe(gulp.dest(OUTPUT_PATH + "bower_components"));
});
/***********************/
gulp.task('css', function(){
	var css_from_less = gulp.src('app/assets/*.less')
							.pipe(less());
							
	var css = gulp.src('app/assets/*.css');
	
	return es.merge(css_from_less, css)
		.pipe(minify_css())
		.pipe(gulp.dest(OUTPUT_PATH + 'app/assets/'));
	
});
/***********************/
gulp.task('images', function(){
	return gulp.src('app/assets/*.png')
		.pipe(gulp.dest(OUTPUT_PATH+"app/assets/"));
});

/***********************/
gulp.task('scripts', /*['dep'],*/function() {
	return gulp.src('app/**/*.js')
	//.pipe(concat())
	.pipe(uglify()).on('error', errorHandler)
	.pipe(gulp.dest(OUTPUT_PATH + 'app'));    
});


/***********************/
gulp.task('html', /*['dep'],*/function() {
	return gulp.src('app/**/*.html', {base: './app'})	
	.pipe(minify_html()).on('error', errorHandler)
	.pipe(gulp.dest(OUTPUT_PATH + 'app'));    
});

/***********************/
gulp.task('scripts', /*['dep'],*/function() {
	return gulp.src('app/**/*.js')
	//.pipe(concat())
	.pipe(uglify()).on('error', errorHandler)
	.pipe(gulp.dest(OUTPUT_PATH + 'app'));    
});


/***********************/
gulp.task('clean', function() {
	//del(['dist']);
});

gulp.task('build', ['misc', 'css', 'images', 'vendor', 'bower', 'html', 'scripts']);

gulp.task('default', function(done){
	//gulp.start('build');
	run_sequence('clean', function(){
		console.log('cleaned');
		gulp.start('build');
		done();
		console.log('https://chrome.google.com/webstore/developer/dashboard');
	});
});

function errorHandler(error) {
	console.log(error.toString());
	this.emit('end');
}