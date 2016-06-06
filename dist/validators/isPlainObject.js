'use strict';

/**
 * Checks if value is a plain object
 *
 * @param {Object} value - Value
 * @returns {Boolean}
 */

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

function validate(value) {
  // Basic check for Type object that's not null
  if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' && value !== null) {
    var proto = Object.getPrototypeOf(value);
    return proto === Object.prototype || proto === null;
  }

  return false;
}

module.exports = validate;