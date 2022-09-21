function sum(a, b) {
  [a, b].forEach((el) => {
    if (typeof el !== 'number') {
      throw new TypeError('not a number');
    }
  });

  return a + b;
}

module.exports = sum;
