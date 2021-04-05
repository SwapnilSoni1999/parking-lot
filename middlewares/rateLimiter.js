const getUnixNow = require('../utils/unixNow')
/**
 * Memory storage to track ip addreses
 */
const memory = []

/**
 * Calculates remaining time for given limit and last request
 * @param {number} per time limit to make request
 * @param {number} lastReqUnix last request's unix timestamp
 * @returns {number} remaining seconds
 */
const getRemainingTime = (per, lastReqUnix) => Math.abs(getUnixNow() - (lastReqUnix + per))

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
            if (memory[existingIp].reqTime + per > currentTime) {
                // means the ip is under surveilance (comes under per limit factor)
                if (memory[existingIp].reqCount > limit) {
                    return res.status(429).json({ message: `Too many requests. Please try after ${getRemainingTime(per, memory[existingIp].reqTime)} seconds.` })
                } else {
                    // comes under surveilance with under the limit and no cooldown time
                    memory[existingIp].reqTime = getUnixNow()
                    next()
                }
            } else {
                // cooldown is over now
                memory[existingIp].reqCount = 1
                memory[existingIp].reqTime = getUnixNow()
                next()
            }
        } else {
            // this is a new ip
            memory.push({ ip, reqCount: 1, reqTime: getUnixNow() })
            next()
        }
    }
}

module.exports = rateLimiter
