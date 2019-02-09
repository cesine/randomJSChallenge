const expect = require('expect.js');
const { findTwoThatSumToTarget, isRootToLeafSumMatch } = require('../leetCode/easy');

const { isValidBST } = require('../leetCode/medium');

const {
  findPool,
  findPoolFromBox,
  walkPools,
  walkPoolsUsingBoxes,
  walkPoolsUsingBoxesOutSideIn,
} = require ('../leetCode/hard');

const generateList = (nbr) => {
  const tmp = [];
  for (var i = 0; i < nbr + 1; i++) {
    tmp.push(i);
  }
  return tmp;
}

describe('LeetCode testing', () => {
  describe('Easy testing', () => {
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
  describe('Medium testing', () => {
    describe('test Binary tree', () => {
      it('Base case', () => {
        const validTree = {
          value: 5,
          left: { value: 1 },
          right: { value: 6 }
        }
        expect(isValidBST(validTree)).to.eql(true);
        const inValidTree = {
          value: 5,
          left: { value: 6 },
          right: { value: 6 }
        }
        expect(isValidBST(inValidTree)).to.eql(false);
      });

      it('test more complex tree', () => {
        //     5
        //    / \
        //   1   6
        //      / \
        //     3   4
        let tree = {
          value: 5,
          left: { value: 1 },
          right: {
            value: 6,
            left:  { value: 3 },
            right: { value: 4 },
          }
        };
        expect(isValidBST(tree)).to.eql(false);
        // making it right.
        tree.right.right.value = 7;
        expect(isValidBST(tree)).to.eql(true);
      });
    });
  })
  describe('Hard testing', () => {
    describe('Trapping rain water', () => {
      it('test localize pool', () => {
        const singleHoleof1 = [
          [1,3,3],
          [4,2,5],
          [2,6,3]
        ];
        expect(findPool(singleHoleof1).maxHeight).to.eql(1);
      });
      it('test deeper localize pool', () => {
        const singleHoleof1 = [
          [1,10,3],
          [9,1,5],
          [2,6,3]
        ];
        expect(findPool(singleHoleof1).maxHeight).to.eql(4);
      });

      it('test localize Hill', () => {
        const singleHoleof1 = [
          [1,10,3],
          [9,11,5],
          [2,6,3]
        ];
        expect(findPool(singleHoleof1).maxHeight).to.eql(0);
        expect(findPool(singleHoleof1).leakSides.length).to.eql(4);
      });

      it('test localize valley', () => {
        const singleHoleof1 = [
          [1,10,3],
          [9,5,5],
          [2,6,3]
        ];
        expect(findPool(singleHoleof1).maxHeight).to.eql(0);
        expect(findPool(singleHoleof1).leakSides).to.eql([[1,2]]);
      });

      it('test filled neibohor pool', () => {
        // Here pool right is filled to 7;
        const singleHoleof1 = [
          [1,10,3],
          [9,5,5],
          [2,6,3]
        ];
        const newPool = findPool(singleHoleof1, {right: 7});
        expect(newPool.maxHeight).to.eql(1);
      });

      it('test localize Hill with filler that still leak', () => {
        const singleHoleof1 = [
          [1,10,3],
          [9,8,5],
          [2,7,3]
        ];
        const newPool = findPool(singleHoleof1, {right: 10, bottom: 10});
        expect(newPool.maxHeight).to.eql(1);
        expect(newPool.leakSides.length).to.eql(0);
      });
    })

    describe('Trapping rain water in a box', () => {
      it('test localize pool', () => {
        const singleHoleof1 = {
          center: 2,
          top: 3,
          right: 5,
          left: 4,
          bottom: 6,
        };
        expect(findPoolFromBox(singleHoleof1).maxHeight).to.eql(1);
      });
      it('test deeper localize pool', () => {
        const singleHoleof1 = {
          center: 1,
          top: 10,
          right: 9,
          left: 5,
          bottom: 6,
        };
        expect(findPoolFromBox(singleHoleof1).maxHeight).to.eql(4);
      });

      it('test localize Hill', () => {
        const singleHoleof1 = {
          center: 11,
          top: 10,
          right: 9,
          left: 5,
          bottom: 6,
        };
        expect(findPoolFromBox(singleHoleof1).maxHeight).to.eql(0);
        expect(findPoolFromBox(singleHoleof1).leakSides.length).to.eql(4);
      });

      it('test localize valley', () => {
        const singleHoleof1 = {
          center: 5,
          top: 10,
          right: 9,
          left: 5,
          bottom: 6,
        };
        expect(findPoolFromBox(singleHoleof1).maxHeight).to.eql(0);
        expect(findPoolFromBox(singleHoleof1).leakSides).to.eql(['left']);
      });

      it('test filled neibohor pool', () => {
        // Here pool right is filled to 7;
        const singleHoleof1 = {
          center: 5,
          top: 10,
          right: 5,
          left: 9,
          bottom: 6,
        };
        const newPool = findPoolFromBox(singleHoleof1, {right: 7});
        expect(newPool.maxHeight).to.eql(1);
      });

      it('test localize Hill with filler that still leak', () => {
        const singleHoleof1 =
        {
          center: 8,
          top: 10,
          right: 5,
          left: 9,
          bottom: 7,
        };
        const newPool = findPoolFromBox(singleHoleof1, {right: 10, bottom: 10});
        expect(newPool.maxHeight).to.eql(1);
        expect(newPool.leakSides.length).to.eql(0);
      });
    })

    describe('Walking pools', () => {
      it('test walk pool', () => {
        const singleHoleof1 = [
          [1,3,3],
          [4,2,5],
          [2,6,3]
        ];
        const sum = walkPools(singleHoleof1);
        expect(sum).to.eql(1);
      });
    });

    describe.only('Walking pools using boxes', () => {
      it('test walk small pool', () => {
        const singleHoleof1 = [
          [1,3,3],
          [4,2,5],
          [2,6,3]
        ];
        const sum = walkPoolsUsingBoxes(singleHoleof1);
        expect(sum).to.eql(1);
      });
      it('test walk medium pool single pool', () => {
        const singleHoleof1 = [
          [1,3,3,3],
          [4,5,5,5],
          [2,6,2,6],
          [2,2,5,1]
        ];
        const sum = walkPoolsUsingBoxes(singleHoleof1);
        expect(sum).to.eql(3);
      });

      it('test walk medium pool', () => {
        const multipleIndependentPool = [
          [1,3,3,3],
          [4,1,5,5],
          [2,6,2,6],
          [2,2,5,1]
        ];
        const sum = walkPoolsUsingBoxes(multipleIndependentPool);
        expect(sum).to.eql(5);
      });

      it('test walk medium n x m pool', () => {
        const singleHoleof1 = [
          [1,3,3,3,3,1],
          [4,1,5,5,5,4],
          [2,6,2,6,7,2],
          [2,2,5,1,3,2]
        ];
        const sum = walkPoolsUsingBoxes(singleHoleof1);
        expect(sum).to.eql(5);
      });


      it.only('test walk medium n x m pool mirror', () => {
        const singleHoleof1 = [
          [1,3,3,3,3,1],
          [4,1,5,5,5,4],
          [2,6,2,6,7,2],
          [2,2,5,1,3,2]
        ];
        const sum = walkPoolsUsingBoxesOutSideIn(singleHoleof1);
        expect(sum).to.eql(5);
      });

      it.skip('test walk sinple river with connected items single pool', () => {
        const connectedPool = [
          [1,4,4,4,4,1],
          [4,2,1,2,3,4],
          [2,6,6,6,7,2]
        ];
        const sum = walkPoolsUsingBoxes(connectedPool);
        expect(sum).to.eql(8);
      });
    });

    describe('.findLocalMaximum', () => {
      it('simple maximum', () => {
        const singlePool = [
          [1,4,4,4],
          [4,2,1,5],
          [2,6,6,6]
        ];
        expect(findLocalMaximum(singlePool)).to.eql(4);
      })
    })
  })
})
