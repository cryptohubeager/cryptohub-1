const mongoose = require('mongoose')
const Schema = mongoose.Schema

const YoutubeSchema = new Schema ({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    videoName: String,
    Channel: String,
    coinType: String
})

const Youtube = mongoose.model('Youtube', YoutubeSchema)

module.exports = Youtube