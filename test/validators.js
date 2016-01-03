'use strict';

const fs = require('fs');
const path = require('path');
const _ = require('lodash');
const chai = require('chai');
const valido = require('../main');
const expect = chai.expect;

const validatorDir = path.join(__dirname, '../validators');
const validatorFiles = fs.readdirSync(validatorDir);

validatorFiles.forEach((file) => {
  const filePath = path.join(validatorDir, file);
  const fileInfo = path.parse(filePath);
  const validatorName = fileInfo.name;
  const validator = require(filePath);
  const validValues = _.pluck(_.where(validator.tests, { result: true }), 'value');
  const invalidValues = _.pluck(_.where(validator.tests, { result: false }), 'value');

  describe('Validators - ' + validatorName, () => {
    it('should have tests (valid samples)', () => {
      return expect(validValues).to.not.be.empty;
    });

    it('should have tests (invalid samples)', () => {
      return expect(invalidValues).to.not.be.empty;
    });

    it('should validate a value', () => {
      validator.tests.forEach((test) => {
        return expect(valido[validatorName](test.value, test.options))
          .to.equal(test.result);
      });
    });

    it('should validate a list of values (valid samples)', () => {
      return expect(valido.array[validatorName](validValues))
        .to.equal(true);
    });

    it('should validate a list of invalid values (invalid samples)', () => {
      return expect(valido.array[validatorName](invalidValues))
        .to.equal(false);
    });

    it('should validate an empty list to false', () => {
      return expect(valido.array[validatorName]([]))
        .to.equal(false);
    });

    it('should validate an empty list to true if "allowEmpty" is true', () => {
      return expect(valido.array[validatorName]([], true))
        .to.equal(true);
    });
  });
});
