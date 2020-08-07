// httpReadFile.js
const fs = require('fs');
const path = require('path');
const http = require('http');


const fileName1 = path.resolve(__dirname, 'data.txt')
const server = http.createServer((req, res) => {
    if (req.method === 'GET') {
        const readStream = fs.createReadStream(fileName1)
        readStream.pipe(res);
    }
});


const port = 3005;
server.listen(port, () => {
    console.log(`http://localhost:${port}/`);
});