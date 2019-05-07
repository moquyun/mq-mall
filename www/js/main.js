require.config({
    paths: {
        // "jquery": "lib/jquery.min",
        "jquery": "https://cdn.staticfile.org/jquery/2.2.4/jquery",

    }
});

// 引入模块
require(["jquery",],function (_jq) {
    //顶部小喇叭
    class TopNews{
        constructor(ele){
            this.ele = ele;
            this.index = 0;
            this.init();
        }
        init(){
            let _this = this,
                child_length = this.ele.find("li").length-1;
            setInterval(() => {
                if(this.index == child_length){
                    this.index = 0;
                    this.ele.css({top:0});
                }

                this.index++;
                this.ele.stop().animate({top:-this.index * this.ele.get(0).children[0].offsetHeight});

            },2000);
        }
    }
    new TopNews($("#TopNews"));

    //nav滑动菜单
    class NavHover{
        constructor(ele,url){
            console.log(ele,url);
            this.ele = ele;
            this.init();
            // this.addEve();
        }
        init(){
            this.json = [
                {
                    title:"首页",
                    data:[
                        {
                            title:"床品a",
                            data:[
                                {
                                    src:"https://www.shopncdemo.com/upload/image/dd/4d/dd4d8b0d91d7aeca57c239fbce9d1eff.jpeg",
                                    title:"床上用品1",
                                    href:"#"
                                },
                                {
                                    src:"https://www.shopncdemo.com/upload/image/dd/4d/dd4d8b0d91d7aeca57c239fbce9d1eff.jpeg",
                                    title:"床上用品2",
                                    href:"#"
                                },
                                {
                                    src:"https://www.shopncdemo.com/upload/image/dd/4d/dd4d8b0d91d7aeca57c239fbce9d1eff.jpeg",
                                    title:"床上用品3",
                                    href:"#"
                                }
                            ]
                        },
                        {
                            title:"床品b",
                            data:[
                                {
                                    src:"https://www.shopncdemo.com/upload/image/dd/4d/dd4d8b0d91d7aeca57c239fbce9d1eff.jpeg",
                                    title:"床上用品4",
                                    href:"#"
                                },
                                {
                                    src:"https://www.shopncdemo.com/upload/image/dd/4d/dd4d8b0d91d7aeca57c239fbce9d1eff.jpeg",
                                    title:"床上用品5",
                                    href:"#"
                                },
                                {
                                    src:"https://www.shopncdemo.com/upload/image/dd/4d/dd4d8b0d91d7aeca57c239fbce9d1eff.jpeg",
                                    title:"床上用品6",
                                    href:"#"
                                }
                            ]
                        }
                    ]
                },
                {
                    title:"首页2",
                    data:[
                        {
                            title:"床品c",
                            data:[
                                {
                                    src:"https://www.shopncdemo.com/upload/image/dd/4d/dd4d8b0d91d7aeca57c239fbce9d1eff.jpeg",
                                    title:"床上用品1",
                                    href:"#"
                                },
                                {
                                    src:"https://www.shopncdemo.com/upload/image/dd/4d/dd4d8b0d91d7aeca57c239fbce9d1eff.jpeg",
                                    title:"床上用品2",
                                    href:"#"
                                },
                                {
                                    src:"https://www.shopncdemo.com/upload/image/dd/4d/dd4d8b0d91d7aeca57c239fbce9d1eff.jpeg",
                                    title:"床上用品3",
                                    href:"#"
                                }
                            ]
                        },
                        {
                            title:"床品b",
                            data:[
                                {
                                    src:"https://www.shopncdemo.com/upload/image/dd/4d/dd4d8b0d91d7aeca57c239fbce9d1eff.jpeg",
                                    title:"床上用品4",
                                    href:"#"
                                },
                                {
                                    src:"https://www.shopncdemo.com/upload/image/dd/4d/dd4d8b0d91d7aeca57c239fbce9d1eff.jpeg",
                                    title:"床上用品5",
                                    href:"#"
                                },
                                {
                                    src:"https://www.shopncdemo.com/upload/image/dd/4d/dd4d8b0d91d7aeca57c239fbce9d1eff.jpeg",
                                    title:"床上用品6",
                                    href:"#"
                                }
                            ]
                        }
                    ]
                },
                {title:"箱包服饰"},
                {title:"母婴"},
                {title:"家电"},
                {title:"图书"},
                {title:"美食"},
                {title:"洗护"},
                {title:"生活"},
                {title:"超值精品"},
                {title:"限时秒杀"},
                {title:"品牌专区"},
            ];
            let str = "";
            for(let i=0;i<this.json.length;i++){
                var sLi = "";
                sLi += `<li><a class="nav-li" href="#">${this.json[i].title}</a>`;
                if(this.json[i].data != undefined){
                    sLi += `<div class="nav-b-box">
                                <div class="nav-b-box-main clear">`;
                    for(let j=0;j<this.json[i].data.length;j++){
                        sLi += `
                                    <div class="nav-b-box-main-child">
                                         <div class="title over">${this.json[i].data[j].title}</div>
                                            <div class="child-box clear">
                        `;
                        for(let k=0;k<this.json[i].data[j].data.length;k++){
                            sLi += `
                                <div class="child">
                                    <a href="${this.json[i].data[j].data[k].href}">
                                        <img class="child-img" src="${this.json[i].data[j].data[k].src}" alt="">
                                        <span class="chilid-title">${this.json[i].data[j].data[k].title}</span>
                                    </a>
                                </div>
                            `;
                        }
                        sLi += `
                        </div>
                            </div>
                        `;
                    }
                    sLi += `</div>
                            </div>
                                <i class="nav-upico"></i>`;
                }

                sLi += `</li>`;
                str += sLi;
            }

            this.ele.innerHTML = str;
        }
        addEve(){

        }
    }

    new NavHover(document.getElementById("nav-b"),"http://baidu.com");
});