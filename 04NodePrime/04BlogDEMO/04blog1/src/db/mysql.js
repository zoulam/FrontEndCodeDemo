const mysql = require('mysql');
const { MYSQL_CONF } = require('../config/db');


const con = mysql.createConnection(MYSQL_CONF);

con.connect();

function exec(sql) {
    const promise = new Promise((resolve, reject) => {
        con.query(sql, (err, result) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(result);
        });
    })
    return promise;
}

// con.end(); 使用单例模式建立连接，进行持续操作

module.exports = { exec }
