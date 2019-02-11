require('dotenv').config()
const express = require('express')
const app = express()

const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')



morgan.token('body', function body(req) {
    return JSON.stringify(req.body)

})

const logger = (request, response, next) => {
    console.log('Method:', request.method)
    console.log('Path:  ', request.path)
    console.log('Body:  ', request.body)
    console.log('---')
    next()
}

app.use(express.static('build'))
app.use(bodyParser.json())
app.use(morgan(':method :url :response-time :body'))
app.use(cors())
app.use(logger)


app.get('/api/persons', (request, response) => {
    console.log('Haetaan henkilöitä tietokannasta')
    Person.find({}).then(person => {
        response.json(person.map(person => person.toJSON()))
    })
        .catch(error => {
            console.log(error);
            response.status(404).end()
        })

})

app.get('/api/persons/:id', (request, response) => {
    Person.findById(request.params.id).then(person => {
        response.json(person.toJSON())
    })
        .catch(error => {
            console.log(error);
            response.status(404).end()
        })
})

app.get('/info', (reg, res) => {
    console.log('moi')
    const date = new Date()
    const amount = Person.distinct('_id').length
    console.log(amount)

    res.send(`
    <div>
    <p>Puhelinluettelossa ${amount} henkilön tiedot
    </p>
    <p>${date}</p>
    </div>`)

})

app.delete('/api/persons/:id', (request, response) => {
    Person.findByIdAndRemove(request.params.id)
        .then(result => {
            response.status(204).end()
        })
        .catch(error => next(error))

})

app.post('/api/persons', (request, response) => {
    const body = request.body

    if (body.name === undefined) {
        return response.status(400).json({
            error: 'name is missing'
        })
    }

    if (body.nro === undefined) {
        return response.status(400).json({
            error: `number is missing`
        })
    }

    const newPerson = new Person({
        name: body.name,
        nro: body.nro
    })

    morgan.compile(JSON.stringify(body))

    newPerson.save().then(savedPerson => {
        response.json(savedPerson.toJSON())
    })
        .catch(error => {
            console.log(error);
            response.status(404).end()
        })
});

app.put('/api/persons/:id', (request, response, next) => {
    const body = request.body

    const person = {
        name: body.name,
        nro: body.nro,
    }

    Person.findByIdAndUpdate(request.params.id, person, { new: true })
        .then(updatedPerson => {
            response.json(updatedPerson.toJSON())
        })
        .catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)


const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError' && error.kind == 'ObjectId') {
        return response.status(400).send({ error: 'malformatted id' })
    }

    next(error)
}
app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})