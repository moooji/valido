'use strict';

/**
 * Checks if value is an integer
 *
 * @param {Number} value - Value
 * @returns {Boolean}
 */

function validate(value) {
  return Number.isInteger(value);
}

var tests = [{ value: null, result: false }, { value: undefined, result: false }, {
  value: function value() {}, result: false
}, { value: '', result: false }, { value: '1', result: false }, { value: 1, result: true }, { value: 1.1, result: false }, { value: -1, result: true }, { value: -1.1, result: false }, { value: Math.PI, result: false }, { value: NaN, result: false }, { value: Infinity, result: false }, { value: -Infinity, result: false }, { value: 2e64, result: true }, { value: Math.pow(2, 2) - 1, result: true }];

module.exports = { validate: validate, tests: tests };