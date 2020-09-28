// const app = require('./app')
// const http = require('http')
// const config = require('./utils/config')
// const logger = require('./utils/logger')

// const server = http.createServer(app)

// server.listen(config.PORT, () => {
//     logger.info(`Server running on port ${config.PORT}`)
// })

const http = require('http')
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const blogsRouter = require('./controllers/blogs')

const mongoUrl = 'mongodb+srv://fullstack:fullstack@cluster0.kums7.mongodb.net/Bloglist?retryWrites=true&w=majority'
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

app.use(cors())
app.use(express.json())

app.use('/api/blogs', blogsRouter)


const PORT = 3003
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})