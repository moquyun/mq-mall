let gulp = require("gulp");
let connect = require("gulp-connect"),
    proxy = require("http-proxy-middleware");
let concat = require("gulp-concat"),
    uglify = require("gulp-uglify"),
    rename = require("gulp-rename");
let babel = require("gulp-babel");
let sass = require("gulp-sass-china");
    // minifyCSS = require("gulp-minify-css");

//watch
gulp.task("watch",()=>{
    // gulp.watch([
    //     "www/index.html",
    //     "www/sass/index.scss"
    // ],["index","sass"]);
    gulp.watch(["www/index.html"],["index"]);
    gulp.watch(["www/sass/*.scss"],["sass"]);

});



//dest
gulp.task("index",()=>{
   gulp.src(["www/*.html"]).pipe(gulp.dest("server")).pipe(connect.reload());
});
gulp.task("destTo",()=>{
    gulp.src(["www/css/public.css"]).pipe(gulp.dest("server/css")).pipe(connect.reload());
});

//sass
gulp.task("sass",()=>{
    gulp.src("www/sass/common.scss")
        .pipe(sass().on("error",sass.logError))
        .pipe(gulp.dest("server/css"))
        .pipe(connect.reload());
});


//server
gulp.task("server",()=>{
   connect.server({
      root:"server",
       port:8080,
       livereload:true,//是否可以自动刷新
       middleware:function(connect,opt){
            return [
                //http://localhost:8888/api/getIpInfo.php?ip=
                proxy("/api",{
                    target:'http://ip.taobao.com/service',
                    changeOrigin:true,
                    pathRewrite:{
                        '^/api':''
                    }
                })
            ];
       }
   });
});
//all-----
gulp.task("all",["watch","server"]);

// changeJS --不能压缩匿名函数
gulp.task("changeJS",()=>{
    gulp.src("www/js/index.js")
        .pipe(concat("index.js"))
        .pipe(gulp.dest("server/js"))
        .pipe(uglify())
        .pipe(rename("index.min.js"))
        .pipe(gulp.dest("server/js"));
});

//
gulp.task('es6Toes5',()=>{
    gulp.src("www/js/index.js")
        .pipe(babel())
        .pipe(gulp.dest('server/jss'));
});