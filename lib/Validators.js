const { ValidationError } = require("./error")

/**
* Checks if number is alphanumeric or not
* with Uppercase alphabets only
* @private
* @returns {boolean}
*/
const isAlNum = (val) => {
   const alnum = /^[A-Z0-9]+$/i
   if (alnum.test(val)) {
       return true
   } else {
       throw new ValidationError('Not an alphanumeric value or does contain a lowercase character!')
   }
}

module.exports = { isAlNum }
