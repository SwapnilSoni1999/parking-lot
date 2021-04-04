/**
 * @file config.js
 * Loads .env file and checks for required variables
 */
require('dotenv').config()

if (!process.env.PARKING_LOT_SIZE) {
    throw new Error(`PARKING_LOT_SIZE is not defined! Please define from .env`)
}

if (!process.env.PARKING_LOT_SIZE < 0) {
    throw new Error(`PARKING_LOT_SIZE must be greater than 0.`)
}

if (process.env.NODE_ENV === 'testing') {
    console.info('In testing environment. No RateLimit is applied.')
}

console.info('Loaded config!')
