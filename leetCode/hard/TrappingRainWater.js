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

const findPoolFromBox = function(box) {
  // if all side is known, return filling value.
  // if 1 side is leaking but in a lake, return Max leakage except lake.
  // Assume the matrix is 3x3;
  let leakSides = [];
  let maxHeight = 0;
  const center = box.center.value;
  const toCheck = [box.top, box.left, box.right, box.bottom]

  let minLeakage = 20001; // From the question.
  for (var i = 0; i < toCheck.length; i++) {
    if (toCheck[i].leak && toCheck[i].value < center) {
      return {
        value: center,
        leak: true,
        leakability: center,
      }
    }
    if (toCheck[i].leakability) {
      minLeakage = Math.min(minLeakage, toCheck[i].leakability);
    }
  }
  if (minLeakage < center) {
    return {
      value: center,
      leak: true,
      leakability: center,
    }
  }
  return {
    value: center,
    leak: undefined,
    leakability: minLeakage,
  }
}


// Different approch by augmenting each cell.
const walkPools = function(matrix) {
  // Step 1 = modify matrix
  const modifiedMatrix = convertArrToMetadata(matrix);
  // Generate list of unkown (where we leak vs mirror);
  // Reduce the list until no movement.
  let listOfunknown = [];
  walkPoolsUsingBoxes(modifiedMatrix, listOfunknown); // modified on spot (side effect to fix later).
  while (listOfunknown.length > 0) {
    // 1: no more unknown == No puddle
    // 2: no unknownlist do not get reduced anymore.
    let unkownLength = listOfunknown.length;
    const {nbrOfChange, keepLookingInto} = reduceListOfUnknown(modifiedMatrix, listOfunknown);
    let newlength = keepLookingInto.length;
    if (unkownLength === newlength && nbrOfChange === 0) { break; }
    listOfunknown = keepLookingInto;

  }
  // Fill All puddle
  return listOfunknown.reduce((prev, [v,h]) => (prev + modifiedMatrix[v][h].leakability - modifiedMatrix[v][h].value), 0)
}

const walkPoolsUsingBoxes = function(matrix, listOfunknown) {
  for (var v = 1; v < matrix.length - 1; v++) {
    for (var h = 1; h < matrix[0].length - 1; h++) {
      const box = {
        center: matrix[v][h],
        top: matrix[v - 1][h],
        left: matrix[v][h -1],
        right: matrix[v][h + 1],
        bottom: matrix[v + 1][h],
      };
      matrix[v][h] = findPoolFromBox(box);
      if (matrix[v][h].leak === undefined) {
        listOfunknown.push([v,h]);
      }
    }
  }
 return matrix;
}

const convertArrToMetadata = (matrix) => {
  return matrix.map((row, i) => row.map((column, j) => {
    if (i === 0 || j === 0 || i === matrix.length - 1 || j === matrix[0].length - 1) {
      return {
        value: column,
        leak: true,
        leakability: column,
      }
    }
    return {
      value: column,
      leak: undefined,
      leakability: undefined,
    }
  }));
}

const reduceListOfUnknown = (matrix, listOfunknown) => {
  const keepLookingInto = [];
  let nbrOfChange = 0;
  for (var i = 0; i < listOfunknown.length; i++) {
    const [v, h] = listOfunknown[i];
    const currentLeakLimit = matrix[v][h].leakability;
    const box = {
      center: matrix[v][h],
      top: matrix[v - 1][h],
      left: matrix[v][h -1],
      right: matrix[v][h + 1],
      bottom: matrix[v + 1][h],
    };
    matrix[v][h] = findPoolFromBox(box);
    if (matrix[v][h].leak === undefined) {
      keepLookingInto.push([v,h]);
    }
    if (currentLeakLimit !== matrix[v][h].leakability) {
      nbrOfChange++;
    }
  }
  return {nbrOfChange, keepLookingInto};
};

module.exports = {
  // findPool,
  findPoolFromBox,
  walkPools,
  walkPoolsUsingBoxes,
  convertArrToMetadata,
}
