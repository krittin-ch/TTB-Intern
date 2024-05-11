// Importing Express
const express = require('express')
const router = express.Router()

// Obtaining the ORM of Users
const { UserAccount, UserInfo } = require('../models/users_database')

const { hashPassword, verifyPasswordWithHash } = require('../util/hashPassword')
const { hashUserId, verifyUserIdWithHash } = require('../util/hashUserId')

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

        const userID = await hashUserId(req.body.userName + ':' + req.body.Email)

        const userAccountData = {
            userName: req.body.userName,
            userEmail: req.body.userEmail,
            userPassword: await hashPassword(req.body.password),
            userID: userID
        }

        const userInfoData = {
            userName: req.body.userName,
            fName: req.body.firstName,
            mName: req.body.middleName || null,
            lName: req.body.lastName,
            userID: userID
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
        // This command does not return the users' passwords and userId
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
router.get('/:userID', async (req, res) => {
    try {
        // This command does not return the users' passwords and userId
        const user = await UserAccount.query()
        .select('userinfo.fName', 'userinfo.mName', 'userinfo.lName', 'useraccount.userEmail', 'useraccount.userName')
        .join('userinfo', 'userinfo.userID', '=', 'useraccount.userID')
        .where('useraccount.userID', req.params.userID)

        res.send(user)
        res.end()
    } catch(err) {
        res.send(err)
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
        .select('userName', 'fName', 'mName', 'lName', 'userID')
        .where('userID', req.params.userID)

        let newPassword

        if (req.body.password) {
            newPassword = await hashPassword(req.body.password)
        } else {
            newPassword = userAccount[0].userPassword
        }

        const userAccountData = {
            userName: req.body.userName || userAccount[0].userName,
            userEmail: req.body.userEmail || userAccount[0].userEmail,
            userPassword: newPassword || userAccount[0].userPassword,
        }

        console.log(userAccountData)

        const userID = hashUserId(
            userAccountData.userName
            + ':' 
            + userAccountData.userEmail
        )

        const userInfoData = {
            userName: req.body.userName || userInfo[0].userName,
            fName: req.body.firstName || userInfo[0].fName,
            mName: req.body.middleName || userInfo[0].mName,
            lName: req.body.lastName || userInfo[0].lName,
        }

        const userAccountUpdate = await UserAccount.query()
        .where('userID', req.params.userID)
        .patch(userAccountData)

        const userInforUpdate = await UserInfo.query()
        .where('userID', req.params.userID)
        .patch(userInfoData)

        res.status(201).send({
            update: {userAccountUpdate, userInforUpdate},
            message: `${userAccountData.userName} is updated successfully`})
        res.end()
    } catch(err) {
        res.status(500).send(err)
        res.end()
    }

})

// DELETE METHOD
// Deleting an existing use by ID
router.delete('/delete/:userID', async (req, res) => {
    try {
        const deleteUserAccount = await UserAccount.query().delete().where('userID', req.params.userID)
        const deleteUserInfo = await UserInfo.query().delete().where('userID', req.params.userID)
        
        res.status(201).send(`${req.params.userID} is successfully deleted`)
        res.end()
    } catch(err) {
        res.status(500).send(err)
    }
})

module.exports = router;