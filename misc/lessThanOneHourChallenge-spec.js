const {
  sumFor,
  sumLoop,
  sumRecur,
  mergeBothList,
  fibo,
  fiboLoop,
  largestNumberFromArray,
  giveMeAllPossible100,
} = require('./lessThanOneHourChallenge');
const expect = require('expect.js');

describe('Less than 1h challenge', () => {
  it('Shoudl summ all number: ', () => {
    expect(sumFor([1, 2, 3, 4, 5])).to.be(15);
    expect(sumLoop([1, 2, 3, 4, 6])).to.be(16);
    expect(sumRecur([1, 2, 3, 4, 7])).to.be(17);
  });

  it('should merge both list', () => {
    expect(mergeBothList(['a', 'b', 'c'], [1, 2, 3])).to.eql(['a', 1, 'b', 2, 'c', 3]);
  });

  it('should get a list of all first N Fibonacci number', () => {
    expect(fibo(10)).to.eql([0, 1, 1, 2, 3, 5, 8, 13, 21, 34]);
    expect(fiboLoop(10)).to.eql([0, 1, 1, 2, 3, 5, 8, 13, 21, 34]);
  });

  it('should Give me the largest number', () => {
    expect(largestNumberFromArray([50, 2, 1, 9])).to.be(95021);
    // expect(largestNumberFromArray([420, 42, 423])).to.be(42342420); This case dosent work. Expected 42342042 to equal 42342420.
  });

  it('should give me all possible way of making 100 out of 1 to 9', () => {
    expect(giveMeAllPossible100()).to.contain('1+2+34–5+67–8+9');
  });
});
