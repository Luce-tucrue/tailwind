var gulp = require('gulp');


// Import dependencies
var sass = require('gulp-sass')(require('sass')),
    minify = require('gulp-clean-css'),
    path = require('path'),
    autoprefixer = require('gulp-autoprefixer'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    sourcemaps = require('gulp-sourcemaps'),
    sassLint = require('gulp-sass-lint'),
    browserSync = require('browser-sync');
minifyjs = require('gulp-minify');


var source = 'assets/styles/sass/',
    dist = 'assets/styles/',
    sourceScript = 'assets/js/',
    destScript = 'assets/js/',
    fontName = 'Icons';


// Compile SCSS to CSS
gulp.task('default',  () => {
return gulp.src(source + 'main.scss')
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(concat('compiled.min.css'))
    .pipe(minify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(dist))

});

// Check if SCSS is clean

gulp.task('sass-lint',  () => {
    return gulp.src([source + '/**/*.scss'])
        .pipe(sassLint({
            configFile: '.sass-lint.yml',
        }))
        .pipe(sassLint.format())
        .pipe(sassLint.failOnError())
});


// Watch - if changes, do tasks

gulp.task('watch', () => {
    gulp.watch(source + '**/*.scss', gulp.series('default', 'sass-lint'));
    gulp.watch('./**/*.html').on('change', browserSync.reload);
});


// Reload in live

gulp.task('browserSync',  () => {
    browserSync({
        server: {
            baseDir: "./"
        }
    });
})


gulp.task('js', () => {
    gulp.src(sourceScript + '**/*.js')
        .pipe(concat('scripts.js'))
        .pipe(minifyjs({
            ext:{
                min:'.min.js'
            }}
        ))
        .pipe(gulp.dest(destScript));
});