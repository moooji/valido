'use strict';

const _ = require('lodash');
const re = /^#([0-9A-F]{3}|[0-9A-F]{6})$/i;

/**
 * Checks if value is a hex color like #FFAABB
 * @param {String} hexColor
 * @returns {Boolean}
 */

function validate(hexColor) {

  if (!_.isString(hexColor)) {
    return false;
  }

  return hexColor.match(re) !== null;
}

const tests = [
  {value: null, result: false},
  {value: undefined, result: false},
  {value: function() {}, result: false},
  {value: '', result: false},
  {value: 1, result: false},
  {value: 'FF3333', result: false},
  {value: '#FF33', result: false},
  {value: '#FF33333', result: false},
  {value: '#FF3333', result: true},
  {value: '#FFF', result: true}
];

module.exports = {
  validate: validate,
  tests: tests
};
