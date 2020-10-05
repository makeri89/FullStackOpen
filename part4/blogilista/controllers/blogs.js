const blogsRouter = require('express').Router()
const { request } = require('..')
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
    // Blog.find({}).then(blogs => {
    //     response.json(blogs.map(blog => blog.toJSON()))
    // })
    const blogs = await Blog.find({})
    response.json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.post('/', (request, response, next) => {
    const blog = new Blog(request.body)

    blog
        .save()
        .then(result => {
            response.status(201).json(result)
        })
        .catch(error => next(error))
})

blogsRouter.delete('/:id', async (request, response) => {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
})

blogsRouter.put('/:id', (request, response) => {
    const body = request.body

    const blog = {
        likes: body.likes
    }

    Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
        .then(updatedBlog => {
            response.json(updatedBlog.toJSON())
        })
})

module.exports = blogsRouter