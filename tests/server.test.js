require('../config')
const app = require('../app')
const request = require('supertest')(app)

const cars = []
function generateCarIds(length=5) {
    const alphabets = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    const numbers = '1234567890'
    const chars = alphabets + numbers
    let ret = chars.charAt(Math.floor(Math.random() * alphabets.length))
    for (let i=0; i<length; i++) {
        ret += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    return ret
}

test('Generate car data', () => {
    for (let i=0; i<process.env.PARKING_LOT_SIZE; i++) {
        cars.push(generateCarIds())
    }
})

const parked = []

test('Park cars', async () => {
    for (const carId of cars) {
        const res = await request
            .post('/api/v1/park')
            .send({ car_number: carId })
        expect(res.status).toEqual(200)
        expect(res.body).toHaveProperty('slot_id')
        expect(res.body.car_number).toEqual(carId)
        parked.push(res.body.slot_id)
    }
})

test('Check overflow', async () => {
    const carId = generateCarIds(6)
    const res = await request
        .post('/api/v1/park')
        .send({ car_number: carId })
    expect(res.status).toEqual(409)
    expect(res.body.type).toBe('NoParkingSlotError')
})

test('Get Info of parked cars by slot id', async () => {
    for (const slotId of parked) {
        const res = await request
            .get('/api/v1/get-info')
            .query({ slot_number: slotId })
        expect(res.status).toEqual(200)
        expect(res.body).toHaveProperty('slot_id')
        expect(res.body.slot_id).toEqual(slotId)
        expect(res.body).toHaveProperty('car_number')
    }
})

test('Get Info of parked cars by car number', async () => {
    for (const car_number of cars) {
        const res = await request
            .get('/api/v1/get-info')
            .query({ car_number })
        expect(res.status).toEqual(200)
        expect(res.body).toHaveProperty('slot_id')
        expect(res.body).toHaveProperty('car_number')
        expect(res.body.car_number).toEqual(car_number)
    }
})

test('Unpark all', async () => {
    for (const slotId of parked) {
        const res = await request
            .delete(`/api/v1/unpark/${slotId.toString()}`)
        expect(res.status).toEqual(200)
    }
})

// test('Check occupied', async () => {
//     let skipFirst = true
//     for (const carId of cars) {
//         if (skipFirst) {
//             skipFirst = false
//             continue
//         }
//         const res = await request
//             .post('/api/v1/park')
//             .send({ car_number: carId })
//         expect(res.status).toEqual(409)
//         expect(res.body.type).toBe('AlreadyParkedError')
//         expect(res.body).toHaveProperty('slotId')
//     }
// })
