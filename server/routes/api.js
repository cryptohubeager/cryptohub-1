const route = require('express').Router()
const {authenticate} = require('../middlewares/authenticate')
const cryptoController = require('../controllers/cryptoController')

route.use(authenticate)
route.get('/crypto',cryptoController.getCoinDetail)
route.post('/cryptometa',cryptoController.getCoinMeta)
module.exports = route