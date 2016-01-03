'use strict';

/**
 * Checks if value is null
 *
 * @param {*} value - Value
 * @returns {Boolean}
 */

function validate(value) {
  return value === null;
}

const tests = [
  { value: null, result: true },
  { value: undefined, result: false },
  {
    value: () => {
    }, result: false
  },
  { value: 1, result: false },
  { value: [], result: false },
  { value: '', result: false },
  { value: 'abc', result: false }
];

module.exports = { validate, tests };
