module.exports = [
  { value: null, result: false },
  { value: undefined, result: false },
  { value: () => {}, result: false },
  { value: '', result: false },
  { value: 1, result: false },
  { value: [], result: false },
  { value: [123, 456], result: false },
  { value: ['a', 123, null], result: false },
  { value: Buffer.from('string'), result: true },
];
