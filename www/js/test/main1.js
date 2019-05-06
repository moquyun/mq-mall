//444
require.config({
    // 配置模块根目录
    baseUrl:"js/test/",
    // 配置小模块别名
    paths:{
        aa:"e",
        bb:"f"
    }
});
// 引入模块
require(["aa","bb"],function (a,b) {
    let aa = new a.nav;
    console.log(a);
    console.log(aa);
});