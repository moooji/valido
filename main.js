'use strict';

const isWebUrl = require('./validators/isWebUrl');
const isHexColor = require('./validators/isHexColor');
const isString = require('./validators/isString');
const isArray = require('./validators/isArray');
const isNull = require('./validators/isNull');
const isUndefined = require('./validators/isUndefined');
const isInteger = require('./validators/isInteger');
const isFinite = require('./validators/isFinite');
const isNatural = require('./validators/isNatural');

const validators = {
  isWebUrl,
  isHexColor,
  isString,
  isArray,
  isNull,
  isUndefined,
  isInteger,
  isFinite,
  isNatural
};

const api = { every: {} };

Object.getOwnPropertyNames(validators).forEach((validatorName) => {
  const validator = validators[validatorName];
  api[validatorName] = validator.validate;
  api.every[validatorName] = (values, options) => validateEvery(values, validator, options);
});

/**
 * Validates a list of values
 *
 * @param {Array<*>} values - Values
 * @param {object} validator - Validator
 * @param {object} options - Options
 * @returns {Boolean}
 */
function validateEvery(values, validator, options) {
  if (!isArray.validate(values)) {
    return false;
  }

  if (!(options && options.allowEmpty) && !values.length) {
    return false;
  }

  return values.every((value) => validator.validate(value, options));
}

module.exports = api;
