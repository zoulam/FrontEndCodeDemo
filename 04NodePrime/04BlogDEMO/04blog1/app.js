// config file
const querystring = require('querystring');
const handleBlogRouter = require('./src/router/blogRouter');
const { handleUserRouter } = require('./src/router/userRouter');
const { resolve } = require('path');

// 获取cookie的过期时间
const getCookieExpries = () => {
    const d = new Date();
    //设置cookie一天失效到毫秒
    // GMT与北京时间相差8个小时
    d.setTime(d.getTime() + ((24 + 8) * 60 * 60 * 1000));
    console.log('GMT: ', d.toGMTString());
    return d.toGMTString()
}

// session数据
const SESSION_DATA = {}

// 处理post data
const getpostData = (req) => {
    const promise = new Promise((resolve, reject) => {
        // 两个if 过滤掉非 POST请求和非JSON数据
        if (req.method !== 'POST') {
            resolve({});
            return;
        }
        if (req.headers['content-type'] !== 'application/json') {
            resolve({});
            return;
        }


        let postData = '';
        req.on('data', chunk => {
            postData += chunk.toString();
        })
        req.on('end', () => {
            if (!postData) {
                resolve({});
                return;
            }
            resolve(JSON.parse(postData));
        })
    })
    return promise;
}

const serverHandle = (req, res) => {
    // 设置返回格式为JSON
    res.setHeader('Content-type', 'application/json');


    // 解析query
    let url = req.url;
    req.query = querystring.parse(url.split('?')[1]);

    // 解析cookie
    req.cookie = {};
    const cookieStr = req.headers.cookie || '';
    cookieStr.split(';').forEach(item => {
        if (!item) {
            return
        }
        const arr = item.split('=');
        const key = arr[0].trim();
        const value = arr[1].trim();
        req.cookie[key] = value;
    });

    // console.log('request cookie', req.cookie);

    // 解析session 取出cookie中的userid
    // 当cookie中不存在cookie时将needSetCookie设置为true
    let needSetCookie = false;
    let userId = req.cookie.userid;
    if (userId) {
        if (!SESSION_DATA[userId]) {
            SESSION_DATA[userId] = {};//不存在就初始化成对象
        }

        // 还有一种情况就是cookie中存在userId，SESSION_DATA[userId]也不是空对象，这种情况是不哟个做出任何处理的
    } else {
        // 创建随机id
        needSetCookie = true;
        userId = `${Date.now()}_${Math.random()}`
        SESSION_DATA[userId] = {};//不存在就初始化成对象
    }
    req.session = SESSION_DATA[userId];//存储到req.session


    // 在路由处理之前解析postData
    getpostData(req).then((postData) => {
        req.body = postData;

        // 处理blog router
        // const blogData = handleBlogRouter(req, res);
        // if (blogData) {
        //     res.end(
        //         JSON.stringify(blogData)
        //     )
        //     return
        // }

        // 处理blog router
        const blogResult = handleBlogRouter(req, res);
        if (blogResult) {
            blogResult.then((blogData) => {

                if (needSetCookie) {
                    res.setHeader('Set-Cookie', `userid=${userId}; path=/; httpOnly; expires=${getCookieExpries()}`)
                }

                res.end(
                    JSON.stringify(blogData)
                )
            });
            return
        }



        // 处理user router
        // const userData = handleUserRouter(req, res);
        // if (userData) {
        //     res.end(
        //         JSON.stringify(userData)
        //     )
        //     return
        // }

        // 处理user router
        const userResult = handleUserRouter(req, res);
        if (userResult) {

            if (needSetCookie) {
                res.setHeader('Set-Cookie', `userid=${userId}; path=/; httpOnly; expires=${getCookieExpries()}`)
            }

            userResult.then(value => {
                res.end(
                    JSON.stringify(value)
                )
            });
            return
        }

        // 未命中路由，返回404
        res.writeHead(404, { "Content-type": "text/plain" });
        res.write("404 NOT FOUND\n");
        res.end();
    });
}

module.exports = serverHandle