# mq-mall

* 安装gulp

       npm install
        
* 服务端  

    * 启动服务端  
        
          npm all
            
* 访问地址

> localhost:8080




### 网站文件  
├── gulpfile.js // 服务端js `npm all`   
├── server.js // node服务(---弃用，改为gulpfile.js---)  
├── lib // node方法封装-   
│ └── db.js // 使用mysql模块封装增删查改-  
├── node_modules // node模块-   
│ └── mysql // mysql模块-  
├── www // 网站文件原始文件  
│ │── common // 公共组件  
│ ├── css // css样式文件夹  
│ ├── images // 图片文件夹  
│ ├── js // js文件夹  
│ └── index.html // 网站首页  
├── server // 服务器指向根目录  
│ │── common // 公共组件  
│ ├── css // css样式文件夹  
│ ├── images // 图片文件夹  
│ ├── js // js文件夹  
│ └── index.html // 网站首页  
