// Access-Control-Allow-Origin设置
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:8000");//允许源 还有一种是填入 *
    // res.header("Access-Control-Allow-Origin", "*");//允许所有源（就不能携带cookie），不安全
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");//允许请求的方法
    // res.header("X-Powered-By", ' 3.2.1')
    if (req.method === "OPTIONS") {
        res.send(200); //让前端能够快速返回
    }
    else next();
})