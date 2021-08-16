// Initialize modules
const { src, dest, watch, series } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const terser = require('gulp-terser');
const browsersync = require('browser-sync').create();

const config = {
	fontsDir: 'dist/fonts/poppins/',
	jsDir: 'dist/js/',
	cssDir: 'dist/css/',
	htmlDir: 'dist/',
}

function htmlTask(){
	return src('src/layout/*.html')
		.pipe(dest(config.htmlDir));
}

// Sass Task
function scssTask() {
	return src('src/scss/styles.scss', { sourcemaps: true })
		.pipe(sass())
		.pipe(postcss([autoprefixer(), cssnano()]))
		.pipe(dest(config.cssDir, { sourcemaps: '.' }));
}

// JavaScript Task
function jsTask() {
	return src('src/js/*.js', { sourcemaps: true })
		.pipe(terser())
		.pipe(dest(config.jsDir, { sourcemaps: '.' }));
}

// Browsersync
function browserSyncServe(cb) {
	browsersync.init({
		server: {
			baseDir: 'dist',
			index: 'index.html'
		},
		notify: {
			styles: {
				top: 'auto',
				bottom: '0',
			},
		},
	});
	cb();
}
function browserSyncReload(cb) {
	browsersync.reload();
	cb();
}

// Watch Task
function watchTask() {
	watch('src/layout/*.html', browserSyncReload);
	watch(
		['src/layout/*.html', 'src/scss/**/*.scss', 'src/**/*.js'],
		series(htmlTask, scssTask, jsTask, browserSyncReload)
	);
}

// Default Gulp Task
exports.default = series(htmlTask, scssTask, jsTask, browserSyncServe, watchTask);