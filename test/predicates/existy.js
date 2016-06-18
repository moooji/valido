module.exports = [
  { value: null, result: false },
  { value: undefined, result: false },
  { value: () => {}, result: true },
  { value: 1, result: true },
  { value: [], result: true },
  { value: '', result: true },
  { value: 'abc', result: true },
];
