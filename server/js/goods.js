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
    class Goods{
        constructor(){
            this.cartBtn = document.getElementById('cart');
            this.initCart();
        }
        //cart
        initCart(){
            // var cAr = [
            //     {
            //         goods:1,
            //         title:'笔记本',
            //         src:'https://www.shopncdemo.com/upload/image/4f/74/4f746fd686406f069465a227cbc0b43d.png',
            //         pic:'111.00',
            //         num:5
            //     },
            //     {
            //         goods:1,
            //         title:'笔记本',
            //         src:'https://www.shopncdemo.com/upload/image/4f/74/4f746fd686406f069465a227cbc0b43d.png',
            //         pic:'111.00',
            //         num:5
            //     }
            // ];
            // mq.cookie('cart',JSON.stringify(cAr));
            var cart_cookie = mq.cookie('cart');
            if(cart_cookie != ''){
                cart_cookie = JSON.parse(cart_cookie);
                let zNum = 0;
                for(let i=0;i<cart_cookie.length;i++){
                    zNum += cart_cookie[i].num;
                }
                // document.querySelector('.cart .cart-num').innerHTML = zNum;


            }
        }
        addCart(){
            var _this = this;
            this.cartBtn.addEventListener('click',function(){
                _this.id = this.parentNode.getAttribute("data-id");
                // console.log(_this.id);
            });
        }
    }
    new Goods();
});


