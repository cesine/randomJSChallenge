// complex(ish)
//     5
//    / \
//   1   6
//  /   / \
// a   3   4
//          \
//           b
// complexArray = [5, [1, 'a', null], [6, 3, [4, null, 'b']]

// Recusrsively(ish).
const inorderTraversal = (node) => {
  // Node is always [val, left, right] and both left & right can be object null, or value.
  // End condition;
  if (!node) { return []; }
  if (typeof node !== 'object') { return [node]; }

  const [val, left, right] = node;
  if (left === undefined && right === undefined) return [val];
  return [...inorderTraversal(left), val, ...inorderTraversal(right)];
}


module.exports = {
  inorderTraversal,
}
