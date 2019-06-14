const axios = require('axios')

class Controller{
    static getCoinDetail(req,res){
        axios({
            method:'get',
<<<<<<< HEAD
            url:'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?CMC_PRO_API_KEY=ab5ef428-29ae-4a60-8a99-6df243c5d5e8&limit=10',
        })
        .then(({data}) => {
            console.log('masuk coin detail');
            // console.log(data)
            res.status(200).json(data.data)
        })
        .catch((err) => {
            // res.status(500).json({
            //     message:'Internal Server Error'
            // })
            console.log(err)
            console.log('======================')
        })
    }

    static getCoinMeta(req,res){
        axios({
            method:'get',
            url:`https://pro-api.coinmarketcap.com/v1/cryptocurrency/info?CMC_PRO_API_KEY=ab5ef428-29ae-4a60-8a99-6df243c5d5e8&slug=${req.body.slug}`,
=======
            url:'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?CMC_PRO_API_KEY=4444ccd2-957a-4ad3-8fb1-c2a2de49342b&limit=10',
>>>>>>> convert
        })
        .then(({data}) => {
            res.status(200).json(data.data)
        })
        .catch((err) => {
            res.status(500).json({
                message:'Internal Server Error'
            })
        })
    }

    static searchCrypto(req,res){
        axios({
            method:'get',
<<<<<<< HEAD
            url:`https://pro-api.coinmarketcap.com/v1/cryptocurrency/info?CMC_PRO_API_KEY=e9b78dec-342a-428b-b838-8d5680552cbe&slug=${req.query.coin}`,
=======
            url:`https://pro-api.coinmarketcap.com/v1/cryptocurrency/info?CMC_PRO_API_KEY=4444ccd2-957a-4ad3-8fb1-c2a2de49342b&slug=${req.body.slug}`,
>>>>>>> convert
        })
        .then(({data}) => {
            res.status(200).json(data.data)
        })
        .catch((err) => {
            res.status(500).json({
                message:'Internal Server Error'
            })
        })
    }

    static exchange(req, res) {
        axios({
            method: 'get',
            url: `https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=${req.params.symbol}&convert=IDR`,
            headers: {'X-CMC_PRO_API_KEY': `1d0a0b91-0d1a-4619-acf4-51b7a0ac24ba`}
        })
        .then(({data}) => {
            res.status(200).json(data)
        })
        .catch((err) => {
            res.status(500).json({
                message: err
            })
        })
    }
}
module.exports = Controller