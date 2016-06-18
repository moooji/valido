module.exports = [
  { value: null, result: false },
  { value: 123, result: false },
  { value: 'abc', result: false },
  { value: 0, result: false },
  { value: '', result: false },
  { value: {}, result: true },
  { value: { constructor: 'String' }, result: true },
  { value: new Object({}), result: true }, // eslint-disable-line
  { value: new Object(null), result: true }, // eslint-disable-line
  { value: Object.assign({}), result: true },
  { value: true, result: false },
  { value: false, result: false },
  { value: () => {}, result: false },
  { value: function test() {}, result: false },
];
