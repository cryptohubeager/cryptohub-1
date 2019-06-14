const router = require('express').Router()
const YoutubeController = require('../controllers/youtubeController')

router.get('/:keyword', YoutubeController.listVideos)

module.exports = router