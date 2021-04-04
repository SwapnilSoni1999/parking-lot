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
}

module.exports = Car
