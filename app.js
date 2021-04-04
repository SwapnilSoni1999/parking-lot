const config = require('./config')
const express = require('express')

const routes = require('./routes')
const errorController = require('./controllers/Error')
const rateLimiter = require('./middlewares/rateLimiter')

const app = express()

/**
 * Constants
 */
const DEFAULT_RATE_LIMIT = 10 // Requests
const DEFAULT_RATE_LIMIT_COOLDOWN = 10 // seconds

/**
 * Essential Express middlewares
 */
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

/**
 * Rate Limiter
 */
if (process.env.NODE_ENV !== 'testing') {
    app.use(rateLimiter(DEFAULT_RATE_LIMIT, DEFAULT_RATE_LIMIT_COOLDOWN))
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
