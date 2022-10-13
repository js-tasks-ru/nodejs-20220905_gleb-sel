const stream = require('stream');
const LimitExceededError = require('./LimitExceededError');


class LimitSizeStream extends stream.Transform {
  constructor(options) {
    super(options);

    this.limit = options.limit;
    this.encoding = options.encoding;
    this.bytes = 0;
  }

  _transform(chunk, encoding, callback) {
    this.bytes += Buffer.byteLength(chunk);
    if (this.bytes > this.limit) {
      callback(new LimitExceededError());
    } else if (this.bytes <= this.limit) {
      callback(null, chunk);
    }
  }
}

module.exports = LimitSizeStream;
