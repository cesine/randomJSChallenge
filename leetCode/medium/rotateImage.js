// You are given an n x n 2D matrix representing an image.
// Rotate the image by 90 degrees (clockwise).
//
// Note:
// You have to rotate the image in-place, which means you have to modify the input 2D matrix directly. DO NOT allocate another 2D matrix and do the rotation.
//
const rotateImage = function(matrix) {
  const n = matrix.length - 1; // Since it is Square n * n
  for (var j = 0; j < n / 2; j++) {
    for (var i = j; i < n - j ; i++) {
      let init = matrix[j][i];
      matrix[j][i] = matrix[n - i][j];
      matrix[n - i][j] = matrix[n - j][n -i];
      matrix[n-j][n - i] = matrix[i][n-j];
      matrix[i][n-j] = init;
    }
  }
  return matrix;
};

module.exports = {
  rotateImage,
}
