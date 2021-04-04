const { isAlNum } = require('./Validators')

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
        if (this.isAlNum(carName)) {
            const slotId = this._getEmptySlot()
            if (!slotId) {
                throw new Error(`No empty slots found!`)
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
            const [_slotId, _carName] = Object.entries(this.cars).find(([slotId, cn]) => cn === carName ? slotId: null)
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
}

module.exports = ParkingLot
