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
function partition(input, left, right, compare) {
  const pivot = input[left + Math.floor(Math.random() * (right - left))];

  while (left <= right) {
    while (compare(input[left], pivot) < 0) {
      left ++;
    }
    while (compare(pivot, input[right]) < 0) {
      right--;
    }
    if (left <= right) {
      swap(input, left, right);
      left++;
      right--;
    }
  }
  return left;
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
    const partitionIndex = partition(input, left, right, compare);

    if (left < partitionIndex - 1) {
      qSort(input, left, partitionIndex - 1, compare);
    }
    if (partitionIndex < right){
      qSort(input, partitionIndex, right, compare);
    }
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

/**
 * Merge two arrays so that they are in order
 *
 * (according to the compare function)
 *
 * @param left       Array
 * @param right      Array
 * @param compare    Function to compare two elements
 * @returns {Array}  Sorted output
 */
function merge(left, right, compare) {
  let position = 0;
  const mergedLength = left.length + right.length;
  const output = [];

  while (position < mergedLength) {
    if (left[0] && right[0] === undefined) {
      output[position] = left.shift();
    } else if (left[0] === undefined && right[0]) {
      output[position] = right.shift();
    } else if (compare(left[0], right[0]) < 0) {
      output[position] = left.shift();
    } else {
      output[position] = right.shift();
    }
    // console.log('output', output, 'position', position);
    position++;
  }

  return output;
}

/**
 * Sort an input of inputs using the mergesort algorithm
 * @param input
 * @returns {Array}
 */
function mergesort(input, compare) {
  if (input.length < 2) {
    return input;
  }

  if (input.length === 2) {
    if (compare(input[0], input[1]) > 0) {
      return [input[1], input[0]];
    }
  }

  const middle = Math.ceil(input.length / 2);
  const left = mergesort(input.slice(0, middle), compare);
  const right = mergesort(input.slice(middle, input.length), compare);
  // console.log('left', left, 'right', right);
  return merge(left, right, compare);
}

module.exports = {
  merge,
  mergesort,
  native,
  quicksort,
  partition,
  swap,
};
