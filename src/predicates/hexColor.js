'use strict';

const isString = require('./string');

const re = /^#([0-9A-F]{3}|[0-9A-F]{6})$/i;

/**
 * Checks if value is a hex color like #FFAA99
 *
 * @param {String} hexColor
 * @returns {Boolean}
 */
function validate(hexColor) {
  if (!isString(hexColor)) {
    return false;
  }

  return hexColor.match(re) !== null;
}

module.exports = validate;
