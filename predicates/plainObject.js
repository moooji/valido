'use strict';

/**
 * Checks if value is a plain object
 * Based on: http://stackoverflow.com/questions/5876332/how-can-i-differentiate-between-an-object-literal-other-javascript-objects
 *
 * @param {Object} value - Value
 * @returns {Boolean}
 */
function validate(value) {
  // Basic check for Type object that's not null
  if (typeof value === 'object' && value !== null) {
    const proto = Object.getPrototypeOf(value);
    return proto === Object.prototype || proto === null;
  }

  return false;
}

module.exports = validate;
