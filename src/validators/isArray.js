'use strict';

/**
 * Checks if value is an array
 *
 * @param {Array<*>} value - Value
 * @returns {Boolean}
 */
function validate(value) {
  return Array.isArray(value);
}

module.exports = validate;
