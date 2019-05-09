/*
 *查
	 $db.get('user',`user='pp'`,(data)=>{
		console.log(data[2].password);
  });
  增
 $db.insert('user',{user:'adasdqqq'});
 删
 $db.del('user',{id:"7"});
 改
 $db.update('user',{id:'6'},{user:1111,password:"22222",nickname:3333});
 */

let mysql = require('mysql');
let db = mysql.createConnection({
    host:'118.126.102.188',
    user:'mq-mall',
    password:'dbg8685',
    database:'mq-mall',
    // port:'3306',
    // insecureAuth:true,//兼容低版本
    // debug:true//默认false
});

function handleDisconnect(db) {
  db.on('error', function(err) {
    if (!err.fatal) {
      return;
    }
    if (err.code !== 'PROTOCOL_CONNECTION_LOST') {
      throw err;
    }
    console.log('Re-connecting lost mysql: ' + err.code);
    db = mysql.createConnection(db.config);
    handleDisconnect(db);
    db.connect();
  });
}
handleDisconnect(db);

db.connect(function(err) {
  if (err) throw console.log('mysql err: ' + err.code);
  console.log('   mysql connected...');
});

//封装
function get_query(sql) {
	let db_query = '';
	if ( typeof sql === "object" ) {
		for (let k in sql){
			if ( typeof sql[k] === "string" ) {
				db_query += k+"='"+sql[k]+"' AND ";
			} else if(typeof sql[k] === "number"){
                db_query += k+"="+sql[k]+" AND ";
			}
		}
		db_query += ' 2 > 1';
	} else {
		db_query = sql;
	}
	return db_query;
}

exports.get = (table,sql,cb) => {
    let db_query = 'SELECT * FROM ';
    db_query += table+' WHERE ';
    db_query += get_query(sql);
    db.query(db_query, function(err,rows) {
        cb(rows);
    });
};

exports.insert = (table,sql,cb) => {
    let db_query = 'INSERT INTO ' + table;
    if ( typeof sql === "object" ) {
        let db_values = ['',''];
        for (let k in sql){
            db_values[0] += k + ",";
            if ( typeof sql[k] === "string" ) {
                db_values[1] += "'" + sql[k] + "'" + ",";
            }else{
                db_values[1] += sql[k] + ",";
			}
        }
        db_query += ' (' + db_values[0].slice(0,db_values[0].length-1) + ')  VALUES ' + '(' + db_values[1].slice(0,db_values[1].length-1) + ') ';
    } else {
        db_query += sql +" ";
    }
    db.query(db_query,(err,rows) => {
		// cb(rows);
    });
};

exports.del = function (table,sql,cb) {
    let db_query = 'DELETE FROM ';
    db_query += table+' WHERE ';
    db_query += get_query(sql);
    db.query(db_query, function(err,rows) {
        // cb(rows);
    });
};

exports.update = (table,sql,values,cb) => {
    let db_query = 'UPDATE ';
    db_query += table + ' SET ';
    let str = '';
    for (let k in values){
        str += k+"='"+values[k]+"',";
    }
    db_query += str.slice(0,str.length-1) + ' WHERE ';
    db_query += get_query(sql);
    db.query(db_query, (err, rows) => {
        // cb(rows);
    });
};