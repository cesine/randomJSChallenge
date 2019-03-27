const expect = require('expect.js');

const { latice } = require('./combinatorics');

describe('combinatorics', () => {
  it.only('should create a latice', () => {
    expect(latice['a', 'b']).to.eql([['a','b'], ['a'], ['b'], []]);
  });
});
