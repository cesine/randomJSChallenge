// Given a binary tree, find its minimum depth.
//
// The minimum depth is the number of nodes along the shortest path from the root node down to the nearest leaf node.
//
// Note: A leaf is a node with no children.
//
// Example:
//
// Given binary tree [3,9,20,null,null,15,7],
//
//     3
//    / \
//   9  20
//     /  \
//    15   7
// return its minimum depth = 2.

class Node {
  constructor(value) {
    this.value = value;

  }
  hasChildren () {
    return this.left || this.right;
  }
}

function minimumDepthTree(tree, accumulator = 0) {
  accumulator = accumulator + 1;
  console.log('looking at tree', tree.value)

  if (!tree.hasChildren()) {
    return accumulator;
  }

  const left = tree.left && minimumDepthTree(tree.left, accumulator);
  const right = tree.right && minimumDepthTree(tree.right, accumulator);

  if (!right || left < right) {
    return left;
  }
  if (!left || right < left){
    return right;
  }
  return left;
}

module.exports = {
  Node,
  minimumDepthTree,
}
