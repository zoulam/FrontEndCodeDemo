var express = require('express');
var router = express.Router();
const { getList, getDetail, newBlog, updateBlog, deleteBlog } = require('../controller/blogController');
const { successModel, ErrorModel } = require('../model/resModel');
const loginCheck = require('../midware/loginCheck');

// 获取博客列表
router.get('/list', (req, res, next) => {
    // 从query中获取信息
    let author = req.query.author || '';
    const keyword = req.query.keyword || '';

    if (req.query.isadmin) {
        console.log('isadmin');
        // 管理员界面
        // 未登录
        if (req.session.username == null) {
            console.log('isadmin but no login');
            res.json(new ErrorModel('未登录'))
            return
        }
        // 强制登录自己的博客
        author = req.session.username;
    }


    // 接收到的数据是Promise对象
    const result = getList(author, keyword);
    return result.then((listData) => {
        res.json(new successModel(listData));
    });
});

// 获取博客详情
router.get('/detail', (req, res, next) => {
    // （因为http不支持json文本）自动转义json成为string，并且给定响应的文件类型
    const result = getDetail(req.query.id);
    return result.then(data => {
        res.json(new successModel(data))
    });
});

// 新建博客,插入登录验证中间件
router.post('/new', loginCheck, (req, res, next) => {
    // （因为http不支持json文本）自动转义json成为string，并且给定响应的文件类型

    req.body.author = req.session.username;
    const result = newBlog(req.body);
    return result.then(data => {
        res.json(new successModel(data));
    });
});

// 更新博客
router.post('/update', loginCheck, (req, res, next) => {
    const result = updateBlog(req.query.id, req.body);
    return result.then(value => {
        if (value) {
            res.json(new successModel());
        } else {
            res.json(new ErrorModel('更新博客失败'));
        }
    });
});

// 删除博客
router.post('/del', loginCheck, (req, res, next) => {
    req.body.author = req.session.username;
    const result = deleteBlog(req.query.id, req.body.author);
    return result.then(value => {
        if (value) {
            res.json(new successModel());
        } else {
            res.json(new ErrorModel('删除博客失败！'));
        }
    })
});


module.exports = router;
