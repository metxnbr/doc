const express = require('express');
const app = express();

function enableCross(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    next()
}

function disableCross(req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3002')
    next()
}


app.get('/anna', enableCross, (req, res)=>{
    res.json({say: 'hi, i am Anna'})
})

app.get('/elsa', disableCross, (req, res)=>{
    res.jsonp({say: 'hi, i am Elsa'})
})

app.listen(3002)