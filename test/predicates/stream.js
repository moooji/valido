const Stream = require('stream');

module.exports = [
  { value: null, result: false },
  { value: undefined, result: false },
  { value: () => {}, result: false },
  { value: 1, result: false },
  { value: [], result: false },
  { value: '', result: false },
  { value: 'abc', result: false },
  { value: {}, result: false },
  { value: new Stream.Readable(), result: true },
  { value: new Stream.Writable(), result: true },
  { value: new Stream.Duplex(), result: true },
  { value: new Stream.Transform(), result: true },
  { value: new Stream.PassThrough(), result: true },
];
