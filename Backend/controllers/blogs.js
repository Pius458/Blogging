const blogRouter = require('express').Router()
const { query } = require('express')
const Blog = require('../model/blog')
const User  = require('../model/user')
const jwt = require('jsonwebtoken')


blogRouter.get('/', async (request,response) => {
    const blog = await Blog.find({})
    response.json(blog)
        
})

blogRouter.post('/', async (request,response) => {
    const {title, author, url, likes} = request.body

    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    console.log("decoded token", decodedToken)

    if(!(decodedToken.id)) {
        return response.status(401).json({
            error : 'invalid token'
        })
    }

    if(!title || !url) {
        return response.status(400).json({error: 'bad request'})
    }

    const user = await User.findById(decodedToken.id)
    console.log(user)

    const blog = new Blog({
        title: title,
        author: author,
        url : url,
        likes: likes,
        users : user.id
    })

    const saveBlog = await blog.save()

    user.blogs = user.blogs.concat(saveBlog._id)

    console.log(user)
    await user.save()
    response.status(200).json(saveBlog)
})

blogRouter.put('/:id', async (request,response) => {
    const {title, author, url, likes, users} = request.body

    const blog = {
        title,
        author,
        url,
        likes,
        users
    }

    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id,blog,{new : true, runValidators: true, context: query})

    response.json(updatedBlog)
})

blogRouter.delete('/:id', async (request,response) => {
    const blog = await Blog.findById(request.params.id)

    const userId = await User.findById(blog.users)

    if(blog.users.toString() === userId.id.toString()) {
        await Blog.findByIdAndDelete(request.params.id)
    }

    response.status(204).end()
})

module.exports = blogRouter