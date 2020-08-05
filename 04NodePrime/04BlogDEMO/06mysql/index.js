const mysql = require('mysql');

// 创建连接数据库对象
const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    port: '3306',
    database: 'myblog'
});

// 开始连接
con.connect();


// 执行sql语句

const databaseOperation = (sql) => {
    con.query(sql, (err, result) => {
        if (err) {
            console.log(err);
            return;
        }
        console.log(result);
    });
}

// mysql的操作是异步的
const sql1 = 'select * from users;';
databaseOperation(sql1);

const sql2 = 'select username, password from users;';
databaseOperation(sql2);

const sql3 = `update users set realname='露露1' where username='luluxi';`;
//可以根据这两项（affectedRows: 1,  changedRows: 1）的值对数据操作结果进行正确性判断
databaseOperation(sql3);


const sql4 = "insert into users(username,`password`,realname) values('zhangsan','123','张三');";
//  affectedRows: 1,  changedRows: 0， insertId: 8,
databaseOperation(sql4);

//关闭连接
con.end();