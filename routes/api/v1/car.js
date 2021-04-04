const { Router } = require('express')

const Car = require('../../../controllers/Car')
const catchAsync = require('../../../utils/catchAsync')

const router = Router()

router.route('/park').post(catchAsync(Car.park))
router.route('/unpark/:slotId').delete(catchAsync(Car.unpark))
router.route('/get-info').get(catchAsync(Car.getInfo))

module.exports = router
