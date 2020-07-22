// 异步实践2
//模拟获取  用户数据  订单数据  商品数据
function getUsers() {
    setTimeout(() => {
        let data = '用户数据';
        //调用 next 方法, 并且将数据传入
        iterator3.next(data);
    }, 1000);
}

function getOrders() {
    setTimeout(() => {
        let data = '订单数据';
        iterator3.next(data);
    }, 1000)
}

function getGoods() {
    setTimeout(() => {
        let data = '商品数据';
        iterator3.next(data);
    }, 1000)
}

function* gen3() {
    //获取信息的过程是有先后顺序的，前面的信息和后面信息是对应的
    let users = yield getUsers();
    let orders = yield getOrders();
    let goods = yield getGoods();
    console.log(`users:${users},orders:${orders},goods:${goods}`);
}

//调用生成器函数
let iterator3 = gen3();
iterator3.next();