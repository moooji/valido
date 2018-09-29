'use strict';

const isUrl = require('./predicates/url');
const isUri = require('./predicates/uri');
const isWebUrl = require('./predicates/webUrl');
const isHexColor = require('./predicates/hexColor');
const isString = require('./predicates/string');
const isArray = require('./predicates/array');
const isNull = require('./predicates/null');
const isUndefined = require('./predicates/undefined');
const isExisty = require('./predicates/existy');
const isInteger = require('./predicates/integer');
const isFinite = require('./predicates/finite');
const isNatural = require('./predicates/natural');
const isNumber = require('./predicates/number');
const isBuffer = require('./predicates/buffer');
const isBoolean = require('./predicates/boolean');
const isFunction = require('./predicates/function');
const isPlainObject = require('./predicates/plainObject');
const isStream = require('./predicates/stream');
const isDate = require('./predicates/date');
const isEmail = require('./predicates/email');

const predicates = {
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
  number: isNumber,
  buffer: isBuffer,
  boolean: isBoolean,
  plainObject: isPlainObject,
  date: isDate,
  null: isNull,
  undefined: isUndefined,
  function: isFunction,
  stream: isStream,
  email: isEmail,
};

const api = { all: {}, optional: {} };

// Build API
Object.getOwnPropertyNames(predicates).forEach((predicateName) => {
  const predicate = predicates[predicateName];
  api[predicateName] = predicate;
  api.all[predicateName] = (values, options) => validateAll(values, predicate, options);
  api.optional[predicateName] = (value, options) => validateOptional(value, predicate, options);
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

  return values.every(value => predicate(value, options));
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
