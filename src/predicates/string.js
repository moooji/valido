'use strict';

/**
 * Checks if value is an array
 *
 * @param {String} value - Value
 * @param {object} [options] - Options
 * @returns {Boolean}
 */
function validate(value, options) {
  let isString = value instanceof String || typeof value === 'string';

  if (!options) {
    return isString;
  }

  // Optional checks
  if (options.endsWith && !value.endsWith(options.endsWith)) {
    isString = false;
  }

  if (options.startsWith && !value.startsWith(options.startsWith)) {
    isString = false;
  }

  return isString;
}

module.exports = validate;
