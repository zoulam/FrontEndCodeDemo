const { exec } = require('../db/mysql');
// 登录验证
const login = (username, password) => {
    const sql = `
        select username,realname from users where username='${username}' and password='${password}'
    `
    return exec(sql).then(value => {
        return value[0]||{}
    });

}

module.exports = {
    login
}