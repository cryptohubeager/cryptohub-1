const express = require('express')
const route = express.Router()
const newsController = require('../controllers/newsController')

route.get('/show/:topics', newsController.findallNews)

module.exports = route