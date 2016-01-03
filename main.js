'use strict';

const isWebUrl = require('./validators/isWebUrl').validate;
const isOptionalWebUrlArray = require('./validators/isOptionalWebUrlArray').validate;
const isHexColor = require('./validators/isHexColor').validate;

module.exports = {
  isWebUrl,
  isOptionalWebUrlArray,
  isHexColor
};
