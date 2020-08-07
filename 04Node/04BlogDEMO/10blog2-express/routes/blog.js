var express = require('express');
var router = express.Router();

router.get('/list', function (req, res, next) {
    res.json({
        errno: 0,
        data: [1, 2, 3]
    })
});

router.get('/detail', function (req, res, next) {
    // （因为http不支持json文本）自动转义json成为string，并且给定响应的文件类型
    res.json({
        errno: 0,
        data: {
            luluxi:'cat'
        }
    })
});

module.exports = router;
