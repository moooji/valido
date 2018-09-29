'use strict';

const stream = require('stream');

/**
 * Checks if value is a stream
 * Based on: https://github.com/rvagg/isstream
 *
 * @param {Stream} value - Value
 * @returns {Boolean}
 */
function validate(value) {
  return value instanceof stream.Stream;
}

module.exports = validate;
