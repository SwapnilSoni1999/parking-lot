const config = require('./config')
const express = require('express')

const routes = require('./routes')
const errorController = require('./controllers/Error')
const rateLimiter = require('./middlewares/rateLimiter')

const app = express()

/**
 * Essential Express middlewares
 */
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

/**
 * Rate Limiter
 */
if (process.env.NODE_ENV !== 'testing') {
    app.use(rateLimiter(10, 10))
}

/**
 * Registered api routes
 */
app.use('/api', routes)

/**
 * Global error handler
 */
app.use(errorController)

module.exports = app
