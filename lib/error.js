class ValidationError extends Error {
    constructor(message) {
        super(message)
        this.name = "ValidationError"
    }
}

class NoParkingSlot extends Error {
    constructor(message) {
        super(message)
        this.name = "NoParkingSlotError"
    }
}

class FieldRequired extends Error {
    constructor(message) {
        super(message)
        this.name = "MissingFieldError"
    }
}

module.exports = { ValidationError, NoParkingSlot }
