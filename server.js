let http = require("http"),
    url = require("url"),
    fs = require("fs");
/* MYSQL */
let $db = require("./lib/db.js");
// $db.get('user',`user='pp'`,(data)=>{
//     console.log(data[2].password);
// });
// $db.insert('user',{user:'adasdqqq'});
// $db.del('user',{id:"7"});
// $db.update('user',{id:'6'},{user:1111,password:"22222",nickname:3333});
/* MYSQL end */

let server = http.createServer((req,res) => {
    if(req.url != "/favicon.ico"){
        var req_url = req.url,
        pathname = url.parse(req.url).pathname;
        // res.writeHead(200, {'Content-Type': 'text/plain'});
        //url-route
        console.log(pathname);
        switch(pathname){
            case "/post":
                res.write("sda");
                res.end();break;
            default:
                let starUrl = '';
                if(pathname === '/'){
                    starUrl = "./www/index.html";
                }else{
                    starUrl = "./www" + pathname;
                }
                if(pathname.indexOf('.css') != -1){//css文件社设置请求头
                    res.writeHead(200, {'Content-Type': 'text/css'});
                }
                fs.readFile(starUrl,(error,data) =>{
                    if(error === null){
                        res.write(data);
                        res.end();
                    }
                });
        }
    }
});
server.listen("8080","10.11.58.100",()=>{
    console.log("   server star");
});
