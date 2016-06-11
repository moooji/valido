'use strict';

const isUrl = require('./validators/url');
const isWebUrl = require('./validators/webUrl');
const isHexColor = require('./validators/hexColor');
const isString = require('./validators/string');
const isArray = require('./validators/array');
const isNull = require('./validators/null');
const isUndefined = require('./validators/undefined');
const isNullOrUndefined = require('./validators/nullOrUndefined');
const isInteger = require('./validators/integer');
const isFinite = require('./validators/finite');
const isNatural = require('./validators/natural');
const isBuffer = require('./validators/buffer');
const isBoolean = require('./validators/boolean');
const isFunction = require('./validators/function');
const isPlainObject = require('./validators/plainObject');
const isDate = require('./validators/date');

const validators = {
  url: isUrl,
  webUrl: isWebUrl,
  hexColor: isHexColor,
  string: isString,
  array: isArray,
  nullOrUndefined: isNullOrUndefined,
  integer: isInteger,
  finite: isFinite,
  natural: isNatural,
  buffer: isBuffer,
  boolean: isBoolean,
  plainObject: isPlainObject,
  date: isDate,
  null: isNull,
  undefined: isUndefined,
  function: isFunction,
};

const api = { every: {}, optional: {} };

// Build API
Object.getOwnPropertyNames(validators).forEach((validatorName) => {
  const validator = validators[validatorName];
  api[validatorName] = validator;
  api.every[validatorName] = (values, options) => validateEvery(values, validator, options);
  api.optional[validatorName] = (value, options) => validateOptional(value, validator, options);
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

  return values.every((value) => validator(value, options));
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
