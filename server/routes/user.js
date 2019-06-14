const route = require('express').Router()
const userController = require('../controllers/userController')

route.post('/register', userController.signUp)
route.post('/login', userController.signIn)
route.post('/glogin', userController.gSignIn)

module.exports = route