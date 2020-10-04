const crypto = require('crypto');

// 密钥
const SECRET_KEY = 'WCcbN_123#C'

// md5加密

function md5(content) {
    let md5 = crypto.createHash('md5')
    return md5.update(content).digest('hex')
}

// 加密函数
function genPassword(password) {
    const str = `password=${password}&key=${SECRET_KEY}`
    return md5(str);
}

// console.log(genPassword('a123dsd5ds'));//5a22e96006cb2ecf8145a58481ab0ae6
// console.log(genPassword(456));//f988b842a534743d498c0734dec6e514
// console.log(genPassword(123));//5a22e96006cb2ecf8145a58481ab0ae6
// console.log('5a22e96006cb2ecf8145a58481ab0ae6'.length);//32