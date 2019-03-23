/**
 * Sort an array of inputs using the native sort function
 * @param input
 * @returns {Array}
 */
function native(input, compare) {
  return input.sort(compare);
}

/**
 * Sort an array of inputs using the quicksort algorithm
 * @param input
 * @returns {Array}
 */
function quicksort(input, compare) {
  if (input.length <= 1) {
    return input;
  }

  // median of three
  const pivot = Math.ceil(Math.max(
    input[0],
    input[input.length - 1],
    input[Math.ceil(input.length - 1 / 2)],
  ) / 2 );

  for (let i = 0; i < input.length / 2; i++) {
    const lastIndex = input.length - i - 1;
    const a = input[i];
    const b = input[lastIndex];
    if (compare(a, pivot) > 0) {
      input[i] = b;
      input[lastIndex] = a;
    }
  }


  const mid = Math.ceil(input.length / 2);
  const first = input.slice(0, mid);
  const second = input.slice(mid, input.length);

  return quicksort(first, compare).concat(quicksort(second, compare));
}

module.exports = {
  native,
  quicksort,
};