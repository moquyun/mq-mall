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
        //url-route
        console.log(pathname);
        switch(pathname){
            case "/post":
                res.write("sda");
                res.end();break;
            // case "/api/nav":
            //     navSql((res)=>{
            //         res.write(JSON.stringify(res));
            //         res.end();
            //     });
            //     // res.write(JSON.stringify(navData));
            //     break;

            default:
                let starUrl = '';
                if(pathname === '/'){
                    starUrl = "./server/index.html";
                }else{
                    starUrl = "./server" + pathname;
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
server.listen("8888","10.11.58.102",()=>{
    console.log("   server star");
});

/*db*/
// function navSql(cb){
//     var _data = [];
//     $db.get('nav',`tid=0`,(data)=>{
//         for(let i=0;i<data.length;i++){
//             _data[i] = {
//                 title:data[i].title
//             }
//
//         }
//         console.log(_data);
//         cb(data);
//     });
// }