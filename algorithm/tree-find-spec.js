const expect = require('expect.js');

const { Node } = require('./tree');

function calculatePotentialBelow (n) {
  // console.log('  calculatePotentialBelow', n, n/2*n);
  return Math.ceil(n/2 * n);
}

function findIfHasSum(node, acc = 0, X) {
  // console.log('findIfHasSum', node.value)
  if (node.value + acc === X && !node.left && !node.right) {
    return true;
  }

  if (node.value + acc > X) {
    return false;
  }

  // console.log('  looking for ', X - acc);
  // console.log('     potential left', X - node.value - acc);
  if (node.left && calculatePotentialBelow(node.left.value) >= X - node.value - acc) {
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
    expect(findIfHasSum(tree, 0, 3)).to.eql(true);
  });

  it('should find a branch on the right', () => {
    const tree = new Node(2);
    tree.add(4);
    expect(findIfHasSum(tree, 0, 6)).to.eql(true);
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

    expect(findIfHasSum(tree, 0, 2)).to.eql(false);
    expect(findIfHasSum(tree, 0, 24)).to.eql(true);
    expect(findIfHasSum(tree, 0, 10+13+16+15)).to.eql(true);
    expect(findIfHasSum(tree, 0, 100)).to.eql(false);
  });
});
