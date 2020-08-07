const { exec, escape } = require('../db/mysql');
const { genPassword } = require('../utils/cryp');
// 登录验证
const login = (username, password) => {


    // 加密密码
    password = genPassword(password)
    // sql语句转义
    username = escape(username)
    password = escape(password)
    const sql = `
        select username,realname from users where username=${username} and password=${password}
    `
    return exec(sql).then(value => {
        return value[0] || {}
    });

}

module.exports = {
    login
}