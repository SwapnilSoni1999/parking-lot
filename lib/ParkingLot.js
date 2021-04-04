const { NoParkingSlot } = require('./error')
const { isAlNum, startsWithAlphabet } = require('./Validators')

/**
 * @class Parking Lot 
 * @param  {number} size
 */
class ParkingLot {
    constructor(size) {
        console.log(`Creating a parking lot with size of ${size}...`)
        this.slots = new Array(size).fill().map((_, i) => i)
        this.unavailable = []
        this.cars = {}
    }

    /**
     * @private
     * @returns {number|string} slotId
     */
    _getEmptySlot() {
        const slotId = this.slots.shift()
        return slotId
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
            this.unavailable.push(slotId)
            this.cars[slotId] = carName
            return { carName, slotId }
        }
    }

    /**
     * Deletes slotId from unavailable array
     * @private
     * @param {number|string} slotId 
     */
    _acquireSlot(slotId) {
        const pos = this.unavailable.findIndex(sid => slotId === sid)
        this.unavailable.splice(pos, 1)
        this.slots.push(slotId)
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
     * Unparks the car by slotId or carName
     * @param {number|string} slotId 
     * @param {string} carName 
     */
    unpark(slotId, carName) {
        if (slotId) {
            delete this.cars[slotId]
            this._acquireSlot(slotId)
            return
        }
        if (carName) {
            const [_slotId, _carName] = 
            delete this.cars[_slotId]
            this._acquireSlot(slotId)
        }
    }

    /**
     * @returns unavailable parking slots
     */
    getParkedSlots() {
        return this.unavailable
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
