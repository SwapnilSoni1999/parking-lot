const { Router } = require('express')

const Car = require('../../../controllers/Car')
const catchAsync = require('../../../utils/catchAsync')

const router = Router()

router.route('/park').post(catchAsync(Car.park))

module.exports = router
