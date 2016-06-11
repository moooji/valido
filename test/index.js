'use strict';

const fs = require('fs');
const path = require('path');
const _ = require('lodash');
const chai = require('chai');
const valido = require('../dist/index');
const expect = chai.expect;

const validatorDir = path.join(__dirname, '../dist/validators');
const validatorTestsDir = path.join(__dirname, './validators');
const validatorFiles = fs.readdirSync(validatorDir);

validatorFiles.forEach(file => {
  const testsPath = path.join(validatorTestsDir, file);
  const filePath = path.join(validatorDir, file);
  const fileInfo = path.parse(filePath);
  const validatorName = fileInfo.name;
  const tests = require(testsPath); // eslint-disable-line global-require

  const validValues = _.map(_.filter(tests, { result: true }), 'value');
  const invalidValues = _.map(_.filter(tests, { result: false }), 'value');

  const notNullOrUndefinedTestValue = (test) => !valido.nullOrUndefined(test.value);
  const optionalValueTests = _.filter(tests, notNullOrUndefinedTestValue);

  describe(`Validators - ${validatorName}`, () => {
    it('should have tests (valid samples)', () => {
      return expect(validValues).to.not.be.empty;
    });

    it('should have tests (invalid samples)', () => {
      return expect(invalidValues).to.not.be.empty;
    });

    it('should validate a value', () => {
      tests.forEach((test) => {
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
      tests.forEach((test) => {
        const values = [test.value, test.value];
        return expect(valido.every[validatorName](values, test.options)).to.equal(test.result);
      });
    });

    it('should validate an empty list to true', () => {
      return expect(valido.every[validatorName]([])).to.equal(true);
    });
  });
});
