const isString = require('./string');

// https://www.w3.org/TR/html5/forms.html#valid-e-mail-address
const re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/; // eslint-disable-line max-len

/**
 * Checks if string is a valid email
 * @param {String} value - Value
 * @param {object} [options] - Additional options
 * @returns {Boolean}
 */

function validate(value, options) {
  if (!isString(value)) {
    return false;
  }

  let isEmail = value.match(re) !== null;

  if (!options) {
    return isEmail;
  }

  // Optional checks
  if (options.endsWith && !value.endsWith(options.endsWith)) {
    isEmail = false;
  }

  if (options.startsWith && !value.startsWith(options.startsWith)) {
    isEmail = false;
  }

  return isEmail;
}

module.exports = validate;
