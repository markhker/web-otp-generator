/**
 * Generate password from allowed word
 */
const crypto = require('crypto-js')

const digits = '0123456789'
const lowerCaseAlphabets = 'abcdefghijklmnopqrstuvwxyz'
const upperCaseAlphabets = lowerCaseAlphabets.toUpperCase()
const specialChars = '#!&@'

function getRandomInt(min, max) {
  const range = max - min;

  const randomBytes = new Uint8Array(1);
  crypto.getRandomValues(randomBytes);
  const randomNumber = randomBytes[0];

  const randomInt = Math.floor((randomNumber / 256) * (range + 1)) + min;

  return randomInt;
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
  generate(length = 10, options = {}) {
    const {
      digits: optDigits = true,
      lowerCaseAlphabets: optLowerCase = true,
      upperCaseAlphabets: optUpperCase = true,
      specialChars: optSpecialChars = true,
    } = options;

    const allowsChars =
      (optDigits ? digits : '') +
      (optLowerCase ? lowerCaseAlphabets : '') +
      (optUpperCase ? upperCaseAlphabets : '') +
      (optSpecialChars ? specialChars : '');

    let password = ''
    while (password.length < length) {
      const charIndex = getRandomInt(0, allowsChars.length)
      if (password.length === 0 && optDigits && allowsChars[charIndex] === '0') {
        continue
      }
      password += allowsChars[charIndex]
    }
    return password
  }
}
