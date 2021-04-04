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

console.info('Loaded config!')
