const cors = require('cors')
const express = require('express')
const app = express()
require('express-async-error')
const mongoose = require('mongoose')
const {info,error} = require('./utils/logger')
const configs = require('./utils/configs')
const blogRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const middle = require('./utils/middlewares')

mongoose.connect(configs.MONGODB_URL)
        .then(() => {
            info('Connected to MongoDb')
        })
        .catch(erro => error('Failed to connect',erro.message))

app.use(express())
app.use(cors())
app.use(express.json())

app.use('/api/login', loginRouter)
app.use('/api/blog', blogRouter)
app.use('/api/users', usersRouter)
app.use(middle.tokenExtractor)

app.use(middle.unknownEndPoint)

module.exports = app