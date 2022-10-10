const stream = require('stream');
const os = require('os');

class LineSplitStream extends stream.Transform {
  constructor(options) {
    super(options);
    this.last = '';
  }

  _transform(chunk, encoding, callback) {
    const res = chunk.toString();
    let result = [];


    if (this.last) {
      result = `${this.last}${res}`.split(os.EOL);
    } else {
      result = res.split(os.EOL);
    }
    this.last = result.pop();
    for (const word of result) {
      this.push(word);
      // callback(null, word)
    }
    callback();
  }

  _flush(callback) {
    if (this.last) {
      this.push(this.last);
    } else {
      this.push('');
    }
    callback();
  }
}

module.exports = LineSplitStream;
