'use strict';

/**
 * Checks if value is undefined
 *
 * @param {*} value - Value
 * @returns {Boolean}
 */

function validate(value) {
  return value === undefined;
}

var tests = [{ value: null, result: false }, { value: undefined, result: true }, {
  value: function value() {}, result: false
}, { value: 1, result: false }, { value: [], result: false }, { value: '', result: false }, { value: 'abc', result: false }];

module.exports = { validate: validate, tests: tests };