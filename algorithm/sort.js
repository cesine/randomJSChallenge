/**
 * Sort an input of inputs using the native sort function
 * @param input
 * @returns {Array}
 */
function native(input, compare) {
  return input.sort(compare);
}

/**
 * Swap indicies in place
 * @param input
 * @param i
 * @param j
 * @returns {*}
 */
function swap(input, i, j) {
  if (input[i] === input[j]) {
    return input;
  }
  const temp = input[i];
  // eslint-disable-next-line no-param-reassign
  input[i] = input[j];
  // eslint-disable-next-line no-param-reassign
  input[j] = temp;

  // console.log('swapped', temp, input[i]);
  return input;
}

/**
 * Move all values larger than the value at the pivot,
 * above the pivot
 *
 * Return the position where the pivot lands.
 *
 * @param input     An array to be sorted (in place)
 * @param pivot     Index of the pivot
 * @param left      Index of the left side to iterate over
 * @param right     Index of the right side to iterate over
 * @param compare   Function to compare two values
 * @returns Integer Index where the pivot landed
 */
function partition(input, pivot, left, right, compare) {
  let partitionIndex = left;
  // loops through the input from left to right
  for (let i = left; i < right; i++) {
    // if the value at the current position is larger than the pivot
    // swap it with the partitionIndex
    if (compare(input[i], input[pivot]) < 0) {
      swap(input, i, partitionIndex);
      partitionIndex++;
    }
  }

  swap(input, partitionIndex, pivot);
  // console.log('partitionIndex', partitionIndex);
  return partitionIndex;
}


/**
 * Sort all the items in the input between left and right indicies, using the compare function
 *
 * @param input     An array to be sorted (in place)
 * @param left      Index of the left side to iterate over
 * @param right     Index of the right side to iterate over
 * @param compare   Function to compare two values
 * @returns Array   Input array
 */
function qSort(input, left, right, compare) {
  if (left < right) {
    const pivot = right;
    const partitionIndex = partition(input, pivot, left, right, compare);

    qSort(input, left, partitionIndex - 1, compare);
    qSort(input, partitionIndex + 1, right, compare);
  }

  return input;
}

/**
 * Sort an input of inputs using the quicksort algorithm
 * @param input
 * @returns {Array}
 */
function quicksort(input, compare) {
  return qSort(input, 0, input.length - 1, compare);
}

module.exports = {
  native,
  quicksort,
  partition,
  swap,
};
