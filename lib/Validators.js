/**
* Checks if number is alphanumeric or not
* @private
* @returns {boolean}
*/
const isAlNum = (val) => {
   const alnum = /^[a-z0-9]+$/i
   if (alnum.test(val)) {
       return true
   } else {
       throw new Error('Not an alphanumeric value!')
   }
}

module.exports = { isAlNum }
