const { getList, getDetail, newBlog, updateBlog, deleteBlog } = require('../controller/blogController');
const { successModel, ErrorModel } = require('../model/resModel');
const loginCheck = require('../midware/loginCheck');

const router = require('koa-router')()

router.prefix('/api/blog') // 添加父路由

router.get('/list', async (ctx, next) => { // users/
    // 从query中获取信息
    let author = ctx.query.author || '';
    const keyword = ctx.query.keyword || '';

    if (ctx.query.isadmin) {
        console.log('isadmin');
        // 管理员界面
        // 未登录
        if (ctx.session.username == null) {
            console.log('isadmin but no login');
            ctx.body = new ErrorModel('未登录')
            return
        }
        // 强制登录自己的博客
        author = ctx.session.username;
    }


    // 接收到的数据是Promise对象
    let listData = await getList(author, keyword)
    ctx.body = new successModel(listData)
})

router.get('/detail', async (ctx, next) => {
    const detailData = await getDetail(ctx.query.id);
    ctx.body = new successModel(detailData)
})

router.post('/new', loginCheck, async (ctx, next) => {
    const body = ctx.request.body
    body.author = ctx.session.username;
    const newData = await newBlog(body);
    ctx.body = new successModel(newData);
})

router.post('/update', loginCheck, async (ctx, next) => {
    const updateData = await updateBlog(ctx.query.id, ctx.request.body);
    if (updateData) {
        ctx.body = new successModel()
    } else {
        ctx.body = new ErrorModel('更新博客失败')
    }
})

router.post('/del', loginCheck, async (ctx, next) => {
    ctx.body.author = ctx.session.username;
    const delData = deleteBlog(ctx.query.id, ctx.body.author);
    if (delData) {
        ctx.body = new successModel();
    } else {
        ctx.body = new ErrorModel('删除博客失败！');
    }

})


module.exports = router
