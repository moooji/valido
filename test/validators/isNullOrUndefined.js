module.exports = [
  { value: null, result: true },
  { value: undefined, result: true },
  { value: () => {}, result: false },
  { value: 1, result: false },
  { value: [], result: false },
  { value: '', result: false },
  { value: 'abc', result: false },
];
