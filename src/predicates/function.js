'use strict';

/**
 * Checks if value is a function
 *
 * @param {Function} value - Value
 * @returns {Boolean}
 */
function validate(value) {
  return typeof value === 'function';
}

module.exports = validate;
