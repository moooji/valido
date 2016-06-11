module.exports = [
  { value: null, result: false },
  { value: 123, result: false },
  { value: 'abc', result: false },
  { value: 0, result: false },
  { value: '', result: false },
  { value: {}, result: false },
  { value: true, result: true },
  { value: false, result: true },
];
