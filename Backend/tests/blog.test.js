const {test,describe,beforeEach,after} = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const mongoose = require('mongoose')
const app = require('../app')
const Blog = require('../model/blog')

const api = supertest(app)

const initialBlogs = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 5,
      __v: 0
    },
    {
        _id: '7b122aa71b54a676234d17f8',
        title: 'Go To Statement Not Considered Harmful',
        author: 'Ednah',
        url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
        likes: 5,
        __v: 0
    },
    {
        _id: '62e01aa71b54a676234d17f8',
        title: 'To Statement Considered Harmful',
        author: 'Edsgernah',
        url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
        likes: 5,
        __v: 0
    }
]

describe.only('blogs', () => {
    beforeEach( async () => {
        await Blog.deleteMany()

        const blogObject = initialBlogs
                    .map(blog => new Blog(blog))

        const promiseArray = blogObject.map(blog => blog.save())
        await Promise.all(promiseArray)
    })

    test('blogs in json format', async () => {
        const blogs = await api 
            .get('/api/blog')
            .expect(200)
            .expect('Content-Type', /application\/json/)

        assert.strictEqual(blogs.body.length, 3)
    })

    test('unique identifier is named id', async () => {

        const response = await api.get('/api/blog')
        
        const blogId = response.body.map(b => b.id)
       
        assert.strictEqual(typeof blogId, 'object')
    })

    test('adding new blog is right', async () => {
        const newBlog = {
          title: 'A new title',
          author: 'Edr',
          url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
          likes: 2,
 
        }

        await api
            .post('/api/blog')
            .send(newBlog)
            .expect(200)
            .expect('COntent-Type', /application\/json/)

        const blogs = await api.get('/api/blog')
        const title = blogs.body.map(c => c.title)

        assert.strictEqual(blogs.body.length,initialBlogs.length + 1)
        assert(title.includes('A new title'))
    })

    test('likes default to zero', async () => {
        const newBlog = {
            title: 'A new title',
            author: 'Edr',
            url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
   
          }
        await api
            .post('/api/blog')
            .send(newBlog)
            .expect(200)
            .expect('Content-Type',/application\/json/)

        const blogs = await api.get('/api/blog')

        const likes = blogs.body.map(n => n.likes)

        assert(likes.includes(0))
    })

    test.only('missing title,url bad request', async () => {
        const badBlog = {
            author: 'creater'
        }

        await api
            .post('/api/blog')
            .send(badBlog)
            .expect(400)

        const blogAtEnd = await api.get('/api/blog')
        const author = blogAtEnd.body.map(n => n.author)

        assert.strictEqual(blogAtEnd.body.length, initialBlogs.length)
        assert(!author.includes('creater'))
    })

    after( async () => {
        await mongoose.connection.close()
    })
})
