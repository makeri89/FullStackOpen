const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../index')
const Blog = require('../models/blog')
const { response } = require('../index')
const bcrypt = require('bcrypt')
const User = require('../models/user')

const api = supertest(app)

beforeEach(async () => {
    await Blog.deleteMany({})
    let blogObjects = helper.initialBlogs
        .map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)
})


describe('initial tests', () => {
    test('correct amount of blogs are returned', async () => {
        const response = await api.get('/api/blogs')
        expect(response.body).toHaveLength(helper.initialBlogs.length)
    })

    test('id is id', async () => {
        const response = await api.get('/api/blogs')
        expect(response.body[0].id).toBeDefined()
    })
})

describe('adding blogs', () => {
    let token = null
    beforeAll(async () => {
        await User.deleteMany({})
        const passwordHash = await bcrypt.hash('sekret', 10)
        const user = new User({ username: 'test10', passwordHash })
        await user.save()
        await api
            .post('/api/login')
            .send({ username: 'test10', password: 'sekret' })
            .then((res) => {
                return (token = res.body.token)
            })
        return token
    })

    test('blog is added', async () => {
        const newBlog = {
            title: 'Testiblogi',
            author: 'Testi Testaaja',
            url: 'http://testi.com',
            likes: 69
        }

        await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${token}`)
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
    })

    test('no likes is zero', async () => {
        const newBlog = {
            title: 'Testiblogi',
            author: 'Testi Testaaja',
            url: 'http://testi.com'
        }

        await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${token}`)
            .send(newBlog)

        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd[3].likes).toBe(0)
    })

    test('token is required', async () => {
        const newBlog = {
            title: 'notokentest',
            author: 'illegal',
            url: 'wrong.com'
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(401)
    })

    test('title and url required', async () => {
        const newBlog = {
            author: 'Petteri'
        }

        await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${token}`)
            .send(newBlog)
            .expect(400)

        const blogs = await helper.blogsInDb()
        expect(blogs).toHaveLength(helper.initialBlogs.length)
    })
})

describe('deleting blogs', () => {
    let token = null
    beforeEach(async () => {
        await Blog.deleteMany({})
        await User.deleteMany({})

        const passwordHash = await bcrypt.hash('sekret', 10)
        const user = new User({ username: 'poistotesti', passwordHash })
        await user.save()

        await api
            .post('/api/login')
            .send({ username: 'poistotesti', password: 'sekret' })
            .then((res) => {
                return (token = res.body.token)
            })

        const newBlog = {
            title: 'Poistotesterin blogi',
            author: 'PoistajaPro',
            url: 'poistoon.com'
        }

        await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${token}`)
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        return token
    })

    test('a blog can be deleted', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const blogToDelete = blogsAtStart[0]

        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .set('Authorization', `Bearer ${token}`)
            .expect(204)

        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(0)
    })
})

describe('usertests', () => {
    beforeEach(async () => {
        await User.deleteMany({})
        const passwordHash = await bcrypt.hash('sekret', 10)
        const user = new User({ username: 'root', passwordHash })

        await user.save()
    })

    test('creation succeeds', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser ={
            username: 'testaus',
            name: 'Markus',
            password: 'salainen'
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

        const usernames = usersAtEnd.map(u => u.username)
        expect(usernames).toContain(newUser.username)
    })

    test('creation fails', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'root',
            name: 'Superuser',
            password: 'salainen'
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(result.body.error).toContain('`username` to be unique')

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })
})

afterAll(() => {
    mongoose.connection.close()
})