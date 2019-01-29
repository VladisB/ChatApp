var path 					= 'public',
		syntax        = 'sass', // Syntax: sass or scss;
		gulpversion   = '4'; // Gulp version: 3 or 4

var gulp          = require('gulp'),
		sass          = require('gulp-sass'),
		browserSync   = require('browser-sync'),
		autoprefixer  = require('gulp-autoprefixer'),
		notify        = require('gulp-notify');

gulp.task('browser-sync', function() {
	browserSync({
		server: {
			baseDir: 'public'
		},
		notify: false,
		// open: false,
		// online: false, // Work Offline Without Internet Connection
		// tunnel: true, tunnel: "projectname", // Demonstration page: http://projectname.localtunnel.me
	})
});

gulp.task('styles', function() {
	return gulp.src(path+'/styles/'+syntax+'/**/*.'+syntax+'')
	.pipe(sass({ outputStyle: 'expanded' }).on("error", notify.onError()))
	.pipe(autoprefixer(['last 15 versions']))
	.pipe(gulp.dest(path+'/styles/css'))
	.pipe(browserSync.stream())
});


gulp.task('code', function() {
	return gulp.src('/*.html')
	.pipe(browserSync.reload({ stream: true }))
});


if (gulpversion == 3) {
	gulp.task('watch', ['styles', 'browser-sync'], function() {
		gulp.watch(path+'/styles/'+syntax+'/**/*.'+syntax+'', ['styles']);
		gulp.watch(path+'/*.html', ['code'])
	});
	gulp.task('default', ['watch']);
}

if (gulpversion == 4) {
	gulp.task('watch', function() {
		gulp.watch(path+'/styles/'+syntax+'/**/*.'+syntax+'', gulp.parallel('styles'));
		gulp.watch(path+'/*.html', gulp.parallel('code'))
	});
	gulp.task('default', gulp.parallel('styles', 'browser-sync', 'watch'));
}