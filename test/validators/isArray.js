module.exports = [
  { value: null, result: false },
  { value: undefined, result: false },
  { value: () => {}, result: false },
  { value: '', result: false },
  { value: 1, result: false },
  { value: [], result: true },
  { value: [123, 456], result: true },
  { value: ['a', 123, null], result: true },
];
