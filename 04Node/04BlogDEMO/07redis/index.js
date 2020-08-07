const redis = require('redis');

// 创建客户端
const redisClient = redis.createClient(6379,'127.0.0.1');
redisClient.on('error',err=>{
    console.error(err);
});

//测试
redisClient.set('name','zoulam',redis.print)
redisClient.get('name',(err,val)=>{
    if(err){
        console.error(err);
        return;
    }
    console.log('value',val);

    //退出
    redisClient.quit();
});