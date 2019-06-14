const User = require('../models/user-model')
const { sign } = require('../helpers/jwt')
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENT_ID);
const { compare } =  require('../helpers/bcrypt')

class Controller{
    static signUp(req,res){
        const {email,password} = req.body
        User
            .create({
                email:email,
                password:password
            })
            .then((user) => {
                res.status(201).json({user , msg: 'Thanks for registering'})
            })
            .catch((err) => {
                res.status(500).json(err)
            })
    }

    static signIn(req,res){
        const {email,password} = req.body
        User
            .findOne({
                email:email
            })
            .then((user) => {
                if(!user){
                    res.status(401).json({
                        message:'Wrong Email/Password'
                    })
                }
                else{
                    if(!compare(password,user.password)){
                        res.status(401).json({message : 'Wrong Email/Password'})
                    }
                    else{
                        const payload = {
                            id:user._id,
                            email:user.email
                        }
                        const token = sign(payload)
                        res.status(200).json({
                            token
                        })
                    }
                }
            })
            .catch((err) => {
                res.status(500).json(err)
            }) 
    }

    static gSignIn(req, res, next) {
        client.verifyIdToken({
            idToken: req.body.idToken,
            audience: process.env.CLIENT_ID,
        })
        .then(function(ticket) {
            // console.log(ticket)
            const { email, name } = ticket.getPayload()
            // console.log(email)
            // console.log(name)
            let password = name+'123'
            let newUser = {
                email: email,
                password: password
            }
            console.log(newUser)
            User.findOne({ email: newUser.email })
            .then(user => {
                // console.log('masuk find1')
                if(user != null) {
                    // console.log('masuk if')
                    let token = sign(user.email)
                    // console.log(token, 'aaaaa')
                    res.status(200).json({ email, name, token })
                } else {
                    // console.log('masuk else')
                    User.create(newUser)
                    .then(user => {
                        let token = sign(data)
                        // console.log(token, 'bbbb')
                        res.status(200).json({ email, name, token }) 
                    })
                    .catch(next)
                }
            })
            .catch(next)
        })
        .catch(next)
    }
}

module.exports = Controller