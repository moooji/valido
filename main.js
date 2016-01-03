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
  api.array[validatorName] = (values, allowEmpty) => validateArray(values, validator, allowEmpty);
});

/**
 * Validates an array of values
 *
 * @param {Array<*>} values - Values
 * @param {object} validator - Validator
 * @param {Boolean} allowEmpty - Allow empty array
 * @returns {Boolean}
 */
function validateArray(values, validator, allowEmpty) {
  if (!isArray.validate(values)) {
    return false;
  }

  if (!allowEmpty && !values.length) {
    return false;
  }

  return values.every(validator.validate);
}

module.exports = api;
