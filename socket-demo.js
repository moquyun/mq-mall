//创建一个http服务器
var app = require('http').createServer();
// 把http封装成io对象
var io =require('socket.io')(app);
var PORT = 3000;
var clientCount = 0;
app.listen(PORT);
io.on('connection',function(socket){
    // 给每个用户取名字
    clientCount++;
    socket.nickname = 'user' + clientCount;
    // io.emit代表广播，socket.emit代表私发
    io.emit('enter',socket.nickname + '  上线了');
    socket.on('message',function(str){
        io.emit('message',socket.nickname + ' 说: ' + str);
    });
    // 客户端断开，自带事件
    socket.on('disconnect',function(){
        io.emit('leave',socket.nickname + ' 离开了');
    });
});