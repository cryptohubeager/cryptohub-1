const axios = require('axios')
let ax = axios.create({
  baseURL: 'https://www.googleapis.com/youtube/v3'
})
const ObjectID = require('mongodb').ObjectId

class YoutubeController {
    static listVideos(req,res,next) {
		let date = new Date()
		date.setMonth(date.getMonth()-5)
		let searchDate = date.toISOString()
		
		ax
			.get(`/search?part=snippet&maxResults=5&publishedAfter=${searchDate}&q=${req.params.keyword}&relevanceLanguage=en&type=video&videoDuration=medium&key=${process.env.YOUTUBE_API_KEY}`)			
			.then(({data}) => {
				// res.json(200).json(data)
				res.status(200).json(data)
			})
			.catch(err => {
				console.log(err)
			})
	}
	
	static saveVideo(req,res,next) {
		
	}
}

module.exports = YoutubeController
// console.log(youtube)
