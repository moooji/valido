'use strict';

/**
 * Checks if value is a finite number
 *
 * @param {Number} value - Value
 * @returns {Boolean}
 */
function validate(value) {
  return Number.isFinite(value);
}

module.exports = validate;
