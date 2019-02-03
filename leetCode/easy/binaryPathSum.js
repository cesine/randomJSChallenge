// Given a binary tree and a sum, determine if the tree has a root-to-leaf path such that adding up all the values along the path equals the given sum.
//
// Note: A leaf is a node with no children.
//
// Example:
//
// Given the below binary tree and sum = 22,
//
//       5
//      / \
//     4   8
//    /   / \
//   11  13  4
//  /  \      \
// 7    2      1
// return true, as there exist a root-to-leaf path 5->4->11->2 which sum is 22.
const isRootToLeafSumMatch = (node, target, sum = 0) => {
  // Way of breaking:
  // - Node sum is larger than the target.
  // - We reach the leaf.
  const nodeSum = node.value + sum;
  if (nodeSum === target && !node.children) {
    return true;
  }
  if (nodeSum > target || !node.children) {
    return false; // Done going deeper since we already overshoot.
  }
  return node.children.reduce((base, branch) => {
    if (base === true) { return true; }
    return isRootToLeafSumMatch(branch, target, nodeSum);
  }, false);
}

module.exports = {
  isRootToLeafSumMatch,
}
