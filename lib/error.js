class ValidationError extends Error {
    constructor(message) {
        super(message)
        this.name = "ValidationError"
        this.message = message
    }
}

class NoParkingSlot extends Error {
    constructor(message) {
        super(message)
        this.name = "NoParkingSlotError"
        this.message = message
    }
}

module.exports = { ValidationError, NoParkingSlot }
