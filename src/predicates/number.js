'use strict';

/**
 * Checks if value is a number
 *
 * @param {Number} value - Value
 * @returns {Boolean}
 */
function validate(value) {
  return typeof value === 'number';
}

module.exports = validate;
