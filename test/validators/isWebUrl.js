module.exports = [
  { value: null, result: false },
  { value: undefined, result: false },
  {
    value: () => {
    }, result: false
  },
  { value: '', result: false },
  { value: 1, result: false },
  { value: 'abc', result: false },
  { value: {}, result: false },
  { value: [], result: false },
  { value: 'http://', result: false },
  { value: '/index.html', result: false },
  { value: 'google.com', result: false },
  { value: 'https://127.0.0.1:3128', result: false },
  { value: 'https://8.8.8.8.8:3128', result: false },
  { value: 'mongodb://www.google.com', result: false },
  { value: 'http://www.google.com', result: true },
  { value: 'http://google.com', result: true },
  { value: 'https://www.google.com', result: true },
  { value: 'https://8.8.8.8:3128', result: true },
  { value: 'https://pass:bob@www.google.com:8080/index.html?param=2&yy=abc', result: true },
  { value: 'https://www.google.com', options: { endsWith: '/' }, result: false },
  { value: 'https://www.google.com/', options: { endsWith: '/' }, result: true },
  { value: 'https://www.google.com', options: { startsWith: 'https://www.ebay' }, result: false },
  { value: 'https://www.google.com/', options: { startsWith: 'https://www.google' }, result: true },
  { value: 'https://www.google.com/', options: { startsWith: 'https://www.google', endsWith: '/' }, result: true },
  { value: 'https://www.google.com', options: { startsWith: 'https://www.google', endsWith: '/' }, result: false },
  { value: 'https://www.google.com/', options: { startsWith: 'https://www.ebay', endsWith: '/' }, result: false }
];
