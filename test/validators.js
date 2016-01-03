'use strict';

const chai = require('chai');
const validation = require('../main');
const expect = chai.expect;

// Validators
const isWebUrl = require('../validators/isWebUrl');
const isOptionalWebUrlArray = require('../validators/isOptionalWebUrlArray');
const isHexColor = require('../validators/isHexColor');

describe('Validators', () => {
  it('isWebUrl should validate correctly', () => {
    isWebUrl.tests.forEach((test) => {
      return expect(validation.isWebUrl(test.value))
        .to.equal(test.result);
    });
  });

  it('isOptionalWebUrlArray should validate correctly', () => {
    isOptionalWebUrlArray.tests.forEach((test) => {
      return expect(validation.isOptionalWebUrlArray(test.value))
        .to.equal(test.result);
    });
  });

  it('isHexColor should validate correctly', () => {
    isHexColor.tests.forEach((test) => {
      return expect(validation.isHexColor(test.value))
        .to.equal(test.result);
    });
  });
});
