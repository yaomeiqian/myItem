//导入工具包require
var gulp=require("gulp");
var sass=require("gulp-sass");
var connect=require("gulp-connect");

//添加任务
gulp.task("server",function(){
	connect.server({
		root:"test",
		livereload:true
	});
});

gulp.task("sasstocss",function(){
	gulp.src("sass/**/*").pipe(sass()).pipe(gulp.dest("E:/test/css"));
});

gulp.task("copy-index",function(){
	gulp.src("*.html")
	.pipe(gulp.dest("D:/phpStudy/WWW/myItem"));
});

gulp.task("copy-img",function(){
	gulp.src("img/**/*")
	.pipe(gulp.dest("D:/phpStudy/WWW/myItem/img"));
});

gulp.task("copy-css",function(){
	gulp.src("css/**/*")
	.pipe(gulp.dest("D:/phpStudy/WWW/myItem/css"));
});

gulp.task("copy-js",function(){
	gulp.src("js/**/*")
	.pipe(gulp.dest("D:/phpStudy/WWW/myItem/js"));
});

gulp.task("bulid",["copy-index","copy-img","copy-css","copy-js","sasstocss"],function(){
	console.log("OK");
});

gulp.task("watch",function(){
	gulp.watch("*.html",["copy-index"]);
	gulp.watch("img/**/*",["copy-img"]);
	gulp.watch("css/**/*",["copy-css"]);
	gulp.watch("js/**/*",["copy-js"]);
	gulp.watch("sass/**/*",["sasstocss"]);
});

gulp.task("default",["server","watch"]);
