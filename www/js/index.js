require.config({
    paths: {
        "jquery": "/libs/jquery",
    }
});
// 引入模块
require(["jquery","main"],function (_jq,_main) {
    let banner = $('#banner-box'),
    aLi = $('#banner-box li'),
    width = banner.width();
    let index = 0;
    let timer = setInterval(()=>{
        if(index == aLi.length-1){
            aLi.eq(index).stop().animate({left:-banner.width()},function(){
                $(this).css({zIndex:-1});
            });
            index = 0;
            aLi.eq(index).css({zIndex:1,left:banner.width()}).stop().animate({left:0});
        }else{
            aLi.eq(index).stop().animate({left:-banner.width()},function(){
                $(this).css({zIndex:-1});
            });
            index++;
            aLi.eq(index).css({zIndex:1,left:banner.width()}).stop().animate({left:0});
        }
    },2000);
    banner.mouseenter(function(){
        clearInterval(timer);
        $(this).mouseleave(function(){
            timer = setInterval(()=>{
                if(index == aLi.length-1){
                    aLi.eq(index).stop().animate({left:-banner.width()},function(){
                        $(this).css({zIndex:-1});
                    });
                    index = 0;
                    aLi.eq(index).css({zIndex:1,left:banner.width()}).stop().animate({left:0});
                }else{
                    aLi.eq(index).stop().animate({left:-banner.width()},function(){
                        $(this).css({zIndex:-1});
                    });
                    index++;
                    aLi.eq(index).css({zIndex:1,left:banner.width()}).stop().animate({left:0});
                }
            },2000);
        });
    });
    
    // // banner.offsetWidth

});

