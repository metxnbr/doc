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

const OTHERS = [
    'Kristoff',
    'Olaf',
    'Hans',
]

app.get('/other', disableCross, (req, res)=>{
    const { name } = req.query

    if(!name) {
        res.jsonp({status: 'failed', say: "sorry, I don't know what you said"})
        return
    }

    let n = name.trim()
    n = n.toLowerCase()

    const i = OTHERS.map(item=>item.toLowerCase()).indexOf(n)

    if(i === -1) {
        res.jsonp({status: 'failed', say: `${name} is not here`})
        return
    }

    res.jsonp({status: 'success', say: `hi, i am ${OTHERS[i]}`})
})

app.listen(3002)