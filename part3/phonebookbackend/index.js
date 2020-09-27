const express = require('express')
const app = express()
const morgan = require('morgan')

app.use(express.json())

morgan.token('post', (req,res) => req.route.methods.post ? JSON.stringify(req.body) : undefined)
app.use(morgan(':method :url :status :res[content - length] - :response-time ms :post'))

let persons = [
    {
        'id': 1,
        "name": 'Arto Hellas',
        "number": "040-213456"
    },
    {
        'id': 2,
        'name': 'Ada Lovelace',
        'number': '29-44-5323523'
    },
    {
        'id': 3,
        'name': 'Dan Abramov',
        'number': '12-43-234345'
    },
    {
        'id': 4,
        'name': 'Mary Poppendieck',
        'number': '39-23-6423122'
    }
]

app.get('/api/persons', (req, res) => {
    res.json(persons)
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
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})

app.delete('/api/persons/:iid', (request, response) => {
    const iid = Number(request.params.id)
    persons = persons.filter(person => person.id !== iid)

    response.status(204).end()
})

app.post('/api/persons', (request, response) => {
    let newId = Math.floor(Math.random() * 1000)
    const body = request.body
    const nimet = namelist()
    console.log(body)
    if (!body.name || !body.number) {
        return response.status(400).json({
            error: 'Missing name or number'
        })
    }

    if (nimet.includes(body.name)) {
        return response.status(400).json({
            error: 'name must be unique'
        })
    }

    const person = {
        id: newId,
        name: body.name,
        number: body.number
    }

    persons = persons.concat(person)

    response.json(person)
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})