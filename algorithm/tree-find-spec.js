// eslint-disable-next-line import/no-extraneous-dependencies
const expect = require('expect.js');

const { Node } = require('./tree');

// Given the below binary tree and sum = 22,
/**

 */

function findIfHasSum(node, acc = 0, X) {
  console.log('findIfHasSum', node.value)
  if (node.value + acc === X && !node.left && !node.right) {
    return true;
  }

  if (node.value + acc > X) {
    return false;
  }

  if (node.left) {
    const left = findIfHasSum(node.left, node.value + acc, X);
    if (left) {
      return true;
    }
  }
  if (node.right) {
    const right = findIfHasSum(node.right, node.value + acc, X);
    if (right) {
      return true;
    }
  }

  return false;
}

describe('Find', () => {
  it('should exit early if a branch is found', () => {
    expect(findIfHasSum(new Node(3), 0, 3)).to.eql(true);
  });

  it('should exit early if a branch is more than target', () => {
    expect(findIfHasSum(new Node(5), 0, 3)).to.eql(false);
  });

  it('should find a branch on the left', () => {
    const tree = new Node(2);
    tree.add(1);
    expect(findIfHasSum(tree, null, 3)).to.eql(true);
  });

  it('should find a branch on the right', () => {
    const tree = new Node(2);
    tree.add(4);
    expect(findIfHasSum(tree, null, 6)).to.eql(true);
  });

  it('should find if there is a branch that sums to X', () => {
    const tree = new Node(10);
    tree.add(6);
    tree.add(13);
    tree.add(4);
    tree.add(8);
    tree.add(12);
    tree.add(16);
    tree.add(3);
    tree.add(15);
    tree.add(17);

    // expect(findIfHasSum(tree, null, 2)).to.eql(false);
    // expect(findIfHasSum(tree, null, 24)).to.eql(true);
    expect(findIfHasSum(tree, null, 10+13+16+15)).to.eql(true);
  });
});
