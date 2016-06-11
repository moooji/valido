'use strict';

var isUrl = require('./validators/url');
var isUri = require('./validators/uri');
var isWebUrl = require('./validators/webUrl');
var isHexColor = require('./validators/hexColor');
var isString = require('./validators/string');
var isArray = require('./validators/array');
var isNull = require('./validators/null');
var isUndefined = require('./validators/undefined');
var isExisty = require('./validators/existy');
var isInteger = require('./validators/integer');
var isFinite = require('./validators/finite');
var isNatural = require('./validators/natural');
var isBuffer = require('./validators/buffer');
var isBoolean = require('./validators/boolean');
var isFunction = require('./validators/function');
var isPlainObject = require('./validators/plainObject');
var isDate = require('./validators/date');

var validators = {
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
Object.getOwnPropertyNames(validators).forEach(function (validatorName) {
  var validator = validators[validatorName];
  api[validatorName] = validator;
  api.all[validatorName] = function (values, options) {
    return validateAll(values, validator, options);
  };
  api.optional[validatorName] = function (value, options) {
    return validateOptional(value, validator, options);
  };
});

/**
 * Validates a list of values
 *
 * @param {Array<*>} values - Values
 * @param {function} validator - Validator
 * @param {object} options - Options
 * @returns {Boolean}
 */
function validateAll(values, validator, options) {
  if (!isArray(values)) {
    return false;
  }

  return values.every(function (value) {
    return validator(value, options);
  });
}

/**
 * Validates an optional values
 * An optional value will always validate to true if null/undefined
 *
 * @param {*} value - Value
 * @param {function} validator - Validator
 * @param {object} options - Options
 * @returns {Boolean}
 */
function validateOptional(value, validator, options) {
  if (isExisty(value)) {
    return true;
  }

  return validator(value, options);
}

module.exports = api;