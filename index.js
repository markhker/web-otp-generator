/**
 * Generate password from allowed word
 */

const digits = '0123456789'
const lowerCaseAlphabets = 'abcdefghijklmnopqrstuvwxyz'
const upperCaseAlphabets = lowerCaseAlphabets.toUpperCase()
const specialChars = '#!&@'

function getRandomInt (min, max) {
  let randomInt
  if (typeof crypto !== 'undefined' && crypto && crypto.getRandomValues) { // eslint-disable-line
    const range = max - min
    const randomBytes = new Uint8Array(1)
    crypto.getRandomValues(randomBytes) // eslint-disable-line
    const randomNumber = randomBytes[0]

    randomInt = Math.floor((randomNumber / 256) * range) + min
  } else if (typeof require !== 'undefined') {
    const crypto = require('crypto')
    randomInt = crypto.randomInt(min, max)
  } else {
    throw new Error('Unsupported environment: this code needs either the Web Crypto API or Node.js crypto module')
  }

  return randomInt
}

module.exports = {
  /**
   * Generate OTP of the length
   * @param  {number} length length of password.
   * @param  {object} options
   * @param  {boolean} options.digits Default: `true` true value includes digits in OTP
   * @param  {boolean} options.lowerCaseAlphabets Default: `true` true value includes lowercase alphabets in OTP
   * @param  {boolean} options.upperCaseAlphabets Default: `true` true value includes uppercase alphabets in OTP
   * @param  {boolean} options.specialChars Default: `true` true value includes specialChars in OTP
   */
  generate: function (length, options) {
    length = length || 10
    const generateOptions = options || {}

    generateOptions.digits = Object.prototype.hasOwnProperty.call(generateOptions, 'digits') ? options.digits : true
    generateOptions.lowerCaseAlphabets = Object.prototype.hasOwnProperty.call(generateOptions, 'lowerCaseAlphabets') ? options.lowerCaseAlphabets : true
    generateOptions.upperCaseAlphabets = Object.prototype.hasOwnProperty.call(generateOptions, 'upperCaseAlphabets') ? options.upperCaseAlphabets : true
    generateOptions.specialChars = Object.prototype.hasOwnProperty.call(generateOptions, 'specialChars') ? options.specialChars : true

    const allowsChars = ((generateOptions.digits || '') && digits) +
      ((generateOptions.lowerCaseAlphabets || '') && lowerCaseAlphabets) +
      ((generateOptions.upperCaseAlphabets || '') && upperCaseAlphabets) +
      ((generateOptions.specialChars || '') && specialChars)
    let password = ''
    while (password.length < length) {
      const charIndex = getRandomInt(0, allowsChars.length)
      if (password.length === 0 && generateOptions.digits === true && allowsChars[charIndex] === '0') {
        continue
      }
      password += allowsChars[charIndex]
    }
    return password
  }
}
