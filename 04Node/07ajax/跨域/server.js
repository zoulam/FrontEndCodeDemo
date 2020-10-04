const express = require('express');

const app = express();

app.get('/home', (req, res) => {
    res.sendFile(__dirname + '/index.html');
})

app.get('/data', (req, res) => {
    res.send('user data');
})

app.listen(9000,()=>{
    console.log('port9000');
})