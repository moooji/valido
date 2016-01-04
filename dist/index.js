'use strict';

var isUrl = require('./validators/isUrl');
var isWebUrl = require('./validators/isWebUrl');
var isHexColor = require('./validators/isHexColor');
var isString = require('./validators/isString');
var isArray = require('./validators/isArray');
var isNull = require('./validators/isNull');
var isUndefined = require('./validators/isUndefined');
var isNullOrUndefined = require('./validators/isNullOrUndefined');
var isInteger = require('./validators/isInteger');
var isFinite = require('./validators/isFinite');
var isNatural = require('./validators/isNatural');

var validators = {
  isUrl: isUrl,
  isWebUrl: isWebUrl,
  isHexColor: isHexColor,
  isString: isString,
  isArray: isArray,
  isNull: isNull,
  isUndefined: isUndefined,
  isNullOrUndefined: isNullOrUndefined,
  isInteger: isInteger,
  isFinite: isFinite,
  isNatural: isNatural
};

var api = { every: {}, optional: {} };

// Build API
Object.getOwnPropertyNames(validators).forEach(function (validatorName) {
  var validator = validators[validatorName];
  api[validatorName] = validator;
  api.every[validatorName] = function (values, options) {
    return validateEvery(values, validator, options);
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
function validateEvery(values, validator, options) {
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
  if (isNullOrUndefined(value)) {
    return true;
  }

  return validator(value, options);
}

module.exports = api;