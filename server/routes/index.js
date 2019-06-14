const route = require('express').Router()
const user = require('./user')
const youtube = require('./youtube')

route.use('/',user)
route.use('/youtube', youtube)

module.exports = route