const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')


morgan.token('body', function body(req) {
    return JSON.stringify(req.body)

})

app.use(bodyParser.json())
app.use(morgan(':method :url :response-time :body'))
app.use(cors())



let persons = [
    {
        id: 1,
        name: "Arto Hellas",
        number: "045-1236543"
    },
    {
        id: 2,
        name: "Arto Järvinen",
        number: "041-21423123"
    },
    {
        id: 3,
        name: "Lea Kutvonen",
        number: "0404323234"
    },
    {
        id: 4,
        name: "Martti Tienari",
        number: "09-784232"
    }
]

app.get('/api/persons', (req, res) => {
    res.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)

    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }


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

    const body = request.body

    if (body.name === undefined) {
        return response.status(400).json({
            error: 'name is missing'
        })
    }

    if (body.number === undefined) {
        return response.status(400).json({
            error: `number is missing`
        })
    }

    if (persons.some(person => person.name === body.name)) {
        return response.status(400).json({
            error: `name must be unique`
        })
    }



    const newPerson = {
        id: generateID(),
        name: body.name,
        number: body.number
    }

    morgan.compile(JSON.stringify(body))

    persons = persons.concat(newPerson)

    response.json(newPerson)
});

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})