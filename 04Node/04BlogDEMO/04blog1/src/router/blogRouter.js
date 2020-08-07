const { getList, getDetail, newBlog, updateBlog, deleteBlog } = require('../controller/blogController');
const { successModel, ErrorModel } = require('../model/resModel');

// 统一的登录验证函数,拦截未登录
const loginCheck = (req) => {
    if (!req.session.username) {
        return Promise.resolve(
            new ErrorModel('尚未登录')
        )
    }
}


const handleBlogRouter = (req, res) => {
    const method = req.method;
    let url = req.url;
    req.path = url.split('?')[0];// 获取接口
    const id = req.query.id || '';

    // 获取博客列表
    if (method === 'GET' && req.path === '/api/blog/list') {
        // 从query中获取信息
        let author = req.query.author || '';
        const keyword = req.query.keyword || '';
        // const listData = getList(author, keyword);
        // // 对获取到的信息进行model处理
        // return new successModel(listData);

        if (req.query.isadmin) {
            // 管理员界面
            const loginCheckResult = loginCheck(req);
            // 未登录
            if(loginCheckResult){
                return loginCheckResult;
            }
            // 强制登录自己的博客
            author = req.session.username;
        }


        // 接收到的数据是Promise对象
        const result = getList(author, keyword);
        return result.then((listData) => {
            return new successModel(listData);
        });
    }

    // 获取博客详情
    if (method === 'GET' && req.path === '/api/blog/detail') {
        // const data = getDetail(id);
        // return new successModel(data);
        const result = getDetail(id);
        return result.then(data => {
            return new successModel(data);
        });
    }

    // 新建博客
    // post处理是异步的 req.on()
    if (method === 'POST' && req.path === '/api/blog/new') {
        // const data = newBlog(req.body);
        // return new successModel(data);

        // 需要登录才能有author数据此处先模拟
        // req.body.author = 'lalaxi';

        let loginCheckResult = loginCheck(req);
        if (loginCheckResult) {
            // 未登录
            return loginCheckResult;
        }


        req.body.author = req.session.username;
        const result = newBlog(req.body);
        return result.then(data => {
            return new successModel(data);
        });
    }

    // 更新博客
    if (method === 'POST' && req.path === '/api/blog/update') {

        let loginCheckResult = loginCheck(req);
        if (loginCheckResult) {
            // 未登录
            return loginCheckResult;
        }

        const result = updateBlog(id, req.body);
        return result.then(value => {
            if (value) {
                return new successModel();
            } else {
                return new ErrorModel('更新博客失败');
            }
        });

    }

    // 删除博客
    if (method === 'POST' && req.path === '/api/blog/delete') {
        // 需要登录才能有author数据此处先模拟
        // req.body.author = 'luluxi';

        let loginCheckResult = loginCheck(req);
        if (loginCheckResult) {
            // 未登录
            return loginCheckResult;
        }
        req.body.author = req.session.username;
        const result = deleteBlog(id, req.body.author);
        return result.then(value => {
            if (value) {
                return new successModel();
            } else {
                return new ErrorModel('删除博客失败！');
            }
        })
    }
}

module.exports = handleBlogRouter;
