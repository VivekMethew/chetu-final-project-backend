const express = require('express')
const router = express.Router()
const { verifyAccessToken } = require('../config/checkAuth')

// controllers
const userController = require('../controller/users.controller')

// get users
router.get('/users', verifyAccessToken, userController.getUsers)

// get user
router.get('/users/:userid', verifyAccessToken, userController.getUser)

// create users
router.post('/users', userController.createUsers)

// get users
router.patch('/users/:userid', verifyAccessToken, userController.updateUsers)

// get users
router.delete('/users/:userid', verifyAccessToken, userController.deleteUsers)

// login user
router.post('/users/login', userController.user_login)

// refresh-token
router.post('/users/refresh-token', userController.refresh_token)

// mailer send
router.post('/users/mailer', verifyAccessToken, userController.mailer)

// // logout
// router.delete('/logout', userController.logout_users)

module.exports = router