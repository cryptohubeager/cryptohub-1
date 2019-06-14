const route = require('express').Router()
const user = require('./user')
const api = require('./api')

route.use('/',user)
route.use('/api',api)

module.exports = route