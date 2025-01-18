const { src, dest, watch, parallel, series } = require('gulp');

const scss = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const uglify = require('gulp-uglify-es').default;
const browserSync = require('browser-sync').create();
const autoprefixer = require('gulp-autoprefixer');
const clean = require('gulp-clean');
const imagemin = require('gulp-imagemin');

function scripts() {
	return src([
		'node_modules/swiper/swiper-bundle.js',
		'node_modules/jquery/dist/jquery.js',
		'node_modules/slick-carousel/slick/slick.js',
		'node_modules/rateyo/src/jquery.rateyo.js',
		'node_modules/choices.js/public/assets/scripts/choices.js',
		'node_modules/accordionjs/accordion.js',
		'node_modules/jquery-form-styler/dist/jquery.formstyler.js',
		'node_modules/ion-rangeslider/js/ion.rangeSlider.js',
		'node_modules/@splidejs/splide/dist/js/splide.js',

		// 'app/js/main.js'

		'app/js/*.js',
		'!app/js/main.min.js',
	])
		.pipe(concat('main.min.js'))
		.pipe(uglify())
		.pipe(dest('app/js'))
		.pipe(browserSync.stream());
}

function styles() {
	return src('app/scss/style.scss')
		.pipe(autoprefixer({ overrideBrowserlist: ['last 10 version'] }))
		.pipe(concat('style.min.css'))
		.pipe(scss({ outputStyle: 'compressed' }))
		.pipe(dest('app/css'))
		.pipe(browserSync.stream());
}
function watching() {
	watch(['app/**/*.scss'], styles);
	watch(['app/js/main.js'], scripts);
	watch(['app/**/*.html']).on('change', browserSync.reload);
}

function browsersync() {
	browserSync.init({
		server: {
			baseDir: 'app/',
		},
		notify: false,
	});
}

function images() {
	return src('app/images/**/*')
		.pipe(
			imagemin([
				imagemin.gifsicle({ interlaced: true }),
				imagemin.mozjpeg({ quality: 75, progressive: true }),
				imagemin.optipng({ optimizationLevel: 5 }),
				imagemin.svgo({
					plugins: [{ removeViewBox: true }, { cleanupIDs: false }],
				}),
			])
		)
		.pipe(dest('dist/images'));
}

function cleanDist() {
	return src('dist').pipe(clean());
}

function building() {
	return src(
		['app/css/style.min.css', 'app/js/main.min.js', 'app/**/*.html '],
		{ base: 'app' }
	).pipe(dest('dist'));
}

exports.styles = styles;
exports.scripts = scripts;
exports.watching = watching;
exports.images = images;
exports.browsersync = browsersync;

exports.build = series(cleanDist, building);
exports.default = parallel(styles, scripts, browsersync, watching);
