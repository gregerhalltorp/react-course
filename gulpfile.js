"use strict";

var gulp = require("gulp"),
	connect = require("gulp-connect"),
	open = require("gulp-open"),
	browserify = require("browserify"),
	babelify = require("babelify"),
	source = require("vinyl-source-stream"),
	concat = require("gulp-concat"),
	lint = require("gulp-eslint");

var config = {
	port: 9005,
	devBaseUrl: "http://localhost",
	paths: {
		html: "./src/*.html",
		mainJs: "./src/main.js",
		js: "./src/**/*.js",
		css: [
			"node_modules/bootstrap/dist/css/bootstrap.min.css",
			"node_modules/bootstrap/dist/css/bootstrap-theme.min.css",
		],
    images: "./src/images/*",
		dist: "./dist",
		eslintConfig: ".eslintrc.json"
	}
};
//port: config.port,

gulp.task("connect", function() {
	connect.server({
		root: ["dist"],
		base: config.devBaseUrl,
		livereload: true
	});
});

gulp.task("open", ["connect"], function() {
	gulp.src(config.paths.html + "/index.html")
		.pipe(open({uri: config.devBaseUrl + ":" + config.port + "/"}));
});

gulp.task("html", function() {
	gulp.src(config.paths.html)
		.pipe(gulp.dest(config.paths.dist))
		.pipe(connect.reload());
});

gulp.task("js", function() {
	browserify(config.paths.mainJs)
		.transform(babelify)
		.bundle()
		.on("error", console.error.bind(console))
		.pipe(source("bundle.js"))
		.pipe(gulp.dest(config.paths.dist + "/scripts"))
		.pipe(connect.reload());
});
//		.transform(reactify)

gulp.task("css", function() {
	gulp.src(config.paths.css)
		.pipe(concat("bundle.css"))
		.pipe(gulp.dest(config.paths.dist + "/css"))
		.pipe(connect.reload());
});

gulp.task("images", function() {
  gulp.src(config.paths.images)
    .pipe(gulp.dest(config.paths.dist + "/images"))
    .pipe(connect.reload());

  gulp.src("./src/favicon.ico")
    .pipe(gulp.dest(config.paths.dist));
});

gulp.task("lint", function() {
	return gulp.src(config.paths.js)
		.pipe(lint({config: config.paths.eslintConfig}))
		.pipe(lint.format());
});

gulp.task("watch", function() {
	gulp.watch(config.paths.html, ["html"]);
	gulp.watch(config.paths.js, ["js", "lint"]);
	gulp.watch(config.paths.css, ["css"]);
});

gulp.task("default", ["html", "js", "css", "images",	"lint", "open"]);//, "watch"]);