require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const port = process.env.PORT || 3000
const cors = require('cors')
const routes = require('./routes/index')

const app = express()
mongoose.connect('mongodb://localhost/cryptohub', { useNewUrlParser: true })

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/', routes)

app.listen(port, () => {
    console.log(`Listening on port: ${port}`)
})