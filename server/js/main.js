require.config({
    paths: {
        "jquery": "/libs/jquery",
        "mQy": "/js/cookie",
    }
});
// 引入模块
require(["jquery","mQy"],function (_jq,mq) {

    class LayoutInit{
        constructor(cb){
            this.navJson = '/json/navTest.json';
            this.callback = cb;
            this.layout();
        }
        //layout加载公共html
        layout(){
            let _this = this;
            $('header').load('layout.html #layout-header',()=>{
                _this.topNews($("#TopNews"));
            });
            $('nav').load('layout.html #nav.layout',()=>{
                this.navHover(document.getElementById("nav-b"),{nav:this.navJson});
                _this.cartInit();
            });
            $('footer').load('layout.html #footer-layout');
            // setTimeout(()=>{
            //     _this.cartInit();
            // },1000);

        }
        //init购物车
        cartInit(){
            this.cartBtn = $('#cart');
            this.cart_cookie = mq.cookie('cart');
            this.cartAdd();
        }
        cartAdd(){
            var cart_cookie = this.cart_cookie;
            if(cart_cookie != ''){
                cart_cookie = JSON.parse(cart_cookie);
                let zNum = 0,
                    zPic = 0;
                let sLi = '';
                if(cart_cookie.length == 0){
                    sLi = `<i class="cart-num">0</i>
                    <i class="ico-cart"></i>
                    <div class="cart-box">
                        <ul class="cart-box-t">
                            <li class="nodata">您的购物车暂无任何物品</li>
                        </ul>
                        <div class="cart-box-b">
                            <div class="cart-box-b-l">
                                <span class="title">共计:</span>
                                <span class="pic">¥0.00</span>
                            </div>
                            <div class="cart-box-b-r">
                                <a href="#" class="btn">去购物车结算</a>
                            </div>
                        </div>
                    </div>`;
                    $('#cart').html(sLi);
                }else{

                    for(let i=0;i<cart_cookie.length;i++){
                        zNum += cart_cookie[i].num;
                        zPic += parseFloat(cart_cookie[i].pic);

                        sLi += `
                            <li class="items" id="cart-li">
                                    <div class="items-l">
                                        <a href=""><img src="${cart_cookie[i].src}" alt=""></a>
                                    </div>
                                    <div class="items-r">
                                        <div class="items-r-t">
                                            <a href="" class="title over">${cart_cookie[i].title}</a>
                                            <span class="pic">¥${cart_cookie[i].pic}</span>
                                            <i class="close" id="cart-close" index="${cart_cookie[i].goods}"></i>
                                        </div>
                                        <div class="items-r-b">
                                            <span class="spec over">颜色：蓝色</span>
                                            <span class="num">X${cart_cookie[i].num}</span>
                                        </div>
                                    </div>
                                </li>
                        `;

                    }
                    $('.cart-box-t').html(sLi);
                    $('.cart-num').html(zNum);
                    $('.cart-box-b-l .pic').html(zPic);
                    this.cartAddEvent();
                }

            }

        }
        cartAddEvent(){
            let cart_cookie = JSON.parse(this.cart_cookie);
            let closeArr = document.querySelectorAll('#cart-close');
            let _this = this;
            for(let i=0;i<closeArr.length;i++){
                closeArr[i].onclick = function(){
                    let index = this.getAttribute("index");
                    for(let j=0;j<cart_cookie.length;j++){
                        if(cart_cookie[j]['goods'] == parseInt(index)){
                            cart_cookie.splice(j,1);
                            _this.cart_cookie = JSON.stringify(cart_cookie);
                            mq.cookie('cart',_this.cart_cookie);
                            // this.parentNode.parentNode.parentNode.remove();
                            _this.cartAdd();
                            return ;
                        }
                    }
                };
            }
        }
        //顶部小喇叭
        topNews(ele){
            this.topEle = ele;
            this.topIndex = 0;
            this.topNewsInit();
        }
        topNewsInit(){
            let _this = this,
                child_length = this.topEle.find("li").length-1;
            setInterval(() => {
                if(this.topIndex == child_length){
                    this.topIndex = 0;
                    this.topEle.css({top:0});
                }

                this.topIndex++;
                this.topEle.stop().animate({top:-this.topIndex * this.topEle.get(0).children[0].offsetHeight});

            },2000);
        }
        //nav滑动菜单
        navHover(ele,url){
            this.ele = ele;
            this.url = url;
            this.navHoverInit();
        }
        navHoverInit(){
            let _this = this;
            $.ajax({
                url:this.url.nav,
                success:function(res){
                    _this.json = res;
                    _this.navInitData();
                },
                error:function(err){
                    console.log(err)
                }
            });
        }
        navInitData(){
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

    new LayoutInit;
});