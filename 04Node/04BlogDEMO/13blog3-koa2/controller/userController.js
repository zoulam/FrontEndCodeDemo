const { exec, escape } = require('../db/mysql');
const { genPassword } = require('../utils/cryp');
// 登录验证
const login = async (username, password) => {
    // 加密密码
    password = genPassword(password)
    // sql语句转义
    username = escape(username)
    password = escape(password)
    const sql = `
        select username,realname from users where username=${username} and password=${password}
    `
    let loginData = await exec(sql)
    return loginData[0] || {}
}

module.exports = {
    login
}