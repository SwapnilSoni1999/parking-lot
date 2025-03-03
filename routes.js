const { Router } = require('express')

const router = Router()

const carRoute = require('./routes/api/v1/car')

router.use('/v1', carRoute)

module.exports = router
