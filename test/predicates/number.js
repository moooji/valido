module.exports = [
  { value: null, result: false },
  { value: undefined, result: false },
  { value: () => {}, result: false },
  { value: '', result: false },
  { value: '1', result: false },
  { value: 1, result: true },
  { value: 1.1, result: true },
  { value: -1, result: true },
  { value: -1.1, result: true },
  { value: Math.PI, result: true },
  { value: NaN, result: true },
  { value: Infinity, result: true },
  { value: -Infinity, result: true },
  { value: 2e64, result: true },
  { value: (2 ** 2) - 1, result: true },
];
