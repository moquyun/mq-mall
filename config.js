var config = {};//数据库帐号设置

config['host']         = '118.126.102.188';//数据库地址
config['port']         = '3306';//数据库端口
config['user']         = 'mq-mall';//数据库用户名
config['password']     = 'dbg8685';//数据库密码
config['database']     = 'mq-mall';//mysql数据库名
config['tablepre']     = '';//表前缀
config['insecureAuth'] = true;//兼容低版本
config['debug']        = false;//默认false

exports.hostname = 'localhost';//
exports.port = 8080;//服务器所用端口号,默认8090
exports.config = config;
