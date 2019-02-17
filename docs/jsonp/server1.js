const express = require('express');
const app = express();

app.get('/', (req, res)=>{
    res.sendFile('index.html', {root: './'})
})

app.listen(3001)