const expect = require('expect.js');
const { findTwoThatSumToTarget } = require('../leetcode/easy');

const generateList = (nbr) => {
  const tmp = [];
  for (var i = 0; i < nbr + 1; i++) {
    tmp.push(i);
  }
  return tmp;
}

describe('LeetCode testing', () => {
  describe.only('Easy testing', () => {
    it('Should find 2 item that sum to match a value', () => {
      // 4 test take 13ms
      expect(findTwoThatSumToTarget(9, [2, 7, 11, 15])).to.eql([0,1]);
      expect(findTwoThatSumToTarget(29, [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15])).to.eql([14,15]);
      expect(findTwoThatSumToTarget(199, generateList(100))).to.eql([99,100]);
      expect(findTwoThatSumToTarget(200, generateList(100))).to.eql('No two sum solution');
      expect(findTwoThatSumToTarget(10000, generateList(1000))).to.eql('No two sum solution');
    });
  })
})
