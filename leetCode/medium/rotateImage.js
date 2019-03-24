// You are given an n x n 2D matrix representing an image.
// Rotate the image by 90 degrees (clockwise).
//
// Note:
// You have to rotate the image in-place, which means you have to modify the input 2D matrix directly. DO NOT allocate another 2D matrix and do the rotation.
//
// Example 1:
// Given input matrix =
// [
//   [1,2,3],
//   [4,5,6],
//   [7,8,9]
// ],
//
// rotate the input matrix in-place such that it becomes:
// [
//   [7,4,1],
//   [8,5,2],
//   [9,6,3]
// ]
const rotateImage = function(matrix) {
  const n = matrix.length - 1; // Since it is Square n * n
  for (var i = 0; i < n; i++) {
    let init = matrix[0][i];
    matrix[0][i] = matrix[n - i][0];
    matrix[n - i][0] = matrix[n][n -i];
    matrix[n][n - i] = matrix[i][n];
    matrix[i][n] = init;
  }
  return matrix;
};

module.exports = {
  rotateImage,
}
