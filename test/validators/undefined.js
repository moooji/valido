module.exports = [
  { value: null, result: false },
  { value: undefined, result: true },
  { value: () => {}, result: false },
  { value: 1, result: false },
  { value: [], result: false },
  { value: '', result: false },
  { value: 'abc', result: false },
];
