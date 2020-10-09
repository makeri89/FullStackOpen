const bcrypt = require('bcrypt')
const { request, response } = require('..')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response) => {
    const body = request.body
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    if (body.password.length < 3) {
        return response.status(400).json({ error: 'Password should be at least 3 characters long' })
    }

    const user = new User({
        username: body.username,
        name: body.name,
        passwordHash
    })

    const savedUser = await user.save()

    response.json(savedUser)
})

usersRouter.get('/', async (request, response) => {
    const users = await User
        .find({}).populate('blogs', { title: 1, url: 1, likes: 1})
    response.json(users.map(u => u.toJSON()))
})

module.exports = usersRouter