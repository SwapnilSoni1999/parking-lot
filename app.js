const config = require('./config')
const express = require('express')

const ParkingLot = require('./lib/ParkingLot')

const parkingLot = new ParkingLot(process.env.PARKING_LOT_SIZE)
