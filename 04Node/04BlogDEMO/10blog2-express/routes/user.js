var express = require('express');
var router = express.Router();
const { login } = require('../controller/userController');
const { successModel, ErrorModel } = require('../model/resModel');


router.post('/login', function (req, res, next) {
    const { username, password } = req.body;
    // const { username, password } = req.query;
    const result = login(username, password);
    return result.then(value => {
        if (value.username) {
            // value.username 是从数据库中取出的值
            req.session.username = value.username;
            req.session.realName = value.realname;

            //同步到redis
            // set(req.sessionId,req.session);

            // console.log('session is :', req.session);
            res.json(new successModel())
            return
        } else {
            res.json(new ErrorModel('login failure!'))
        }
    });
});

// router.get('/login-test', (req, res, next) => {
//     if (req.session.username) {
//         res.json({
//             erron: 0,
//             msg: 'test success'
//         })
//     }
//     res.json({
//         erron: -1,
//         msg: 'login failure'
//     })
// })


// router.get('/session-test', (req, res, next) => {
//     const session = req.session
//     if (session.viewNum == null) {
//         session.viewNum = 0
//     }

//     session.viewNum++;
//     res.json({
//         viewNum: session.viewNum
//     })
// })

module.exports = router;