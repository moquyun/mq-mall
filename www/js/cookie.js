;(function(win){
    var d = function(){};
    d.prototype.add = function(f,g,h){
        h = h || {};
        var j = "";
        for(var i in h){
            if(i == "expires"){
                var k = new Date();
                k.setDate(k.getDate()+h[i]);
                j += "expires=" + k + ";";
            }else{
                j += i + "=" + h[i] + ";";
            }
        }
        document.cookie = f + '=' + g + ";" + j;
    },
        d.prototype.remove = function(f){
            var d = new Date();
            d.setDate(d.getDate()-1);
            document.cookie = f + "=1;expires=" + d;
        },
        d.prototype.get = function(f){
            var i = document.cookie ? document.cookie.split("; ") : "";
            if(arguments.length == 0){
                var o = {};
                for(var j=0;j<i.length;j++){
                    o[i[j].split("=")[0]] = i[j].split("=")[1];
                }
                return o;
            }else{
                for(var j=0;j<i.length;j++){
                    if(i[j].split("=")[0] == f){
                        return i[j].split("=")[1];
                    }
                }
                return "";
            }
        }


    win._mq_ = {
        cookie(a,b,c){
            var e = new d();
            switch(arguments.length){
                case 0:
                    return e.get();
                    break;
                case 1:
                    return e.get(a);
                    break;
                case 2:
                    if(b === null){
                        return e.remove(a);
                    }else{
                        return e.add(a,b);
                    }
                    break;
                default:
                    return e.add(a,b,c);
                    break;
            }

        }
    };

    if ( typeof define === "function" && define.amd ) {
        define( "mQy", [], function() {
            return _mq_;
        } );
    }
}(window));

// define(function(){
//     function get(a){
//         console.log(a)
//     }
//
//     return {
//         get:get
//     };
// });