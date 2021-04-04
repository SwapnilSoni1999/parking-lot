const config = require('./config')
const express = require('express')

const routes = require('./routes')
const errorController = require('./controllers/Error')

const app = express()
const PORT = 8080

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use('/api', routes)

app.use(errorController)

app.listen(PORT, () => console.log(`Server started at http://localhost:${PORT}`))
