const commentRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const comment = require('../models/comment')
const Comment = require('../models/comment')

commentRouter.get('/:id/comments', async (req, res) => {
    const { id } = req.params
    const blogWithComments = await (await Blog.findById(id)).populated('comments')
    res.json(blogWithComments)
})

commentRouter.post('/:id/comments', async (req, res) => {
    const { body } = req

    const decodedToken = jwt.verify(req.token, process.env.SECRET)

    if (!req.token || !decodedToken.id) {
        return res.status(401).json({ error: 'token missing or invalid' })
    }

    const { id } = req.params

    const blog = await Blog.findById(id)

    const comment = new Comment({
        content: body.content
    })

    const savedComment = await comment.save()

    blog.comments = blog.comments.concat(savedComment._id)
    await blog.save()
    res.status(201).json(savedComment.toJSON())
})

module.exports = commentRouter