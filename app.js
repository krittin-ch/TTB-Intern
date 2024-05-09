const express = require('express')
const { port } = require('./config.js')
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hi')
    res.end
})

app.listen(port, (req, res) => {
    console.log(`Server listening in port: ${port}...`)
})
