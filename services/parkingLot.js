const ParkingLot = require('../lib/ParkingLot')

/**
 * To initialize parking lot by getting size from .env file
 */
const parkingLot = new ParkingLot(process.env.PARKING_LOT_SIZE)

module.exports = parkingLot