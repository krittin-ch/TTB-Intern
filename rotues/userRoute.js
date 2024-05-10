// Importing Express
const express = require('express')
const router = express.Router()

// Obtaining the ORM of Users
const { UserAccount, UserInfo } = require('../models/users_database')

const { hashPassword } = require('../util/hashPassword')

// userData = {userName, firstName, middleName, lastName, password}

// POST METHOD
// Creating a new user
router.post('/create_user', async (req, res) => {
    try {
        if (!req.body.userName ||
            !req.body.userEmail ||
            !req.body.firstName ||
            !req.body.lastName ||
            !req.body.password
        ) {
            return res.status(400).send({
                message: 'Please send the required fields'
            })
        }

        const userAccountData = {
            userName: req.body.userName,
            userEmail: req.body.userEmail,
            userPassword: await hashPassword(req.body.password)
        }

        const userInfoData = {
            userName: req.body.userName,
            fName: req.body.firstName,
            mName: req.body.middleName ? req.body.middleName : null,
            lName: req.body.lastName
        }

        const newUserAcccount = await UserAccount.query().insert(userAccountData)
        const newUserInfo = await UserInfo.query().insert(userInfoData)

        return res.status(201).send({newUserAcccount, newUserInfo});

    } catch (err) {
        res.status(500).send(err);
    }
})

// GET METHOD
// Retrieving all users
router.get('/all_user', async (req, res) => {
    try {
        const users = await UserAccount.query()
        .select('userinfo.fName', 'userinfo.mName', 'userinfo.lName', 'useraccount.userEmail', 'useraccount.userName')
        .join('userinfo', 'userinfo.userName', '=', 'useraccount.userName')
  
        res.status(201).send(users)
        res.end()
    } catch(err) {
        res.status(500).send(err)
    }
})

// GET METHOD
// Retrieving a single users
router.get('/:userName', async (req, res) => {
    try {
        const user = await UserAccount.query()
        .select('userinfo.fName', 'userinfo.mName', 'userinfo.lName', 'useraccount.userEmail', 'useraccount.userName')
        .join('userinfo', 'userinfo.userName', '=', 'useraccount.userName')
        .where('useraccount.userName', req.params.userName)

        res.send(user)
        res.end()
    } catch(err) {
        res.send(err)
    }
})

// // PUT METHOD
// // Updating an existing use by ID
// router.put('/', async (req, res) => {

// })

// DELETE METHOD
// Deleting an existing use by ID
router.delete('/:userName', async (req, res) => {
    try {
        const deleteUserAccount = await UserAccount.query().delete().where('userName', req.params.userName)
        const deleteUserInfo = await UserInfo.query().delete().where('userName', req.params.userName)
        res.end()
    } catch(err) {
        res.send(err)
    }
})

module.exports = router;