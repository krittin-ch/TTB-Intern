// Importing Express
const express = require('express')
const router = express.Router()

// Obtaining the ORM of Users
const { Users } = require('../models/users')

// // POST METHOD
// // Creating a new user
// router.post('/', async (req, res) => {
//     const user = Users.query().findById(1);
//     return user
// })

// // GET METHOD
// // Retrieving all users
// router.get('/', async (req, res) => {

// })

// GET METHOD
// Retrieving a single users
router.get('/', async (req, res) => {
    const user = await Users.query()
    try {
        console.log(user)
        res.end()
    } catch(err) {
        console.log(err)
    }
})

// // PUT METHOD
// // Updating an existing use by ID
// router.put('/', async (req, res) => {

// })

// // DELETE METHOD
// // Deleting an existing use by ID
// router.post('/', async (req, res) => {

// })

module.exports = router;