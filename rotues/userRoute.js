// Importing Express
const express = require('express')
const router = express.Router()

// Obtaining the ORM of Users
const { UserAccount, UserInfo } = require('../models/users_database')

const { hashPassword, verifyPasswordWithHash } = require('../utils/hashPassword')
const { hashUserId } = require('../utils/hashUserId')

// POST METHOD
// Creating a new user
router.post('/create_user', async (req, res) => {
    try {
        if (!req.body.userName ||
            !req.body.userEmail ||
            !req.body.firstName ||
            !req.body.lastName ||
            !req.body.userPassword
        ) {
            return res.status(400).send({
                message: 'Please send the required fields'
            })
        }

        const userID = await hashUserId(req.body.userName + ':' + req.body.userEmail)

        const userAccountData = {
            userName: req.body.userName,
            userEmail: req.body.userEmail,
            userPassword: await hashPassword(req.body.userPassword),
            userID: userID
        }

        const userInfoData = {
            firstName: req.body.firstName,
            middleName: req.body.middleName || null,
            lastName: req.body.lastName,
            userID: userID
        }

        const newUserAcccount = await UserAccount.query().insert(userAccountData)
        const newUserInfo = await UserInfo.query().insert(userInfoData)

        res.status(201).json({newUserAcccount, newUserInfo});

    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

// GET METHOD
// Retrieving all users
router.get('/get/all_user', async (req, res) => {
    try {
        // This command does not return the users' passwords and userId
        const users = await UserAccount.query()
        .select('userinfo.firstName', 'userinfo.middleName', 'userinfo.lastName', 'useraccount.userEmail', 'useraccount.userName')
        .join('userinfo', 'userinfo.userID', '=', 'useraccount.userID')
  
        res.status(200).json(users)
    } catch(err) {
        res.status(500).json({ error: err.message })
    }
})

// GET METHOD
// Retrieving a single users
router.get('/get/:userID', async (req, res) => {
    try {
        // This command does not return the users' passwords and userId
        const user = await UserAccount.query()
        .select('userinfo.firstName', 'userinfo.middleName', 'userinfo.lastName', 'useraccount.userEmail', 'useraccount.userName')
        .join('userinfo', 'userinfo.userID', '=', 'useraccount.userID')
        .where('useraccount.userID', req.params.userID)

        res.status(200).json(user)
    } catch(err) {
        res.status(500).json({ error: err.message })
    }
})

// PUT METHOD
// Updating an existing use by ID
router.put('/update/:userID', async (req, res) => {
    try {
        const userAccount = await UserAccount.query()
        .select('userEmail', 'userName', 'userPassword', 'userID')
        .where('userID', req.params.userID)

        const userInfo = await UserInfo.query()
        .select('firstName', 'middleName', 'lastName', 'userID')
        .where('userID', req.params.userID)

        let newPassword

        if (req.body.userPassword) {
            newPassword = await hashPassword(req.body.userPassword)
        } else {
            newPassword = userAccount[0].userPassword
        }

        const userAccountData = {
            userName: req.body.userName || userAccount[0].userName,
            userEmail: req.body.userEmail || userAccount[0].userEmail,
            userPassword: newPassword || userAccount[0].userPassword,
        }

        const userID = hashUserId(
            userAccountData.userName
            + ':' 
            + userAccountData.userEmail
        )

        const userInfoData = {
            firstName: req.body.firstName || userInfo[0].firstName,
            middleName: req.body.middleName || userInfo[0].middleName,
            lastName: req.body.lastName || userInfo[0].lastName,
        }

        const userAccountUpdate = await UserAccount.query()
        .where('userID', req.params.userID)
        .patch(userAccountData)

        const userInforUpdate = await UserInfo.query()
        .where('userID', req.params.userID)
        .patch(userInfoData)

        res.status(200).json({
            message: `${userAccountData.userName} updated successfully`
        })

    } catch(err) {
        res.status(500).json({ error: err.message })
    }

})

// DELETE METHOD
// Deleting an existing use by ID
router.delete('/delete/:userID', async (req, res) => {
    try {
        const deleteUserAccount = await UserAccount.query().delete().where('userID', req.params.userID)
        const deleteUserInfo = await UserInfo.query().delete().where('userID', req.params.userID)
        
        res.status(200).json({
            message: `User with ID ${req.params.userID} deleted successfully`
        })
    } catch(err) {
        res.status(500).json({ error: err.message })
    }
})

module.exports = router;