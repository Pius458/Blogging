const usersRouter = require('express').Router()
const User = require('../model/user')
const bcrypt = require('bcrypt')

usersRouter.get('/', async(request,response) => {
    const users = await User.find({}).populate('blogs')

    response.status(200).json(users)
})

usersRouter.post('/', async (request,response) => {
    const body = request.body
    console.log(body)
    const {username, password, name} = request.body

    if(!password) {
        response.status(500).json({
            error: 'password missing'
        })
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const newUser = new User({
        username,
        passwordHash,
        name
    })
    console.log(newUser)

    const savedUser =  await newUser.save()
    response.status(200).json(savedUser)

})

module.exports = usersRouter
