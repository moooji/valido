'use strict';

/**
               * Checks if value is a date object
               *
               * @param {Date} value - Value
               * @returns {Boolean}
               */var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {return typeof obj;} : function (obj) {return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;};
function validate(value) {
  // Basic check for Type object that's not null
  if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' && value !== null) {
    return Object.getPrototypeOf(value) === Date.prototype;
  }

  return false;
}

module.exports = validate;