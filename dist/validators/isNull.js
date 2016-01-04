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

var tests = [{ value: null, result: true }, { value: undefined, result: false }, {
  value: function value() {}, result: false
}, { value: 1, result: false }, { value: [], result: false }, { value: '', result: false }, { value: 'abc', result: false }];

module.exports = { validate: validate, tests: tests };