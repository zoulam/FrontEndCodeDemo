const { login } = require('../controller/userController');
const { successModel, ErrorModel } = require('../model/resModel');
const { set } = require('../db/redis');


// 获取cookie的过期时间
const getCookieExpries = () => {
    const d = new Date();
    //设置cookie一天失效到毫秒
    // GMT与北京时间相差8个小时
    d.setTime(d.getTime() + ((24 + 8) * 60 * 60 * 1000));
    console.log('GMT: ', d.toGMTString());
    return d.toGMTString()
}


const handleUserRouter = (req, res) => {
    const method = req.method;
    let url = req.url;
    req.path = url.split('?')[0];    // 获取path

    // 登录
    if (method === 'POST' && req.path === '/api/user/login') {
        const { username, password } = req.body;
        // const { username, password } = req.query;
        const result = login(username, password);
        return result.then(value => {
            if (value.username) {
                // 设置session
                // value.username 是从数据库中取出的值
                req.session.username = value.username;
                req.session.realName = value.realname;

                //同步到redis
                set(req.sessionId,req.session);

                // console.log('session is :', req.session);
                return new successModel();
            } else {
                return new ErrorModel('login failure!');
            }
        });
    }

    // // 登录测试
    // if (method === 'GET' && req.path === '/api/user/login-test') {
    //     if (req.session.username) {
    //         return Promise.resolve(new successModel({
    //             session: req.session
    //         }));
    //     }
    //     return Promise.resolve(new ErrorModel('login failure!'));
    // }
}

module.exports = {
    handleUserRouter
}