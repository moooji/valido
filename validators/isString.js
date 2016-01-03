'use strict';

/**
 * Checks if value is an array
 *
 * @param {String} value - Value
 * @returns {Boolean}
 */

function validate(value) {
  return value instanceof String || typeof value === 'string';
}

const tests = [
  { value: null, result: false },
  { value: undefined, result: false },
  {
    value: () => {
    }, result: false
  },
  { value: 1, result: false },
  { value: [], result: false },
  { value: '', result: true },
  { value: 'abc', result: true },
  { value: 'abc' + 123, result: true }
];

module.exports = { validate, tests };
