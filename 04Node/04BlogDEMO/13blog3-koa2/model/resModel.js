// 数据模型
// 根据接收数据类型返回相应的errno码，用以确定是正确还是错误的操作
class BaseModel {

    constructor(data, message) {
        // data是对象类型，message是字符串
        // 但是为了兼容，进行处理
        if (typeof data === 'string') {
            this.message = data;
            data = null;
            message = null;
        }
        if (data) {
            this.data = data;
        }
        if (message) {
            this.message = message;
        }
    }
}

class successModel extends BaseModel {
    constructor(data, message) {
        super(data, message);
        this.errno = 0;
        // JSON.stringify({
        //     errno:0,
        //     data:{}
        //     message:''
        // })
    }
}


class ErrorModel extends BaseModel {
    constructor(data, message) {
        super(data, message);
        this.errno = -1;
        // JSON.stringify({
        //     errno:-1,
        //     data:{}
        //     message:''
        // })
    }
}

module.exports={
    successModel,
    ErrorModel
}