const mongoose = require('mongoose')
const uniqueV = require('mongoose-unique-validator');

mongoose.set('useFindAndModify', false)

const url = process.env.MONGODB_URI

console.log('Connecting to', url)

mongoose.connect(url, { useNewUrlParser: true })
    .then(result => {
        console.log('connected to MongoDB')
    })
    .catch((error) => {
        console.log('error connection to MongoDB:', error.message)
    })

const schema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 2,
        required: true,
        unique: true
    },
    nro: {
        type: Number,
        required: true,
        unique: true
    }
})

schema.plugin(uniqueV);

schema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Person', schema)