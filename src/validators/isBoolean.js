'use strict';

/**
 * Checks if value is a boolean
 *
 * @param {Boolean} value - Value
 * @returns {Boolean}
 */
function validate(value) {
  return typeof value === 'boolean';
}

module.exports = validate;
