const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../model/user')
const loginRouter = require('express').Router()

loginRouter.post('/', async (request,response) => {
    const {username, password} = request.body

    const user = await User.findOne({username})
    console.log("The Found user", user)
    const passwordMatch = user === null 
        ? false : bcrypt.compare(password, user.passwordHash)

    if(!(user && passwordMatch)) {
        response.status(401).json({
            error : 'Ivalid username or password'
        })
    }

    const userForToken = {
        username: user.username,
        id : user.id
    }

    const token = jwt.sign(userForToken, process.env.SECRET)

    response.status(200)
        .send({token , username : user.username , name : user.name})


})
module.exports = loginRouter