const { NoParkingSlot, NotFoundError, EmptySlot, AlreadyParked } = require('./error')
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
        return Math.floor(Math.random() * this.size+1)
    }

    /**
     * @private
     * @returns {number|string} slotId
     */
    _getEmptySlot() {
        let slotId = new Number()
        do {
            slotId = this._generateSlotId()
            if (this.cars[slotId]) {
                console.log('Slot already filled! Getting new slot!')
            }
        } while(this.cars[slotId] || slotId == 0);
        return slotId
    }

    /**
     * returns car info by carName
     * @private
     * @returns {[slotId, carName]} 
     */
    _getCarByValue(carName) {
        const cars = Object.entries(this.cars)
        if (!cars.length) {
            return
        }
        return Object.entries(this.cars)?.find(([slotId, cn]) => cn === carName ? slotId: null)
    }

    /**
     * parks a car in available slot
     * @param {string} carName Alphanumeric car name
     * @returns {object} { carName, slotId }
     */
    park(carName) {
        if (Object.keys(this.cars).length >= this.size) {
            throw new NoParkingSlot('Slots are full!')
        }
        const car = this._getCarByValue(carName)
        if(car) {
            throw new AlreadyParked('Same car is already parked!', Number(car[0]))
        }

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
            if (!this.cars[slotId]) {
                throw new EmptySlot('This parking slot is already empty!')
            }
            delete this.cars[slotId]
            return
        }
        if (carName) {
            const car = this._getCarByValue(carName)
            if (!car) {
                throw new NotFoundError('This parking slot is already empty!')
            }
            const [_slotId, _carName] = car
            delete this.cars[_slotId]
        }
    }

    /**
     * get car info by slot id
     * @param {number|string} slotId slot id
     * @returns information of parked car
     */
    getInfoBySlotId(slotId) {
        if (!this.cars[slotId]) {
            throw new NotFoundError('No car is parked in this slot!')
        }
        return { slot_id: slotId, car_number: this.cars[slotId] }
    }

    getInfoByCarNumber(carName) {
        const car = this._getCarByValue(carName)
        if (!car) {
            throw new NotFoundError('No car is parked in this slot!')
        }
        const [_slotId, _carName] = car
        return { slot_id: _slotId, car_number: _carName }
    }
}

module.exports = ParkingLot
