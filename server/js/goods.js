require.config({
    paths: {
        "jquery": "https://cdn.staticfile.org/jquery/2.2.4/jquery",
    }
});
// 引入模块
require(["jquery","main"],function (_jq,_main) {
    class Goods{
        constructor(){
            this.cartBtn = document.getElementById('cart');
            this.addCart();
        }
        //cart

        addCart(){
            this.cartBtn.addEventListener('click',function(){
                console.log(this);
            });
        }
    }
    new Goods();
});

