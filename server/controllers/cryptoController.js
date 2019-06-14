const axios = require('axios')

class Controller{
    static getCoinDetail(req,res){
        axios({
            method:'get',
            url:'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?CMC_PRO_API_KEY=e9b78dec-342a-428b-b838-8d5680552cbe&limit=10',
        })
        .then(({data}) => {
            console.log(data)
            res.status(200).json(data.data)
        })
        .catch((err) => {
            res.status(500).json({
                message:'Internal Server Error'
            })
        })
    }

    static getCoinMeta(req,res){
        axios({
            method:'get',
            url:`https://pro-api.coinmarketcap.com/v1/cryptocurrency/info?CMC_PRO_API_KEY=e9b78dec-342a-428b-b838-8d5680552cbe&slug=${req.body.slug}`,
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
}
module.exports = Controller