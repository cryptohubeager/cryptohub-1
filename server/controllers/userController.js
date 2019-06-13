const User = require('../models/user-model')
const { sign } = require('../helpers/jwt')
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
}

module.exports = Controller