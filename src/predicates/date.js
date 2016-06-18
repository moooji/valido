'use strict';

/**
 * Checks if value is a date object
 *
 * @param {Date} value - Value
 * @returns {Boolean}
 */
function validate(value) {
  // Basic check for Type object that's not null
  if (typeof value === 'object' && value !== null) {
    return Object.getPrototypeOf(value) === Date.prototype;
  }

  return false;
}

module.exports = validate;
