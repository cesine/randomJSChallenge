const expect = require('expect.js');
const { findTwoThatSumToTarget, isRootToLeafSumMatch, minimumDepthTree } = require('../leetCode/easy');
const { Node } = require('../leetCode/easy/minDepthTree');

const {
  isValidBST,
  inorderTraversal,
  ladderLength,
  getWordDistance,
  listAllDistanceOfOne,
  listAllPossiblePath,
  ladderLengthSmarter,
  rotateImage,
} = require('../leetCode/medium');

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
    describe('Minum Depth Tree', () => {
      it('should find the shortest branch on the left', () => {

        // Given binary tree [3,9,20,null,null,15,7],
        //
        //     3
        //    / \
        //   9  20
        //     /  \
        //    15   7
        const tree = new Node(3);
        tree.left = new Node(9);
        tree.right = new Node(20);
        tree.right.left = new Node(15);
        tree.right.right = new Node(7);
        console.log('Tree', JSON.stringify(tree, null, 2));
        expect(minimumDepthTree(tree)).to.eql(2);
      })

      it('should find the shortest branch on the right', () => {
        const tree = new Node(3);
        tree.left = new Node(9);
        tree.left.left = new Node(9);
        tree.left.left.left = new Node(9);
        tree.left.right = new Node(9);

        tree.right = new Node(20);
        tree.right.left = new Node(15);
        tree.right.right = new Node(7);
        console.log('Tree', JSON.stringify(tree, null, 2));
        expect(minimumDepthTree(tree)).to.eql(3);
      });

      it('should find the shortest branch in the middle', () => {
        const tree = new Node(3);
        tree.left = new Node(9);
        tree.left.left = new Node(9);
        tree.left.left.left = new Node(9);
        tree.left.right = new Node(9);

        tree.right = new Node(20);
        tree.right.left = new Node(15);
        tree.right.right = new Node(7);
        tree.right.right.right = new Node(7);
        console.log('Tree', JSON.stringify(tree, null, 2));
        expect(minimumDepthTree(tree)).to.eql(3);
      });
    });
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

    describe('inOrder binary tree traversal', () => {
      let complexArray = [];
      beforeEach(() => {
        // complex(ish)
        //     5
        //    / \
        //   1   6
        //  /   / \
        // a   3   4
        //          \
        //           b
        complexArray = [5, [1, 'a', null], [6, 3, [4, null, 'b']]];

      })
      it('test the initial condition', () => {
        expect(inorderTraversal([5])).to.eql([5]);
        expect(inorderTraversal([5, null, 1])).to.eql([5, 1]);
        expect(inorderTraversal(complexArray)).to.eql(['a',1,5,3,6,4,'b']);
      })
    })
    describe('World Ladder', () => {
      let beginWord, endWord, wordList;

      beforeEach(() => {
        beginWord = "hit";
        endWord = "cog";
        wordList = ["hot","dot","dog","lot","log","cog"];
      })
      it('test Levenshtein_distance', () => {
        expect(getWordDistance('abc', 'bbc')).to.eql(1);
        expect(getWordDistance('abc', 'cba')).to.eql(2);
        expect(getWordDistance('abc', 'c')).to.eql(2);
        expect(getWordDistance('abc', 'ca')).to.eql(3);
      })

      it('get the proper list distance', () => {
        expect(listAllDistanceOfOne('abc', ['abc', 'abb', 'bbc', 'aac', 'ccc'])).to.eql(['abb', 'bbc', 'aac']);
        expect(listAllDistanceOfOne('abc', ['ddd', 'ddd', 'ccc'])).to.eql([]);
      })

      it('test the recursive function', () => {
        const baseMap = {
          hot: {
            end: 2,
            start: 1,
            possibilityList: [ 'dot', 'lot' ]
          },
          dot: {
            end: 2,
            start: 2,
            possibilityList: [ 'hot', 'dog', 'lot' ]
          },
          dog: {
            end: 1,
            start: 3,
            possibilityList: [ 'dot', 'log', 'cog' ],
          },
          lot: {
            end: 2,
            start: 2,
            possibilityList: [ 'hot', 'dot', 'log' ],
          },
          log: {
            end: 1,
            start: 3,
            possibilityList: [ 'dog', 'lot', 'cog' ],
          },
          cog: {
            end: 0,
            start: 3,
            possibilityList: [ 'dog', 'log' ],
          }
        };
        const allObject1 = [];
        listAllPossiblePath(baseMap, 'dog', ['dog'], allObject1);
        expect(allObject1).to.eql([['dog']]) // Default case where we are at 1 distance from the end.

        const allObject2 = [];
        const finalResult = listAllPossiblePath(baseMap, 'dot', ['hot','dot'], allObject2);
        expect(allObject2).to.eql([['hot', 'dot', 'dog'], ['hot', 'dot', 'lot', 'log']]) // Default case where we are at 1 distance from the end.
      });

      it('test missing endword in list', () => {
        expect(ladderLength(beginWord, 'missingWord', wordList)).to.eql(0);
      })

      it('test real list multiple path', () => {
        expect(ladderLength(beginWord, endWord, wordList)).to.eql(5);
        expect(ladderLengthSmarter(beginWord, endWord, wordList)).to.eql(5);
      })
    });

    describe('.rotateImage', () => {
      it('Empty matrix', () => {
        expect(rotateImage([])).to.eql([]);
      });

      it('small 2x2 matrix', () => {
        const input = [
          [1,2],
          [3,4],
        ];
        const output = [
          [3,1],
          [4,2],
        ];
        expect(rotateImage(input)).to.eql(output);
      });

      it('small 3x3 matrix', () => {
        const input = [
          [1,2,3],
          [4,5,6],
          [7,8,9],
        ];
        const output = [
          [7,4,1],
          [8,5,2],
          [9,6,3],
        ];
        expect(rotateImage(input)).to.eql(output);
      });

      it('medium 4x4 matrix no inner matrix', () => {
        const input = [
            [ 5, 1, 9,11],
            [ 2, 0, 0,10],
            [13, 0, 0, 7],
            [15,14,12,16]
          ];
        const output = [
            [15,13, 2, 5],
            [14, 0, 0, 1],
            [12, 0, 0, 9],
            [16, 7,10,11]
        ];
        expect(rotateImage(input)).to.eql(output);
      });

      it('medium 5x5 matrix without inner matrix', () => {
        const input = [
            [ 5, 1, 3, 9, 11],
            [ 2, 0, 0, 0, 10],
            [ 6, 0, 0, 0, 4],
            [13, 0, 0, 0, 7],
            [15,14, 5, 12,16]
          ];
        const output = [
            [15,13, 6, 2, 5],
            [14, 0, 0, 0, 1],
            [5,  0, 0, 0, 3],
            [12, 0, 0 ,0, 9],
            [16, 7, 4, 10,11]
        ];
        expect(rotateImage(input)).to.eql(output);
      });

      it('medium 4x4 matrix with inner matrix', () => {
        const input = [
            [ 5, 1, 9,11],
            [ 2, 4, 8,10],
            [13, 3, 6, 7],
            [15,14,12,16]
          ];
        const output = [
            [15,13, 2, 5],
            [14, 3, 4, 1],
            [12, 6, 8, 9],
            [16, 7,10,11]
        ];
        expect(rotateImage(input)).to.eql(output);
      });

      it('medium 5x5 matrix with inner matrix', () => {
        const input = [
            [ 5, 1, 3, 9, 11],
            [ 2, 1, 2, 3, 10],
            [ 6, 4, 5, 6, 4],
            [13, 7, 8, 9, 7],
            [15,14, 5, 12,16]
          ];
        const output = [
            [15,13, 6, 2, 5],
            [14, 7, 4, 1, 1],
            [5,  8, 5, 2, 3],
            [12, 9, 6 ,3, 9],
            [16, 7, 4, 10,11]
        ];
        expect(rotateImage(input)).to.eql(output);
      });

    });
  })
  describe('Hard testing', () => {
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
