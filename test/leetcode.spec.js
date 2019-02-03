const expect = require('expect.js');
const { findTwoThatSumToTarget, isRootToLeafSumMatch } = require('../leetcode/easy');

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

    describe('BinaryPathSum', () => {
      it('Test the base logic', () => {
        const tree = { value: 5 }
        expect(isRootToLeafSumMatch(tree, 5)).to.eql(true);
      });

      it('Should check if tree traversing sum match value', () => {
        //       5
        //      / \
        //     4   8
        //    /   / \
        //   11  13  4
        //  /  \      \
        // 7    2      1
        const tree = {
          value: 5,
          children: [
            {
              value: 4,
              children: [
                {
                  value: 11,
                  children: [
                    { value: 7 },
                    { value: 2 }
                  ]
                }
              ]
            },
            {
              value: 8,
              children: [
                { value: 13 },
                {
                  value: 4,
                  children: [
                    { value: 1 }
                  ]
                }
              ]
            }
          ]
        };

        expect(isRootToLeafSumMatch(tree, 22)).to.eql(true);
        expect(isRootToLeafSumMatch(tree, 5+4+11+7)).to.eql(true);
        expect(isRootToLeafSumMatch(tree, 5+8+13)).to.eql(true);
        expect(isRootToLeafSumMatch(tree, 5+8+4+1)).to.eql(true);
        expect(isRootToLeafSumMatch(tree, 4)).to.eql(false); // exit early
        expect(isRootToLeafSumMatch(tree, 50)).to.eql(false); // never get there

      });
    })
  })
})
