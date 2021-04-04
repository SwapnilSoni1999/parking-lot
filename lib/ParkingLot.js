const { NoParkingSlot } = require('./error')
const { isAlNum, startsWithAlphabet } = require('./Validators')

/**
 * @class Parking Lot 
 * @param  {number} size
 */
class ParkingLot {
    constructor(size) {
        console.log(`Creating a parking lot with size of ${size}...`)
        this.size = size
        this.cars = {}
    }

    /**
     * Generates a slot id within given size
     * @private
     * @returns 
     */
    _generateSlotId() {
        return Math.floor(Math.random() * this.size)
    }

    /**
     * @private
     * @returns {number|string} slotId
     */
    _getEmptySlot() {
        let slotId = new Number()
        do {
            slotId = this._generateSlotId()
        } while(this.cars[slotid]);
        return slotId
    }

    /**
     * returns car info by carName
     * @private
     * @returns {[slotId, carName]} 
     */
    _getCarByValue(carName) {
        return Object.entries(this.cars).find(([slotId, cn]) => cn === carName ? slotId: null)
    }

    /**
     * parks a car in available slot
     * @param {string} carName Alphanumeric car name
     * @returns {object} { carName, slotId }
     */
     park(carName) {
        if (isAlNum(carName) && startsWithAlphabet(carName)) {
            const slotId = this._getEmptySlot()
            if (!slotId) {
                throw new NoParkingSlot(`No empty slots found!`)
            }
            this.cars[slotId] = carName
            return { carName, slotId }
        }
    }

    /**
     * Unparks the car by slotId or carName
     * @param {number|string} slotId 
     * @param {string} carName 
     */
    unpark(slotId, carName) {
        if (slotId) {
            delete this.cars[slotId]
            return
        }
        if (carName) {
            const [_slotId, _carName] = this._getCarByValue(carName)
            delete this.cars[_slotId]
        }
    }

    /**
     * get car info by slot id
     * @param {number|string} slotId slot id
     * @returns information of parked car
     */
    getInfoBySlotId(slotId) {
        return { slot_id: slotId, car_number: this.cars[slotId] }
    }

    getInfoByCarNumber(carName) {
        const [_slotId, _carName] = this._getCarByValue(carName)
        return { slot_id: _slotId, car_number: _carName }
    }
}

module.exports = ParkingLot
