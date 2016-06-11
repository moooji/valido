module.exports = [
  { value: null, result: false },
  { value: undefined, result: false },
  { value: () => {}, result: false },
  { value: '', result: false },
  { value: 1, result: false },
  { value: 'FF3333', result: false },
  { value: '#FF33', result: false },
  { value: '#FF33333', result: false },
  { value: '#FF3333', result: true },
  { value: '#FFF', result: true },
];
