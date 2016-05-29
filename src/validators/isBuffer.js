'use strict';

/**
 * Checks if value is a buffer
 *
 * @param {Buffer} value - Value
 * @returns {Boolean}
 */
function validate(value) {
  return Buffer.isBuffer(value);
}

module.exports = validate;
