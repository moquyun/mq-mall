require.config({
    shim: {
        'mQy': ['main'],
    },
    paths: {
        "mQy": "/js/cookie",
        "domready": "/libs/domready"
    }
});
// 引入模块
require(["mQy"],function (mq) {
    setTimeout(function(){
        class Goods{
            constructor(){
                this.cartBtn = document.getElementById('cart-btn');
                this.buyNum = document.getElementById('buyNum');
                this.less = document.getElementsByClassName('less')[0];
                this.more = document.getElementsByClassName('more')[0];
                this.value = parseInt(this.buyNum.value);
                this.cart_cookie = mq.cookie('cart');
                this.addCart();
            }
            //cart
            addCart(){
                if(this.cart_cookie == ''){
                    this.cart_cookie =[];
                }else{
                    this.cart_cookie = JSON.parse(this.cart_cookie);
                }

                let _this = this;
                this.cartBtn.addEventListener('click',function(){
                    _this.id = this.parentNode.getAttribute("data-id");
                    _this.title = document.getElementById('title').innerHTML;
                    _this.img = document.getElementsByClassName('img-a')[0].children[0].src;
                    _this.pic = document.getElementById('cart-pic').innerHTML;
                    // console.log(_this.img);
                    _this.value = parseInt(_this.buyNum.value);

                    if(_this.cart_cookie.length == 0){
                        let goodsArr = {
                            goods:_this.id,
                            title:_this.title,
                            src:_this.img,
                            pic:_this.pic,
                            num:_this.value
                        };
                        _this.cart_cookie.push(goodsArr);
                    }else{
                        // console.log(_this.cart_cookie);
                        for(let i=0;i<_this.cart_cookie.length;i++){
                            // console.log(_this.cart_cookie[i]);
                            if(_this.cart_cookie[i].goods == _this.id){
                                _this.cart_cookie[i].num += _this.value;

                            }
                        }
                        console.log(_this.cart_cookie);
                    }

                    mq.cookie('cart',JSON.stringify(_this.cart_cookie));
                });

                this.less.addEventListener('click',function(){
                    _this.value = parseInt(_this.buyNum.value);
                    if(_this.value > 0){
                        _this.value--;
                    }
                    _this.buyNum.value = _this.value;
                });
                this.more.addEventListener('click',function(){
                    _this.value = parseInt(_this.buyNum.value);
                    _this.value++;
                    _this.buyNum.value = _this.value;
                });
            }
        }
        new Goods();
    },1000);//500有时捕获不到DOM
});
[1,11,22,2]
arr.sort(,)

