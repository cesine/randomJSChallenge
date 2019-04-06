// Problem: Given an array of integers and a target sum, return every pair of integers that add up to the target sum.

const { findTarget, equalTarget, hashMapTwoSum } = require('../arraytest/sum2array');
const expect = require('expect.js');

const nbrList = [30, 20, 10, 40, 50, 60, 70];

describe('Sum 2 to equal 50', () => {
  it('should find a pair', () => {
    const pair = [1, 2, 3];
    expect(equalTarget(2, pair, 4)).to.eql([2, 2]);
    expect(equalTarget(2, pair, 5)).to.eql([2, 3]);
  });
  it('should Sum to 50', () => {
    expect(findTarget(nbrList, 50)).to.eql([[30, 20], [10, 40]]);
  });

  it('test with Hash map', () => {
    expect(hashMapTwoSum(nbrList, 50)).to.eql([[30, 20], [10, 40]]);
  });
});
