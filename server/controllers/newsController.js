const axios = require('axios')
const ax = axios.create({
    baseURL : 'https://newsapi.org/v2'
})

class newsController{
    static findallNews(req, res, next){
        // console.log('masuk')
        ax({
            method : 'get',
            url : `/everything?q=${req.params.topics}&apiKey=${process.env.APIKEY}`
        })
        .then(({data}) => {
            res.status(200).json(data)
        })
        .catch(next)
    }
}

module.exports = newsController