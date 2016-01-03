'use strict';

const isWebUrl = require('./validators/isWebUrl');
const isHexColor = require('./validators/isHexColor');
const isString = require('./validators/isString');
const isArray = require('./validators/isArray');

const validators = {
  isWebUrl,
  isHexColor,
  isString,
  isArray
};

const api = { array: {} };

Object.getOwnPropertyNames(validators).forEach((validatorName) => {
  const validator = validators[validatorName];
  api[validatorName] = validator.validate;
  api.array[validatorName] = (values, options) => validateArray(values, validator, options);
});

/**
 * Validates an array of values
 *
 * @param {Array<*>} values - Values
 * @param {object} validator - Validator
 * @param {object} options - Options
 * @returns {Boolean}
 */
function validateArray(values, validator, options) {
  if (!isArray.validate(values)) {
    return false;
  }

  if (!(options && options.allowEmpty) && !values.length) {
    return false;
  }

  return values.every((value) => validator.validate(value, options));
}

module.exports = api;
