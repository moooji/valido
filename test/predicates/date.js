module.exports = [
  { value: null, result: false },
  { value: 123, result: false },
  { value: 'abc', result: false },
  { value: 0, result: false },
  { value: '', result: false },
  { value: {}, result: false },
  { value: true, result: false },
  { value: false, result: false },
  { value: new Date(), result: true },
  { value: (2 ** 2) - 1, result: false },
];
