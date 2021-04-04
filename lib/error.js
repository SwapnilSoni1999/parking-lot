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

class NotFoundError extends Error {
    constructor(message) {
        super(message)
        this.name = "NotFoundError"
    }
}

class EmptySlot extends Error {
    constructor(message) {
        super(message)
        this.name = "SlotEmpty"
    }
}

class AlreadyParked extends Error {
    constructor(message, where) {
        super(message)
        this.name = "AlreadyParkedError"
        this.slotId = where
    }
}

module.exports = { ValidationError, NoParkingSlot, FieldRequired, NotFoundError, EmptySlot, AlreadyParked }
