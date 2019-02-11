require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const person = require('./models/person')



morgan.token('body', function body(req) {
    return JSON.stringify(req.body)

})

app.use(bodyParser.json())
app.use(morgan(':method :url :response-time :body'))
app.use(cors())
app.use(express.static('build'))

app.get('/api/persons', (request, response) => {
    console.log('Haetaan henkilöitä tietokannasta')
    person.find({}).then(person => {
        response.json(person.map(person => person.toJSON()))
    })

})

app.get('/api/persons/:id', (request, response) => {
    person.findById(request.params.id).then(person => {
        response.json(person.toJSON())
    })
})

app.get('/info', (reg, res) => {
    const date = new Date()
    res.send(`
    <div>
    <p>Puhelinluettelossa ${persons.length} henkilön tiedot
    </p>
    <p>${date}</p>
    </div>`)

})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id);
    persons = persons.filter(person => person.id !== id);

    response.status(204).end();
})

const generateID = () => {
    return Math.floor(Math.random() * Math.floor(1000000));
}

app.post('/api/persons', (request, response) => {
    console.log('Moi backendista')

    const body = request.body

    console.log(body)

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

    //if (persons.some(person => person.name === body.name)) {
    //  return response.status(400).json({
    //    error: `name must be unique`
    //})
    //}


    console.log('Hetki ennen luomista')

    const newPerson = new person({
        //id: generateID(),
        name: body.name,
        nro: body.nro
    })
    console.log('Luominen onnistui')

    morgan.compile(JSON.stringify(body))

    newPerson.save().then(savedPerson => {
        response.json(savedPerson.toJSON())
    })
        .catch(error => {
            console.log(error)
            response.status(400).send({ error: 'malformatted id' })
        })
});

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})