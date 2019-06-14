const route = require('express').Router()
const user = require('./user')
const api = require('./api')
const youtube = require('./youtube')

route.use('/',user)
route.use('/youtube', youtube)
route.use('/api',api)

module.exports = route