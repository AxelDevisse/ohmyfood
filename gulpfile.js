var gulp = require('gulp');
var sass = require('gulp-sass');
const autoprefix = require('autoprefixer')
var cssnano = require("cssnano")
var postcss = require("gulp-postcss")
var rename = require("gulp-rename");

function devPipe() {
    return gulp.src('./sass/**/*.scss')
        .pipe(sass()) // Converts Sass to CSS with gulp-sass
        .pipe(gulp.dest('./test'))
}

function prodPipe() {
    return gulp.src('./sass/**/*.scss')
        .pipe(sass()) // Converts Sass to CSS with gulp-sass
        .pipe(autoprefixer({
            cascade: false
        }))
        .pipe(postcss([cssnano()]))
        .pipe(rename({
            suffix: ".min", 
        }))
        .pipe(gulp.dest('./test'))
}

function watcher() {
    gulp.watch("./sass/**/*.scss", devPipe);
}

function sassCompiler() {
    return gulp.src('sass/**/*.scss')
        .pipe(sass()) 
        .pipe(gulp.dest('test'));
}

function autoprefixer(){
    return gulp.src("test/main.css")
        .pipe(postcss([autoprefix()]))
        .pipe(gulp.dest('test'))
}

function minifier(){
    return gulp.src("test/main.css")
        .pipe(postcss([cssnano()]))
        .pipe(rename({
            suffix: ".min", 
        }))
        .pipe(gulp.dest("test"))
}

exports.prefix = autoprefixer;
exports.prefixer = autoprefixer;
exports.autoprefix = autoprefixer;
exports.autoprefixer = autoprefixer;

exports.sass = sassCompiler;

exports.min = minifier;
exports.minifier = minifier;

exports.watch = watcher;
exports.watcher = watcher;

exports.dev = devPipe;
exports.develop = devPipe;

exports.build = prodPipe;
exports.prod = prodPipe;
exports.production = prodPipe;

/*
    gulp watch|watcher => init a watcher and run devPipe automatically (sass to css)

    gulp dev|develop => run devPipe (sass to css)

    gulp build|prod|production => run prodPipe (sass to css, autoprefix)

    gulp sass => run sassCompiler (sass to css)

    gulp prefix|autoprefix|prefixer|autoprefixer => run autoprefixer (autoprefix)
*/
