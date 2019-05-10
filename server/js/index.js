require.config({
    paths: {
        "jquery": "/libs/jquery",
    }
});
// 引入模块
require(["jquery","main"],function (_jq,_main) {
    let banner = $('.banner'),
    aLi = $('#banner-box li'),
    width = banner.width();
    let index = 0;
    let timer = setInterval(()=>{
        bannerAnimate(1);
    },4000);
    banner.mouseover(function(){
        clearInterval(timer);

    });
    banner.mouseout(function(){
        timer = setInterval(()=>{
            bannerAnimate(1);
        },4000);
    });
    $('.next').on('click',function(){
        bannerAnimate(1);
    });
    $('.prev').on('click',function(){
        bannerAnimate(-1);
    });
    function bannerAnimate(type){
        aLi.eq(index).stop().animate({left:-width*type},function(){
            $(this).css({zIndex:-1});
        });
        if(type == 1){
            if(index == aLi.length-1){
                index = 0;
            }else{
                index++;
            }
        }else{
            if(index == 0){
                index = aLi.length-1;
            }else{
                index--;
            }
        }
        aLi.eq(index).css({zIndex:1,left:width*type}).stop().animate({left:0});
    }
});

