'use strict';

const chai = require('chai');
const validation = require('../main');
const expect = chai.expect;

// Validators
const isWebUrl = require('../validators/isWebUrl');
const isOptionalWebUrlArray = require('../validators/isOptionalWebUrlArray');
const isHexColor = require('../validators/isHexColor');

describe('Validators', function() {

  it('isWebUrl should validate correctly', function() {

    isWebUrl.tests.forEach(function(test) {
      return expect(validation.isWebUrl(test.value))
        .to.equal(test.result);
    });
  });

  it('isOptionalWebUrlArray should validate correctly', function() {

    isOptionalWebUrlArray.tests.forEach(function(test) {
      return expect(validation.isOptionalWebUrlArray(test.value))
        .to.equal(test.result);
    });
  });

  it('isHexColor should validate correctly', function() {

    isHexColor.tests.forEach(function(test) {
      return expect(validation.isHexColor(test.value))
        .to.equal(test.result);
    });
  });
});
