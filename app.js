const express = require('express')
const { port } = require('./config.js')

const userRoutes = require('./rotues/userRoute.js')

const app = express();

app.use(express.json());

app.use('/users', userRoutes);

app.get('/', (req, res) => {
    res.send('Hello World!')
    res.end
})

app.listen(port, (req, res) => {
    console.log(`Server listening in port: ${port}...`)
})
