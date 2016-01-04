'use strict';

/**
 * Checks if value is a natural number (non-negative integer)
 *
 * @param {Number} value - Value
 * @returns {Boolean}
 */

function validate(value) {
  return Number.isInteger(value) && value >= 0;
}

module.exports = validate;