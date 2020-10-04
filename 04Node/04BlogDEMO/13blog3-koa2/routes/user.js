const { login } = require('../controller/userController');
const { successModel, ErrorModel } = require('../model/resModel');

const router = require('koa-router')()

router.prefix('/api/user') // 添加父路由

router.post('/login', async function (ctx, next) {
    const { username, password } = ctx.request.body;
    // const { username, password } = req.query;
    const data = await login(username, password);
    if (data.username) {
        // value.username 是从数据库中取出的值
        ctx.session.username = data.username;
        ctx.session.realName = data.realname;

        //同步到redis
        // set(req.sessionId,req.session);

        // console.log('session is :', req.session);
        ctx.body = new successModel();
        return
    } else {
        ctx.body = new ErrorModel('login failure!');
    }
})

// router.get('/session-test', async (ctx, next) => {
//     if (ctx.session.viewCount == null) {
//         ctx.session.viewCount = 0
//     }
//     ctx.session.viewCount++;
//     ctx.body = {
//         erron: 0,
//         viewCount: ctx.session.viewCount
//     }
// })

module.exports = router