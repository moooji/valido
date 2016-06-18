'use strict';

/**
 * Checks if value is null or undefined
 *
 * @param {*} value - Value
 * @returns {Boolean}
 */
function validate(value) {
  return value !== null && value !== undefined;
}

module.exports = validate;
