"use strict";

const isString = require("./string");

// Based on
// https://gist.github.com/o5/6cb4b0178c5a509cad03

const re = new RegExp(
  "^" +
    // protocol identifier
    "(?:(?:https?|ftp)://)" +
    // user:pass authentication
    "(?:\\S+(?::\\S*)?@)?" +
    "(?:" +
    // IP address dotted notation octets
    // excludes loopback network 0.0.0.0
    // excludes reserved space >= 224.0.0.0
    // excludes network & broacast addresses
    // (first & last IP address of each class)
    "(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])" +
    "(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}" +
    "(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))" +
    "|" +
    // host name
    "(?:(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)" +
    // domain name
    "(?:\\.(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)*" +
    // TLD identifier
    "(?:\\.(?:[a-z\\u00a1-\\uffff]{2,}))" +
    // TLD may end with dot
    "\\.?" +
    ")" +
    // port number
    "(?::\\d{1,5})?" +
    // resource path
    "(?:[/?#]\\S*)?" +
    "$",
  "i"
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

  let isUrl = value.match(re) !== null;

  if (!options) {
    return isUrl;
  }

  // Optional checks
  if (options.endsWith && !value.endsWith(options.endsWith)) {
    isUrl = false;
  }

  if (options.startsWith && !value.startsWith(options.startsWith)) {
    isUrl = false;
  }

  return isUrl;
}

module.exports = validate;
