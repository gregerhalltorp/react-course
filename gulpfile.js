"use strict";

var gulp = require("gulp");
var connect = require("gulp-connect");
var open = require("gulp-open");

var config = {
	port: 9005,
	devBaseUrl: "http://localhost",
	paths: {
		html: "./src/*.html",
		dist: "./dist"
	}
}

gulp.task("connect", function() {
	connect.server({
		root: ["dist"],
		port: config.port,
		base: config.devBaseUrl,
		livereload: true
	});
});