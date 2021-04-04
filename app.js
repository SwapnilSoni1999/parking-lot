const config = require('./config')
const express = require('express')

const routes = require('./routes')
const errorController = require('./controllers/Error')

const app = express()
const PORT = 3000

app.use('/api', routes)

app.use(errorController)

app.listen(PORT, () => console.log(`Server started at http://localhost:${PORT}`))
