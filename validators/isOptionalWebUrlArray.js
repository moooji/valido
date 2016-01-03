'use strict';

const _ = require('lodash');
const isWebUrl = require('./isWebUrl').validate;

/**
 * Checks is value is an array of URLs (optional)
 * Returns true for empty arrays
 * @param {Array<String>} urls
 * @returns {Boolean}
 */

function validate(urls) {

  // Not an array - False
  if (!Array.isArray(urls)) {
    return false;
  }

  // Empty array - True
  if (urls.length === 0) {
    return true;
  }

  // Array of URLs
  return _.every(urls, (url) => {
    return isWebUrl(url);
  });
}

const tests = [
  {value: null, result: false},
  {value: undefined, result: false},
  {value: '', result: false},
  {value: 1, result: false},
  {value: 'abc', result: false},
  {value: {}, result: false},
  {value: [''], result: false},
  {value: [123], result: false},
  {value: ['abc'], result: false},
  {value: [{}], result: false},
  {value: [], result: true},
  {
    value: [
      'http://www.google.com',
      'https://pass:bob@www.google.com:8080/index.html?param=2&yy=abc'
    ], result: true
  }
];

module.exports = {
  validate: validate,
  tests: tests
};
