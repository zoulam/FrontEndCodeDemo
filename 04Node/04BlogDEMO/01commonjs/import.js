let exp = require('./export');
console.log(exp);//[Function: mins]
exp.url = '/api/blogs' //外部添加：
// {
//     config: { host: 'localhost', port: 8080 },
//     add: [Function],
//     url: '/api/blogs'
// }

console.log(exp.add);//undefined