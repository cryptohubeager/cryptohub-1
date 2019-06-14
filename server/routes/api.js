const route = require('express').Router()
const {authenticate} = require('../middlewares/authenticate')
const cryptoController = require('../controllers/cryptoController')

route.use(authenticate)
route.get('/crypto',cryptoController.getCoinDetail)
<<<<<<< HEAD
route.get('/search',cryptoController.searchCrypto)
=======
route.get('/crypto/convert/:symbol',cryptoController.exchange)
>>>>>>> convert
route.post('/cryptometa',cryptoController.getCoinMeta)
module.exports = route