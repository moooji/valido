'use strict';

/**
 * Checks if value is a natural number (non-negative integer)
 *
 * @param {Number} value - Value
 * @returns {Boolean}
 */
function validate(value, options) {
  const disallowZero = options && options.disallowZero;
  return Number.isInteger(value) && isPositive(value, disallowZero);
}

function isPositive(value, disallowZero) {
  if (disallowZero) {
    return value > 0;
  }

  return value >= 0;
}

module.exports = validate;
