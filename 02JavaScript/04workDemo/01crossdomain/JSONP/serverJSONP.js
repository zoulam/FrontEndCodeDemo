const express = require('express');
let app = express();
app.listen(8001, () => {
    console.log(`http://localhost:8001`);
})

app.get('/list', (req, res) => {
    let { callback = Function.prototype } = req.query;
    let data ={
        code:0,
        message:'zoulam and lulu xi'
    };
    res.send(`${callback}(${JSON.stringify(data)})`);
});