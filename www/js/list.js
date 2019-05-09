require.config({
    paths: {
        "jquery": "/libs/jquery",
    }
});
// 引入模块
require(["jquery","main"],function (_jq,_main) {
    const listJson = '/json/listJson.json';
    class InitList{
        constructor(url){
            this.url = url;
            this.ajaxData();
        }
        ajaxData(){
            let _this = this;
            $.ajax({
                url:this.url,
                success:function(res){
                    _this.json = res;
                    console.log(res);
                    _this.initData();
                },
                error:function(err){
                    console.log(err)
                }
            });
        }
        initData(){
            // this.json
            // console.log($('.cate-box'));
            let str = '';
            // 遍历分类
            for(let i=0;i<this.json.length;i++){
                str += `
                    <div class="main-c">
                        <div class="main-c-t">
                            <div class="title">${this.json[i].module}</div>
                            <div class="min-title">${this.json[i].minTitle}</div>
                        </div>
                        <div class="main-c-b">
                                <ul class="clear">
                `;
                // 遍历分类下商品
                for(let j=0;j<this.json[i].list.length;j++){
                    str += `
                        <li>
                            <div class="img">
                                <a href="${this.json[i].list[j].href}" class="img-a">
                                    <img src="${this.json[i].list[j].img}" alt="">
                                </a>
                            </div>
                            <div class="main-c-b-b">
                                <div class="biaoqian">`;
                    //遍历tag
                    if(this.json[i].list[j].tag != undefined && this.json[i].list[j].tag != ""){
                        for(let k=0;k<this.json[i].list[j].tag.length;k++){
                            // <span class="bq-a">新品</span>
                            // <span class="bq-b">满优惠</span>
                            if(this.json[i].list[j].tag[k].type == 1){
                                str += `<span class="bq-a">${this.json[i].list[j].tag[k].name}</span>`;
                            }else{
                                str += `<span class="bq-b">${this.json[i].list[j].tag[k].name}</span>`;
                            }
                        }
                    }
                    str += `</div>
                                <div class="title over"><a href="${this.json[i].list[j].href}">${this.json[i].list[j].title}</a></div>
                                <div class="pic">¥${this.json[i].list[j].pic}</div>
                                <hr>
                                <div class="m-title">${this.json[i].list[j].minTitle}</div>
                            </div>
                        </li>          
                    `;
                }
                str += '</ul></div></div>';
            }
            $('.cate-box').html(str);
        }

    }
    new InitList(listJson);

});

