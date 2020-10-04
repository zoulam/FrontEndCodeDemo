let express = require('express');
let app = express();

let webpack = require('webpack')
const middle = require('webpack-dev-middleware');

let config = require('./webpack.config.js');

let compiler = webpack(config);

app.use(middle(compiler));

app.get('/user', (req, res) => {
    res.json({ name: 'zoulam' })
})

app.listen(3000);