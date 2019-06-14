const axios = require('axios')
let ax = axios.create({
  baseURL: 'https://www.googleapis.com/youtube/v3'
})

class YoutubeController {
    static listVideos(req,res,next) {
			let date = new Date()
			date.setMonth(date.getMonth()-5)
			let searchDate = date.toISOString()
			// GET https://www.googleapis.com/youtube/v3 HTTP/1.1
			// `/search?part=snippet&maxResults=5&order=relevance&publishedAfter=${searchDate}&q=${req.params.keyword}&safeSearch=moderate&key=${process.env.YOUTUBE_API_KEY}`
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
}

module.exports = YoutubeController
// console.log(youtube)
