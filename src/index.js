'use strict';

const isUrl = require('./validators/isUrl');
const isWebUrl = require('./validators/isWebUrl');
const isHexColor = require('./validators/isHexColor');
const isString = require('./validators/isString');
const isArray = require('./validators/isArray');
const isNull = require('./validators/isNull');
const isUndefined = require('./validators/isUndefined');
const isNullOrUndefined = require('./validators/isNullOrUndefined');
const isInteger = require('./validators/isInteger');
const isFinite = require('./validators/isFinite');
const isNatural = require('./validators/isNatural');
const isBuffer = require('./validators/isBuffer');
const isBoolean = require('./validators/isBoolean');
const isFunction = require('./validators/isFunction');
const isPlainObject = require('./validators/isPlainObject');
const isDate = require('./validators/isDate');

const validators = {
  isUrl,
  isWebUrl,
  isHexColor,
  isString,
  isArray,
  isNull,
  isUndefined,
  isNullOrUndefined,
  isInteger,
  isFinite,
  isNatural,
  isBuffer,
  isBoolean,
  isFunction,
  isPlainObject,
  isDate,
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
