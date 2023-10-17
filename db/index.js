const mongoose = require('mongoose')
const { uri, connectionOptions } = require('../conf/db')

mongoose.connect(uri, connectionOptions)

const db = mongoose.connection

db.on('error', console.error.bind(console, 'MongoDB connection error:'))
db.once('open', () => {
    console.log('Connected to MongoDB')
})

module.exports = mongoose
