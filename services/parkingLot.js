const ParkingLot = require('./lib/ParkingLot')

const parkingLot = new ParkingLot(process.env.PARKING_LOT_SIZE)

module.exports = parkingLot