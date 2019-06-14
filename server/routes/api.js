const route = require('express').Router()
const {authenticate} = require('../middlewares/authenticate')
const cryptoController = require('../controllers/cryptoController')

route.use(authenticate)
route.get('/crypto',cryptoController.getCoinDetail)
route.get('/search',cryptoController.searchCrypto)
route.get('/crypto/convert/:symbol',cryptoController.exchange)
route.post('/cryptometa',cryptoController.getCoinMeta)
module.exports = route