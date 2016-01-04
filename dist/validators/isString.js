'use strict';

/**
 * Checks if value is an array
 *
 * @param {String} value - Value
 * @param {object} options - Options
 * @returns {Boolean}
 */

function validate(value, options) {
  var isString = value instanceof String || typeof value === 'string';

  if (!options) {
    return isString;
  }

  // Optional checks
  if (options.endsWith && !value.endsWith(options.endsWith)) {
    isString = false;
  }

  if (options.startsWith && !value.startsWith(options.startsWith)) {
    isString = false;
  }

  return isString;
}

var tests = [{ value: null, result: false }, { value: undefined, result: false }, {
  value: function value() {}, result: false
}, { value: 1, result: false }, { value: [], result: false }, { value: '', result: true }, { value: 'abc', result: true }, { value: 'abc' + 123, result: true }, { value: 'abc', options: { startsWith: 'a' }, result: true }, { value: 'abc', options: { startsWith: 'b' }, result: false }, { value: 'abc', options: { endsWith: 'c' }, result: true }, { value: 'abc', options: { endsWith: 'd' }, result: false }, { value: 'abc', options: { startsWith: 'b', endsWith: 'c' }, result: false }, { value: 'abc', options: { startsWith: 'a', endsWith: 'd' }, result: false }, { value: 'abc', options: { startsWith: 'a', endsWith: 'c' }, result: true }];

module.exports = { validate: validate, tests: tests };