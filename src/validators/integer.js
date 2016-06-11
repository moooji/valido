'use strict';

/**
 * Checks if value is an integer
 *
 * @param {Number} value - Value
 * @returns {Boolean}
 */
function validate(value) {
  return Number.isInteger(value);
}

module.exports = validate;
