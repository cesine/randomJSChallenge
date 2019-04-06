const expect = require('expect.js');
const { isChainSymetrical, countAllInSubChain, countAllSymetricSubChain } = require('./winterLights');

describe('testing the winterLights challenge', () => {
  it('test the isChainSymetrical', () => {
    expect(isChainSymetrical([6])).to.be(1);
    expect(isChainSymetrical([0])).to.be(1);
    expect(isChainSymetrical([1, 3, 1])).to.be(1);
    expect(isChainSymetrical([0, 3, 1])).to.be(0);
    expect(isChainSymetrical([0, 0, 0, 2])).to.be(0);
    expect(isChainSymetrical([0, 0, 0, 2, 2])).to.be(1);
  });

  it('Test the Sub division of the array', () => {
    expect(countAllInSubChain([1, 2, 3, 4, 5], 2)).to.eql(0);
    expect(countAllInSubChain([1, 2, 3, 4, 5], 3)).to.eql(0);
    expect(countAllInSubChain([1, 1, 1], 2)).to.eql(2);
    expect(countAllInSubChain([1, 2, 1], 2)).to.eql(0);
    expect(countAllInSubChain([1, 2, 1, 3, 3], 2)).to.eql(1);
    expect(countAllInSubChain([0, 2, 0, 0, 2], 5)).to.eql(1);
  });

  it('test the full flow', () => {
    expect(countAllSymetricSubChain('02002')).to.be(11);
    // Well it work for small/medium number, but if I go big it is a double Factorial
    // I got 20% on their benmark because I did not think about optimizing for massive number.
  });
});
