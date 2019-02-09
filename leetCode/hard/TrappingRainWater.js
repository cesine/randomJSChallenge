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
  let totalFilled = 0;
  for (var v = 1; v < matrix.length - 1; v++) {
    for (var h = 1; h < matrix[0].length - 1; h++) {
      const box = {
        center: matrix[v][h],
        top: matrix[v - 1][h],
        left: matrix[v][h -1],
        right: matrix[v][h + 1],
        bottom: matrix[v + 1][h],
      };
      const addedWater = findPoolFromBox(box).maxHeight;
      totalFilled += addedWater;
      // console.log('adding water', addedWater);
      matrix[v][h] += addedWater; // local area just got water dumped inside.
    }
  }
 return totalFilled;
}

const walkPoolsUsingBoxesOutSideIn = function(matrix) {
  let totalFilled = 0;
  const rows = matrix.length;
  const columns = matrix[0].length;

  for (var v = 1; v <= rows / 2; v++) {
    for (var h = 1; h < columns / 2; h++) {
      const box = {
        center: matrix[v][h],
        top: matrix[v - 1][h],
        left: matrix[v][h -1],
        right: matrix[v][h + 1],
        bottom: matrix[v + 1][h],
      };
      let addedWater = findPoolFromBox(box).maxHeight;
      totalFilled += addedWater;
      // console.log('adding water', addedWater);
      // matrix[v][h] += addedWater; // local area just got water dumped inside.

      // 2 = 4-1
      // 4 = 6-1
      const boxMirror = {
        center: matrix[rows-v - 1][columns-h -1],
        top: matrix[rows -v - 1 - 1][columns -h-1],
        left: matrix[rows -v - 1][columns-h -2],
        right: matrix[rows -v - 1][columns-h + 0],
        bottom: matrix[rows -v - 1 + 1][columns-h-1],
      };

      addedWater = findPoolFromBox(boxMirror).maxHeight;
      totalFilled += addedWater;
      // console.log('adding water', addedWater);
      // matrix[v][h] += addedWater; // local area just got water dumped inside.
    }
  }
 return totalFilled;
}

const singlePool = [
  [1,4,4,4],
  [4,2,1,5],
  [2,6,6,6]
];

const findLocalMaximum = (matrix)  => {
  // walk until you find outside boundry.
};

// [{
//   value: 1,
//   leak: true,
// },{
//   value: 4,
//   leak: true,
// }, ...],
// ...
// [{
//   value: 4
//   leak: true
// }, {
//   value: 2
//   leakability: 4
//   leak: undefined,
// }, {
//   value: 1,
//   leak: undefined,
//   leakability: 4 from???
//
// }
// ]

module.exports = {
  findPool,
  findPoolFromBox,
  walkPools,
  walkPoolsUsingBoxes,
  walkPoolsUsingBoxesOutSideIn,
  findLocalMaximum,
}
