require('dotenv').config()
const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
// const mongoose = require('mongoose')
const Person = require('./models/person')
const { response } = require('express')

app.use(express.json())
app.use(cors())
app.use(express.static('build'))

// const url = `mongodb+srv://fullstack:<password>@cluster0.kums7.mongodb.net/Phonebook?retryWrites=true&w=majority`

// morgan.token('post', (req,res) => req.route.methods.post ? JSON.stringify(req.body) : undefined)
// app.use(morgan(':method :url :status :res[content - length] - :response-time ms :post'))

// let persons = [
//     {
//         'id': 1,
//         "name": 'Arto Hellas',
//         "number": "040-213456"
//     },
//     {
//         'id': 2,
//         'name': 'Ada Lovelace',
//         'number': '29-44-5323523'
//     },
//     {
//         'id': 3,
//         'name': 'Dan Abramov',
//         'number': '12-43-234345'
//     },
//     {
//         'id': 4,
//         'name': 'Mary Poppendieck',
//         'number': '39-23-6423122'
//     }
// ]

// let persons = []

app.get('/api/persons', (req, res) => {
    Person.find({}).then(persons => {
        res.json(persons)
    })
})

const contactAmount = () => {
    return persons.length
}

const namelist = () => persons.map(person => person.name)

app.get('/info', (req, res) => {
    const amount = contactAmount()
    const date = new Date()
    res.send(`<p>Phonebook has info for ${amount} people</p><p>${date}</p>`)
})

app.get('/api/persons/:id', (request,response) => {
    Person.findById(request.params.id).then(person => {
        response.json(person)
    })
})

app.delete('/api/persons/:iid', (request, response) => {
    const iid = Number(request.params.id)
    persons = persons.filter(person => person.id !== iid)
    console.log(persons)
    response.status(204).end()
})

app.post('/api/persons', (request, response) => {
    const body = request.body
    if (!body.name || !body.number) {
        return response.status(400).json({ error: 'content missing'})
    }

    const person = new Person({
        name: body.name,
        number: body.number,
    })

    person.save().then(savedPerson => {
        response.json(savedPerson)
    })


    // let newId = Math.floor(Math.random() * 1000)
    // const body = request.body
    // const nimet = namelist()
    // console.log(body)
    // if (!body.name || !body.number) {
    //     return response.status(400).json({
    //         error: 'Missing name or number'
    //     })
    // }

    // if (nimet.includes(body.name)) {
    //     return response.status(400).json({
    //         error: 'name must be unique'
    //     })
    // }

    // const person = {
    //     id: newId,
    //     name: body.name,
    //     number: body.number
    // }

    // persons = persons.concat(person)

    // response.json(person)
})

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})