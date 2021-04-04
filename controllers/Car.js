const { FieldRequired } = require('../lib/error')
const parkingLot = require('../services/parkingLot')

class Car {
    /**
     * Express: Park Route Controller
     * @param {Express.Request} req 
     * @param {Express.Response} res
     */
    static async park(req, res, next) {
        // ref: carName
        const { car_number } = req.body
        const parkedData = parkingLot.park(car_number)
        return res.json({ message: "Parked car!", ...parkedData })
    }

    static async unpark(req, res, next) {
        const { slotId } = req.params
        parkingLot.unpark(slotId)
        return res.json({ message: "Unparked car!" })
    }

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
}

module.exports = Car
