const router = require('koa-router')()

router.prefix('/users') // 添加父路由

router.get('/', async function (ctx, next) { // users/ or users
  ctx.body = 'this is a users response!'
})

router.get('/bar', async function (ctx, next) {
  ctx.body = 'this is a users/bar response'
})


module.exports = router
