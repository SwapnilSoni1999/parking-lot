const getUnixNow = require('../utils/unixNow')

/**
 * Memory storage to track ip addreses
 */
const memory = []

/**
 * Returns remaining cooldown time when rate is limited.
 * @param {number} per time to wait (sec)
 * @param {number} firstReqTime unix timestamp of within limit made second 
 * @returns 
 */
const getRemainingTime = (per, firstReqTime) => Math.abs(getUnixNow() - (firstReqTime + per)) 

/**
 * Limits request on a specific route by IP.
 * @param {number} limit Number of requests to limit (Max requests)
 * @param {number} per time to wait (sec)
 * @param {number} cooldown time to wait till next request (sec)
 */
const rateLimiter = (limit=10, per=10) => {
    return async (req, res, next) => {
        const ip = req.ip
        const existingIp = memory.findIndex(v => v.ip === ip)
        if (existingIp !== -1) {
            // This means Ip exists in memory db
            memory[existingIp].reqCount += 1
            const currentTime = getUnixNow()
            /** reqTime is last request's timestamp. */
            if (memory[existingIp].firstReqTime + per > currentTime) {
                // means the ip is under surveilance (comes under per limit factor)
                if (memory[existingIp].reqCount > limit) {
                    return res.status(429).json({ message: `Too many requests. Please try after ${getRemainingTime(per, memory[existingIp].firstReqTime)} seconds.` })
                } else {
                    // comes under surveilance with under the limit and no cooldown time
                    next()
                }
            } else {
                // cooldown is over now
                memory[existingIp].reqCount = 1
                // memory[existingIp].reqTime = getUnixNow()
                memory[existingIp].firstReqTime = getUnixNow()
                next()
            }
        } else {
            // this is a new ip
            memory.push({ ip, reqCount: 1, firstReqTime: getUnixNow() })
            next()
        }
    }
}

module.exports = rateLimiter
