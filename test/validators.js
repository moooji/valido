'use strict';

const fs = require('fs');
const path = require('path');
const _ = require('lodash');
const chai = require('chai');
const valido = require('../src/main');
const expect = chai.expect;

const validatorDir = path.join(__dirname, '../src/validators');
const validatorFiles = fs.readdirSync(validatorDir);

validatorFiles.forEach((file) => {
  const filePath = path.join(validatorDir, file);
  const fileInfo = path.parse(filePath);
  const validatorName = fileInfo.name;
  const validator = require(filePath);

  const validValues = _.pluck(_.where(validator.tests, { result: true }), 'value');
  const invalidValues = _.pluck(_.where(validator.tests, { result: false }), 'value');

  const notNullOrUndefinedTestValue = (test) => !valido.isNullOrUndefined(test.value);
  const optionalValueTests = _.filter(validator.tests, notNullOrUndefinedTestValue);

  describe('Validators - ' + validatorName, () => {
    it('should have tests (valid samples)', () => {
      return expect(validValues).to.not.be.empty;
    });

    it('should have tests (invalid samples)', () => {
      return expect(invalidValues).to.not.be.empty;
    });

    it('should validate a value', () => {
      validator.tests.forEach((test) => {
        return expect(valido[validatorName](test.value, test.options)).to.equal(test.result);
      });
    });

    it('should validate an optional value', () => {
      optionalValueTests.forEach((test) => {
        expect(valido.optional[validatorName](null, test.options)).to.equal(true);
        expect(valido.optional[validatorName](undefined, test.options)).to.equal(true);
        expect(valido.optional[validatorName](test.value, test.options)).to.equal(test.result);
      });
    });

    it('should validate a list of values', () => {
      validator.tests.forEach((test) => {
        const values = [test.value, test.value];
        return expect(valido.every[validatorName](values, test.options)).to.equal(test.result);
      });
    });

    it('should validate an empty list to true', () => {
      return expect(valido.every[validatorName]([])).to.equal(true);
    });
  });
});
