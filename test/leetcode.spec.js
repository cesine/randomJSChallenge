const expect = require('expect.js');
const { findTwoThatSumToTarget, isRootToLeafSumMatch } = require('../leetCode/easy');

const { isValidBST } = require('../leetCode/medium');

const {
  findPool,
  findPoolFromBox,
  walkPools,
  walkPoolsUsingBoxes,
  walkPoolsUsingBoxesOutSideIn,
  convertArrToMetadata,
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
  describe.only('Hard testing', () => {
    describe('Trapping rain water in a box', () => {
      let boxAllKnown;
      beforeEach(() => {
        boxAllKnown = {
          center: { value: 2, leak: undefined, leakability: undefined },
          top: { value: 4, leak: true, leakability: 4 },
          left: { value: 4, leak: true, leakability: 4 },
          right: { value: 4, leak: true, leakability: 4 },
          bottom: { value: 4, leak: true, leakability: 3 },
        }
      })
      it('test localize pool', () => {
        expect(findPoolFromBox(boxAllKnown).leakability).to.eql(3);
        expect(findPoolFromBox(boxAllKnown).leak).to.eql(undefined);
      });

      it('test localize pool with unkown', () => {
        boxAllKnown.bottom = { value: 4, leak: undefined, leakability: undefined };
        expect(findPoolFromBox(boxAllKnown).leakability).to.eql(4);
        expect(findPoolFromBox(boxAllKnown).leak).to.eql(undefined);
      });
    })

    describe('Walking pools', () => {
      // work only if the pool all exit at the same level.
      whatisMyPoolSum = (matrix, leak) => matrix.reduce((prev, vertical) => {
          return prev + vertical.reduce((pre, val) => {
            if (leak > val) { return (pre + (leak - val)); }
            return pre; // equal or bigger
          }, 0);
        }, 0);

      it('test walk small pool', () => {
        const singleHoleof1 = [
          [1,3,3,3,3],
          [4,2,1,4,4],
          [2,6,3,3,3]
        ];
        const sum = walkPools(singleHoleof1);
        expect(sum).to.eql(3);
      });

      it('test walk original dual pool', () => {
        const dualPool = [
            [1,4,3,1,3,2],
            [3,2,1,3,2,4],
            [2,3,3,2,3,1]
        ];
        const sum = walkPools(dualPool);
        expect(sum).to.eql(4);
      });

      it('test walk Shallow HUGE pool', () => {
        const bigFlatland = [
            [5,5,7,8,9,10,9,8,7,6,5],
            [6,4,5,5,5,4,5,5,5,4,7],
            [7,5,5,5,5,5,5,5,5,5,8],
            [8,5,5,5,5,5,5,5,5,5,9],
            [9,5,5,5,5,5,5,5,5,5,10],
            [10,5,5,5,5,5,5,5,5,5,9],
            [9,5,5,5,5,5,5,5,5,5,8],
            [8,5,5,5,5,5,5,5,5,5,7],
            [7,5,5,5,5,5,4,0,0,2,6],
            [5,6,7,8,9,10,9,8,7,6,5],
        ];
        const sum = walkPools(bigFlatland);
        const total = whatisMyPoolSum(bigFlatland, 5);
        expect(sum).to.eql(total);
      });

      it('test walk DEEP HUGE pool', () => {
        const pool = [
            [5,6,7,8,9,10,9,8,7,6,5],
            [6,4,5,3,3,5,3,3,3,4,7],
            [7,5,4,4,4,4,4,4,4,4,8],
            [8,4,4,3,3,3,3,3,3,4,9],
            [9,4,4,3,3,3,0,3,3,4,10],
            [10,4,4,3,3,3,3,3,3,4,9],
            [9,4,4,2,2,3,2,2,2,4,8],
            [8,4,4,1,2,2,1,0,0,4,7],
            [7,4,3,4,3,4,2,0,0,2,6],
            [5,6,7,8,9,10,9,8,7,5,5],
        ];
        const total = whatisMyPoolSum(pool, 5);
        const sum = walkPools(pool);
        expect(sum).to.eql(total);
      });

      it('test walk DEEP HUGE pool with Complex island', () => {
        const pool = [
            [5,5,7,8,9,9,9,8,7,6,5],
            [6,4,5,3,3,5,3,3,3,4,7],
            [7,5,4,4,4,4,4,4,4,4,8],
            [8,4,4,3,3,3,3,3,3,4,9],
            [9,4,4,3,3,3,0,3,3,4,9],
            [9,9,9,9,9,9,9,9,9,4,9],
            [9,4,4,2,2,3,2,2,2,4,8],
            [8,4,4,1,2,2,1,0,0,4,7],
            [7,4,3,4,3,4,2,0,0,2,6],
            [5,6,7,8,9,9,9,8,7,6,5],
        ];
        const total = whatisMyPoolSum(pool, 5);
        const sum = walkPools(pool);
        expect(sum).to.eql(total);
      });

      it('test walk DEEP 2x HUGE pool with middle Split', () => {
        const pool1 = [
            [5,5,7,8,9,9,9,8,7,6,5],
            [6,4,5,3,3,5,3,3,3,4,7],
            [7,5,4,4,4,8,4,4,6,4,8],
            [8,4,4,3,3,8,3,3,6,5,9],
            [9,4,4,3,3,3,0,3,6,4,9],
            [9,9,9,9,9,9,9,9,9,9,9],

        ];
        const pool2 = [
          [9,9,9,9,9,9,9,9,9,9,9],
          [9,4,4,2,2,5,2,2,2,4,8],
          [8,4,4,1,2,9,9,0,0,4,7],
          [7,4,3,4,3,5,2,0,0,2,6],
          [6,6,7,8,9,9,9,8,7,6,6],
        ]
        const completePool = [...pool1, ...pool2];
        const total = whatisMyPoolSum(pool1, 5) + whatisMyPoolSum(pool2, 6);;
        const sum = walkPools(completePool);
        expect(sum).to.eql(total);
      });

      it('test walk DEEP 2x HUGE pool with middle Split & maze inside', () => {
        const pool1 = [
            [5,5,7,8,9,9,9,8,7,6,5],
            [6,4,5,3,3,5,3,3,3,4,7],
            [7,5,6,6,6,66,7,8,9,4,8],
            [8,4,6,3,3,2,3,3,5,5,9],
            [9,4,6,3,9,3,9,3,6,4,9],
            [9,9,9,9,9,9,9,9,9,9,9],
        ];
        const totalP1 = whatisMyPoolSum(pool1, 5);
        expect(walkPools(pool1)).to.eql(totalP1);

        const pool2 = [
          [9,9,9,9,9,9,9,9,9,9,9],
          [9,4,4,2,9,5,9,2,2,4,8],
          [8,4,4,1,9,9,9,0,0,4,7],
          [7,4,3,4,3,5,2,0,0,2,6],
          [6,6,7,8,9,9,9,8,7,6,6],
        ]; // middle high lake center.
        const totalP2 = whatisMyPoolSum(pool2, 6) + 3;
        expect(walkPools(pool2)).to.eql(totalP2);
        //
        const completePool = [...pool1, ...pool2];
        expect(walkPools(completePool)).to.eql(totalP1 + totalP2);
      });

    });

    describe('.convertArrToMetadata', () => {
      it('validate Data structure', () => {
        const box = [
          [1,2],
          [3,4]
        ];
        const expecedBox = [
          [{
            value: 1,
            leak: true,
            leakability: 1,
          },{
            value: 2,
            leak: true,
            leakability: 2,
          }],
          [{
            value: 3,
            leak: true,
            leakability: 3,
          },{
            value: 4,
            leak: true,
            leakability: 4,
          }]
        ]
        expect(convertArrToMetadata(box)).to.eql(expecedBox);
      })
      it('validate more Data structure', () => {
        const box = [
          [1,2, 3],
          [3,4, 5],
          [6,7, 8]
        ];

        expect(convertArrToMetadata(box)[1][1]).to.eql({
          value: 4,
          leak: undefined,
          leakability: undefined,
        });
      })
    })
  })
})
