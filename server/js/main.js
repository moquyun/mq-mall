require.config({
    paths: {
        "jquery": "https://cdn.staticfile.org/jquery/2.2.4/jquery",
    }
});
// 引入模块
require(["jquery"],function (_jq) {
    const navJson = '/json/navTest.json';

    //功能模块加载
    function LayoutLoad(){
        $('header').load('layout.html #layout-header',()=>{
            new TopNews($("#TopNews"));
        });

        $('nav').load('layout.html #nav.layout',()=>{
            new NavHover(document.getElementById("nav-b"),{nav:navJson});
        });

        $('footer').load('layout.html #footer-layout');
    }

    new LayoutLoad();

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


    //nav滑动菜单
    class NavHover{
        constructor(ele,url){
            this.ele = ele;
            this.url = url;
            this.init();
        }
        init(){
            let _this = this;
            $.ajax({
                url:this.url.nav,
                success:function(res){
                    _this.json = res;
                    _this.initData();

                },
                error:function(err){
                    console.log(err)
                }
            });
        }
        initData(){
            let str = "";
            for(let i=0;i<this.json.length;i++){
                var sLi = "";
                sLi += `<li><a class="nav-li" href="${this.json[i].href}">${this.json[i].title}</a>`;
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
    }

});