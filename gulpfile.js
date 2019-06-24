const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync');

// creates server using browserSync utility for development
const server = browserSync.create();

// paths to src and destination files
const paths = {
    index: {
        src: 'src/*.+(html|json)',
        dest: 'build/'
    },
    html: {
        src: 'src/html/*.html',
        dest: 'build/html/'
    },
    css: {
        src: 'src/scss/*.+(css|scss)',
        dest: 'build/css/'
    },
    js: {
        src: 'src/js/*.js',
        dest: 'build/js/'
    },
    images: {
        src: 'src/images/*',
        dest: 'build/images/'
    }
};

function reload(done) {
    server.reload();
    done();
}
function serve(done) {
    server.init({
        server: {
            baseDir: './build'
        }
    });
    done();
}

function copy_html(cb) {
    gulp.src(paths.html.src)
        // do stuff here
        .pipe(gulp.dest(paths.html.dest));
    gulp.src(paths.index.src)
        // do stuff here
        .pipe(gulp.dest(paths.index.dest));
    cb();
}

function copy_css(cb) {
    gulp.src(paths.css.src)
    // do stuff here
        .pipe(sass().on("error", sass.logError))
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(gulp.dest(paths.css.dest));
    cb();
}

function copy_js(cb) {
    gulp.src(paths.js.src)
    // do stuff here
        .pipe(gulp.dest(paths.js.dest));
    cb();
}

function copy_images(cb) {
    gulp.src(paths.images.src)
        .pipe(responsive({
            // Resize all JPG images to three different sizes: 200, 500
            '*.+(jpg|JPG)': [{
            width: 300,
            rename: { suffix: '-300px' },
            }, {
            width: 480,
            rename: { suffix: '-480px' },
            }, {
            // Compress, strip metadata, and rename original image
            rename: { suffix: '-original' },
            }]
        }, {
            // Global configuration for all images
            // The output quality for JPEG, WebP and TIFF output formats
            quality: 50,
            // Use progressive (interlace) scan for JPEG and PNG output
            progressive: true,
            // Strip all metadata
            withMetadata: false,
        }))
        .pipe(gulp.dest(paths.images.dest));
        cb();
}

function build(done) {
    gulp.series(
        gulp.parallel(copy_html, copy_css, copy_js, copy_images)
    )
    done();
}

function watch() {
    gulp.watch([paths.index.src, paths.html.src], gulp.series(copy_html, reload));
    gulp.watch([paths.css.src], gulp.series(copy_css, reload));
    gulp.watch([paths.js.src], gulp.series(copy_js, reload));
    gulp.watch([paths.images.src], gulp.series(copy_images, reload));
}

const dev = gulp.series(build, serve, watch);

exports.dev = dev;
exports.build = build;
exports.copy_html = copy_html;
exports.copy_css = copy_css;
exports.copy_js = copy_js;
exports.copy_images = copy_images;
exports.default = gulp.parallel(copy_html, copy_css, copy_js, copy_images);