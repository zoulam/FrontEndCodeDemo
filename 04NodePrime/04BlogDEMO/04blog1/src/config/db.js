// 存储配置

// process：进程信息
const env = process.env.NODE_ENV;//环境参数

let MYSQL_CONF

// 对环境进行判断，并配置不同的数据库参数
if (env === 'dev') {
    MYSQL_CONF = {
        host: 'localhost',
        user: 'root',
        password: '123456',
        port: '3306',
        database: 'myblog'
    }
}

// 线上配置
if (env === 'production') {
    MYSQL_CONF = {
        host: 'localhost',
        user: 'root',
        password: '123456',
        port: '3306',
        database: 'myblog'
    }
}

// module.exports = MYSQL_CONF//会报错TypeError: Cannot read property 'host' of undefined
module.exports = {
    MYSQL_CONF
}