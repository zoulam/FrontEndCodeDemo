const express = require('express');
let app = express();

app.get('/server', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.send('hello ajax!')
})

app.all('/server', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');
    res.send('hello post ajax!')
})

app.all('/json-server', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');
    const data = {
        name: 'luluxi',
        age: 18
    }
    let str = JSON.stringify(data)
    res.send(str)
})


app.get('/ie', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.send('hello ie -2!')
})

app.get('/outtime', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    setTimeout(() => {
        res.send('outtime!')
    }, 3000)

})

app.all('/jquery-server', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');
    const data = {
        name: 'zoulam'
    }
    let str = JSON.stringify(data)
    res.send(str)
    // res.send('hello jquery!')
})

app.all('/axios-server', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');
    const data = {
        name: 'zoulam'
    }
    let str = JSON.stringify(data)
    res.send(str)
    // res.send('hello jquery!')
})


app.all('/fetch-server', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');
    const data = {
        name: 'zoulam'
    }
    let str = JSON.stringify(data)
    res.send(str)
    // res.send('hello jquery!')
})

app.all('/jsonp-server', (req, res) => {
    // res.send('console.log("i am jsonp")');
    const data = {
        name: 'i am jsonp'
    }
    let str = JSON.stringify(data);
    // end 不会像send一样加特殊响应头
    res.end(`handle(${str})`)
})


app.all('/logincheck', (req, res) => {
    // res.send('console.log("i am jsonp")');
    const data = {
        exit: 1,
        msg: '用户名已经存在'
    }
    let str = JSON.stringify(data);
    // end 不会像send一样加特殊响应头
    res.end(`handle(${str})`)
})

app.all('/jquery-jsonp', (req, res) => {
    // res.send('console.log("i am jsonp")');
    const data = {
        name: 'zoulam'
    }
    let str = JSON.stringify(data);
    let callback = req.query.callback;
    // end 不会像send一样加特殊响应头
    res.end(`${callback}(${str})`)
})


app.get('/cros-test', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin','http://127.0.0.1:5500');
    res.setHeader('Access-Control-Allow-Headers','*');
    res.setHeader('Access-Control-Allow-Method','get');
    res.send('hello cros')
})

app.listen(8000, () => {
    console.log('port 8000');
})
