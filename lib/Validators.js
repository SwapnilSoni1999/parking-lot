const { ValidationError } = require("./error")

const alnum = /^[A-Z0-9]+$/g
const alphabets = /^[A-Z]/g

/**
* Checks if number is alphanumeric or not
* with Uppercase alphabets only
* @returns {boolean}
*/
const isAlNum = (val) => {
   if (alnum.test(val)) {
       return true
   } else {
       throw new ValidationError('Not an alphanumeric value or does contain a lowercase character!')
   }
}

/**
 * checks if the first letter is alphabet or not
 * @returns {boolean}
 */
const startsWithAlphabet = (val) => {
    if (alphabets.test(val[0])) {
        return true
    } else {
        throw new ValidationError('Car number should start with an alphabet.')
    }
}

module.exports = { isAlNum, startsWithAlphabet }
