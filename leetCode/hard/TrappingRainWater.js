// https://leetcode.com/problems/trapping-rain-water-ii/
// Given an m x n matrix of positive integers representing the height of each unit cell in a 2D elevation map, compute the volume of water it is able to trap after raining.
//
// Note:
// Both m and n are less than 110. The height of each unit cell is greater than 0 and is less than 20,000.
//
// Example:
// Given the following 3x6 height map:
// [
//   [1,4,3,1,3,2],
//   [3,2,1,3,2,4],
//   [2,3,3,2,3,1]
// ]
// Return 4.

const findPool = function(matrix, filler = {}) {
  // Assume the matrix is 3x3;
  let leakSides = [];
  let maxHeight = 0;
  const center = matrix[1][1];
  const top = filler.top || matrix[0][1];
  const left = filler.left || matrix[1][0];
  const right = filler.right || matrix[1][2];
  const bottom = filler.bottom || matrix[2][1];

  if (top > center) {
    maxHeight = top - center;
  } else if (top <= center) {
    maxHeight = 0;
    leakSides.push([0,1]);
  }

  if (left > center) {
    maxHeight = Math.min(maxHeight, left - center);
  } else if (left <= center) {
    maxHeight = 0;
    leakSides.push([1,0]);
  }

  if (right > center) {
    maxHeight = Math.min(maxHeight, right - center);
  } else if (right <= center) {
    maxHeight = 0;
    leakSides.push([1,2]);
  }

  if (bottom > center) {
    maxHeight = Math.min(maxHeight, bottom - center);
  } else if (bottom <= center) {
    maxHeight = 0;
    leakSides.push([2,1]);
  }


  return {
    leakSides,
    maxHeight,
    values: {
      center,
      top,
      left,
      right,
      bottom,
    }
  }
}

const findPoolFromBox = function(box, filler = {}) {
  // Assume the matrix is 3x3;
  let leakSides = [];
  let maxHeight = 0;
  const center = box.center;
  const top = filler.top || box.top;
  const left = filler.left || box.left;
  const right = filler.right || box.right;
  const bottom = filler.bottom || box.bottom;

  if (top > center) {
    maxHeight = top - center;
  } else if (top <= center) {
    maxHeight = 0;
    leakSides.push('top');
  }

  if (left > center) {
    maxHeight = Math.min(maxHeight, left - center);
  } else if (left <= center) {
    maxHeight = 0;
    leakSides.push('left');
  }

  if (right > center) {
    maxHeight = Math.min(maxHeight, right - center);
  } else if (right <= center) {
    maxHeight = 0;
    leakSides.push('right');
  }

  if (bottom > center) {
    maxHeight = Math.min(maxHeight, bottom - center);
  } else if (bottom <= center) {
    maxHeight = 0;
    leakSides.push('bottom');
  }

  return {
    leakSides,
    maxHeight,
    box: {
      center,
      top,
      left,
      right,
      bottom,
    }
  }
}

const walkPools = function(matrix) {
  const part = []
  part[0] = matrix[0].slice(0,3);
  part[1] = matrix[1].slice(0,3);
  part[2] = matrix[2].slice(0,3);
  return findPool(part).maxHeight;
}


const walkPoolsUsingBoxes = function(matrix) {
  const box = {};
  box.center = matrix[1][1];
  box.top = matrix[0][1];
  box.left = matrix[1][0];
  box.right = matrix[1][2];
  box.bottom = matrix[2][1];
  return findPoolFromBox(box).maxHeight;
}

module.exports = {
  findPool,
  findPoolFromBox,
  walkPools,
  walkPoolsUsingBoxes,
}
