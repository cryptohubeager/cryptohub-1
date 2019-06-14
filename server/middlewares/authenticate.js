const { verify } = require('../helpers/jwt')
const User  = require('../models/user-model')

module.exports = {
    authenticate: (req, res, next) => {
        let accessToken = req.headers["token"]
        if(accessToken) {
            let payload = verify(req.headers["token"])
            User.findById(payload.id)
            .then(user => {
                if(user) {
                    req.user = {
                        id: user._id,
                        email: user.email,
                        accessToken: req.headers.accessToken,
                    }
                    next()
                } else {
                    res.status(401).json({
                        message: 'User not found'
                    })
                }
            })
            .catch(err => {
                res.status(500).json({
                    message: 'Please provide a valid accessToken'
                })
            })
        } else {
            res.status(401).json({
                message: 'Please provide a valid accessToken'
            })
        }
    }
}