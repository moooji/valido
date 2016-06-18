const re = require('../lib/rfc3986');
const isString = require('./string');

/**
 * Checks if string is a valid uri
 * @param {String} value - Value
 * @param {object} [options] - Additional options
 * @returns {Boolean}
 */

function validate(value, options) {
  if (!isString(value)) {
    return false;
  }

  let isUri = value.match(re) !== null;

  if (!options) {
    return isUri;
  }

  // Optional checks
  if (options.endsWith && !value.endsWith(options.endsWith)) {
    isUri = false;
  }

  if (options.startsWith && !value.startsWith(options.startsWith)) {
    isUri = false;
  }

  return isUri;
}

module.exports = validate;
