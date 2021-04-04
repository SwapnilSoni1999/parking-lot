const config = require('./config')
const express = require('express')

const ParkingLot = require('./lib/ParkingLot')

const parkingLot = new ParkingLot(process.env.PARKING_LOT_SIZE)

const app = express()
const PORT = 3000

app.listen(PORT, () => console.log(`Server started at http://localhost:${PORT}`))
