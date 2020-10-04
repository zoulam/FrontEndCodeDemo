const express = require('express');
let app = express();
app.listen(8001, () => {
    console.log(`http://localhost:8001`);
})

app.use(express.static('./'));