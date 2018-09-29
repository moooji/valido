"use strict";

const fs = require("fs");
const path = require("path");
const _ = require("lodash");
const chai = require("chai");
const valido = require("../index");
const expect = chai.expect;

const predicateDir = path.join(__dirname, "../predicates");
const predicateTestsDir = path.join(__dirname, "./predicates");
const predicateFiles = fs.readdirSync(predicateDir);

predicateFiles.forEach(file => {
  const testsPath = path.join(predicateTestsDir, file);
  const filePath = path.join(predicateDir, file);
  const fileInfo = path.parse(filePath);
  const predicateName = fileInfo.name;
  const tests = require(testsPath); // eslint-disable-line global-require

  const validValues = _.map(_.filter(tests, { result: true }), "value");
  const invalidValues = _.map(_.filter(tests, { result: false }), "value");

  const hasTestValue = test => !valido.existy(test.value);
  const optionalValueTests = _.filter(tests, hasTestValue);

  describe(`predicates - ${predicateName}`, () => {
    it("should have tests (valid samples)", () => {
      return expect(validValues).to.not.be.empty;
    });

    it("should have tests (invalid samples)", () => {
      return expect(invalidValues).to.not.be.empty;
    });

    it("should validate a value", () => {
      tests.forEach(test => {
        return expect(valido[predicateName](test.value, test.options)).to.equal(
          test.result
        );
      });
    });

    it("should validate an optional value", () => {
      optionalValueTests.forEach(test => {
        expect(valido.optional[predicateName](null, test.options)).to.equal(
          true
        );
        expect(
          valido.optional[predicateName](undefined, test.options)
        ).to.equal(true);

        if (test.value !== null && test.value !== undefined) {
          expect(
            valido.optional[predicateName](test.value, test.options)
          ).to.equal(test.result);
        }
      });
    });

    it("should validate a list of values", () => {
      tests.forEach(test => {
        const values = [test.value, test.value];
        return expect(valido.all[predicateName](values, test.options)).to.equal(
          test.result
        );
      });
    });

    it("should validate an empty list to true", () => {
      return expect(valido.all[predicateName]([])).to.equal(true);
    });
  });
});
