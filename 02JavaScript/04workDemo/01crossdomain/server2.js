const express = require('express');
let app = express();
app.listen(8002, () => {
    console.log(`http://localhost:8002`);
})

app.use(express.static('./'));