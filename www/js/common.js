;(function(a){
    // let a.$$ = (options) => {
    //     if(typeof options === "string"){
    //         console.log(1);
    //     }
    //
    // };

    class TopNews{
       constructor(ele){
            this.ele = ele;
            this.index = 0;
            this.init();
       }
       init(){
           let _this = this,
           child_length = this.ele.find("li").length-1;
           console.log(child_length);
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

})(window);