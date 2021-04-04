const { FieldRequired, NoParkingSlot } = require('../lib/error')
const parkingLot = require('../services/parkingLot')

/**
 * Express: Park Route Controller
 * @class Car
 */
class Car {
    /**
     * To park car by car_number
     */
    static async park(req, res, next) {
        // ref: carName
        const { car_number } = req.body
        const parkedData = parkingLot.park(car_number)
        return res.json({ message: "Parked car!", ...parkedData })
    }

    /**
     * Unpark car by slot id
     */
    static async unpark(req, res, next) {
        const { slotId } = req.params
        parkingLot.unpark(slotId)
        return res.json({ message: "Unparked car!" })
    }

    /**
     * get car information such as car number and slot id by providing either or both values
     */
    static async getInfo(req, res, next) {
        const { car_number, slot_number } = req.query
        if (!car_number && !slot_number) {
            throw new FieldRequired('Either car_number or slot_number is required!')
        }

        if (slot_number) {
            const carInfo = parkingLot.getInfoBySlotId(slot_number)
            return res.json({ message: "Fetched car info!", ...carInfo })
        }

        if (car_number) {
            const carInfo = parkingLot.getInfoByCarNumber(car_number)
            return res.json({ message: "Fetched car info!", ...carInfo })
        }

    }

    static async moveTo(req, res, next) {
        const { car_number, slot_number } = req.body
        if(!parkingLot.isSpaceAvailable(slot_number)) {
            throw new NoParkingSlot('Space already occupied!')
        } else {
            parkingLot.unpark(null, car_number)
            const parkedData = parkingLot.park(car_number, slot_number)
            return res.json({ message: "Moved car!", ...parkedData })
        }
    }
}

module.exports = Car
