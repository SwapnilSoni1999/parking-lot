const { ValidationError, NoParkingSlot, NotFoundError } = require("../lib/error")

const errorController = (err, _, res, _next) => {
    if (err instanceof ValidationError) {
        return res.status(422).json({ message: err.message, type: err.name })
    }

    if (err instanceof NoParkingSlot) {
        return res.status(409).json({ message: err.message, type: err.name })
    }

    if (err instanceof NotFoundError) {
        return res.status(404).json({ message: err.message, type: err.name })
    }

    return res.status(500).json({ message: "Internal server error!" })
}

module.exports = errorController
