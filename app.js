const config = require('./config')
const express = require('express')

const routes = require('./routes')
const errorController = require('./controllers/Error')

const app = express()

/**
 * Essential Express middlewares
 */
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

/**
 * Registered api routes
 */
app.use('/api', routes)

/**
 * Global error handler
 */
app.use(errorController)

module.exports = app
