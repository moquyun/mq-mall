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
                this.cart_cookie = JSON.parse(mq.cookie('cart'));

                this.addCart();
            }
            //cart
            initCart(){
                // var cAr = [
                //     {
                //         goods:1,
                //         title:'笔记本111',
                //         src:'https://www.shopncdemo.com/upload/image/4f/74/4f746fd686406f069465a227cbc0b43d.png',
                //         pic:'111.00',
                //         num:5
                //     },
                //     {
                //         goods:2,
                //         title:'笔记本222',
                //         src:'https://www.shopncdemo.com/upload/image/4f/74/4f746fd686406f069465a227cbc0b43d.png',
                //         pic:'111.00',
                //         num:5
                //     },
                //     {
                //         goods:3,
                //         title:'笔记本222',
                //         src:'https://www.shopncdemo.com/upload/image/4f/74/4f746fd686406f069465a227cbc0b43d.png',
                //         pic:'111.00',
                //         num:5
                //     },
                //     {
                //         goods:4,
                //         title:'笔记本222',
                //         src:'https://www.shopncdemo.com/upload/image/4f/74/4f746fd686406f069465a227cbc0b43d.png',
                //         pic:'111.00',
                //         num:5
                //     },
                //     {
                //         goods:5,
                //         title:'笔记本222',
                //         src:'https://www.shopncdemo.com/upload/image/4f/74/4f746fd686406f069465a227cbc0b43d.png',
                //         pic:'111.00',
                //         num:5
                //     }
                // ];
                // mq.cookie('cart',JSON.stringify(cAr));

                // var cart_cookie = mq.cookie('cart');
                // if(cart_cookie != ''){
                //     cart_cookie = JSON.parse(cart_cookie);
                //     let zNum = 0;
                //     for(let i=0;i<cart_cookie.length;i++){
                //         zNum += cart_cookie[i].num;
                //         console.log(cart_cookie[i]);
                //     }
                //     document.querySelector('.cart .cart-num').innerHTML = zNum;
                //
                // }
            }
            addCart(){
                console.log(this.cart_cookie);
                var _this = this;
                this.cartBtn.addEventListener('click',function(){
                    _this.id = this.parentNode.getAttribute("data-id");
                    _this.value = parseInt(_this.buyNum.value);
                    // console.log(_this.value);
                    // console.log(_this.cart_cookie)
                    // var cAr = [
                    //     {
                    //         goods:1,
                    //         title:'笔记本111',
                    //         src:'https://www.shopncdemo.com/upload/image/4f/74/4f746fd686406f069465a227cbc0b43d.png',
                    //         pic:'111.00',
                    //         num:5
                    //     }
                    // ];
                    if(_this.cart_cookie.length == 0){
                        let goodsArr = {
                            goods:_this.id,
                            title:'笔记本111',
                            src:'https://www.shopncdemo.com/upload/image/4f/74/4f746fd686406f069465a227cbc0b43d.png',
                            pic:'111.00',
                            num:1
                        };
                        _this.cart_cookie.push(goodsArr);

                        console.log(_this.cart_cookie)
                    }
                    // mq.cookie('cart',JSON.stringify(cAr));
                    // for(let i=1;i<_this.cart_cookie.length;i++){
                    //
                    //
                    // }
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


