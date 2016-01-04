'use strict';

const isString = require('./isString').validate;

// Based on
// https://gist.github.com/o5/6cb4b0178c5a509cad03

const re = new RegExp(
  '^' +

    // protocol identifier
  '(?:(?:https?|ftp)://)' +

    // user:pass authentication
  '(?:\\S+(?::\\S*)?@)?' +
  '(?:' +

    // IP address exclusion
    // private & local networks
  '(?!(?:10|127)(?:\\.\\d{1,3}){3})' +
  '(?!(?:169\\.254|192\\.168)(?:\\.\\d{1,3}){2})' +
  '(?!172\\.(?:1[6-9]|2\\d|3[0-1])(?:\\.\\d{1,3}){2})' +

    // IP address dotted notation octets
    // excludes loopback network 0.0.0.0
    // excludes reserved space >= 224.0.0.0
    // excludes network & broacast addresses
    // (first & last IP address of each class)
  '(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])' +
  '(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}' +
  '(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))' +
  '|' +

    // host name
  '(?:(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)' +

    // domain name
  '(?:\\.(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)*' +

    // TLD identifier
  '(?:\\.(?:[a-z\\u00a1-\\uffff]{2,}))' +

    // TLD may end with dot
  '\\.?' +
  ')' +

    // port number
  '(?::\\d{1,5})?' +

    // resource path
  '(?:[/?#]\\S*)?' +
  '$', 'i'
);

/**
 * Checks if string is a valid url
 * @param {String} value - Value
 * @param {object} [options] - Additional options
 * @returns {Boolean}
 */

function validate(value, options) {
  if (!isString(value)) {
    return false;
  }

  let isWebUrl = value.match(re) !== null;

  if (!options) {
    return isWebUrl;
  }

  // Optional checks
  if (options.endsWith && !value.endsWith(options.endsWith)) {
    isWebUrl = false;
  }

  if (options.startsWith && !value.startsWith(options.startsWith)) {
    isWebUrl = false;
  }

  return isWebUrl;
}

const tests = [
  { value: null, result: false },
  { value: undefined, result: false },
  {
    value: () => {
    }, result: false
  },
  { value: '', result: false },
  { value: 1, result: false },
  { value: 'abc', result: false },
  { value: {}, result: false },
  { value: [], result: false },
  { value: 'http://', result: false },
  { value: '/index.html', result: false },
  { value: 'google.com', result: false },
  { value: 'https://127.0.0.1:3128', result: false },
  { value: 'https://8.8.8.8.8:3128', result: false },
  { value: 'mongodb://www.google.com', result: false },
  { value: 'http://www.google.com', result: true },
  { value: 'http://google.com', result: true },
  { value: 'https://www.google.com', result: true },
  { value: 'https://8.8.8.8:3128', result: true },
  { value: 'https://pass:bob@www.google.com:8080/index.html?param=2&yy=abc', result: true },
  { value: 'https://www.google.com', options: { endsWith: '/' }, result: false },
  { value: 'https://www.google.com/', options: { endsWith: '/' }, result: true },
  { value: 'https://www.google.com', options: { startsWith: 'https://www.ebay' }, result: false },
  { value: 'https://www.google.com/', options: { startsWith: 'https://www.google' }, result: true },
  { value: 'https://www.google.com/', options: { startsWith: 'https://www.google', endsWith: '/' }, result: true },
  { value: 'https://www.google.com', options: { startsWith: 'https://www.google', endsWith: '/' }, result: false },
  { value: 'https://www.google.com/', options: { startsWith: 'https://www.ebay', endsWith: '/' }, result: false }
];

module.exports = { validate, tests };