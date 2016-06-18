'use strict';

var isUrl = require('./predicates/url');
var isUri = require('./predicates/uri');
var isWebUrl = require('./predicates/webUrl');
var isHexColor = require('./predicates/hexColor');
var isString = require('./predicates/string');
var isArray = require('./predicates/array');
var isNull = require('./predicates/null');
var isUndefined = require('./predicates/undefined');
var isExisty = require('./predicates/existy');
var isInteger = require('./predicates/integer');
var isFinite = require('./predicates/finite');
var isNatural = require('./predicates/natural');
var isBuffer = require('./predicates/buffer');
var isBoolean = require('./predicates/boolean');
var isFunction = require('./predicates/function');
var isPlainObject = require('./predicates/plainObject');
var isDate = require('./predicates/date');

var predicates = {
  uri: isUri,
  url: isUrl,
  webUrl: isWebUrl,
  hexColor: isHexColor,
  string: isString,
  array: isArray,
  existy: isExisty,
  integer: isInteger,
  finite: isFinite,
  natural: isNatural,
  buffer: isBuffer,
  boolean: isBoolean,
  plainObject: isPlainObject,
  date: isDate,
  null: isNull,
  undefined: isUndefined,
  function: isFunction
};

var api = { all: {}, optional: {} };

// Build API
Object.getOwnPropertyNames(predicates).forEach(function (predicateName) {
  var predicate = predicates[predicateName];
  api[predicateName] = predicate;
  api.all[predicateName] = function (values, options) {
    return validateAll(values, predicate, options);
  };
  api.optional[predicateName] = function (value, options) {
    return validateOptional(value, predicate, options);
  };
});

/**
 * Validates a list of values
 *
 * @param {Array<*>} values - Values
 * @param {function} predicate - predicate
 * @param {object} options - Options
 * @returns {Boolean}
 */
function validateAll(values, predicate, options) {
  if (!isArray(values)) {
    return false;
  }

  return values.every(function (value) {
    return predicate(value, options);
  });
}

/**
 * Validates an optional values
 * An optional value will always validate to true if null/undefined
 *
 * @param {*} value - Value
 * @param {function} predicate - predicate
 * @param {object} options - Options
 * @returns {Boolean}
 */
function validateOptional(value, predicate, options) {
  if (!isExisty(value)) {
    return true;
  }

  return predicate(value, options);
}

module.exports = api;