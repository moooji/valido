'use strict';

/**
 * Checks if value is a natural number (non-negative integer)
 *
 * @param {Number} value - Value
 * @returns {Boolean}
 */
function validate(value, options) {
  const notZero = options && options.notZero;
  return Number.isInteger(value) && isPositive(value, notZero);
}

function isPositive(value, notZero) {
  if (notZero) {
    return value > 0;
  }

  return value >= 0;
}

module.exports = validate;
