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
  const output = input;

  // Recursively sort sub-arrays.
  const recursiveSort = (start, end) => {
    // If this sub-array contains less than 2 elements, it's sorted.
    if (end - start < 1) {
      return;
    }
    console.log(` recursiveSort ${start} ${end}`);

    const pivotValue = output[end];
    let splitIndex = start;
    for (let i = start; i < end; i++) {
      console.log(`  ${splitIndex}:${output[splitIndex]} vs ${i}:${output[i]}`)
      if (compare(output[i], pivotValue) > 0) {
        // No swap needed
        // console.log(`    no swap ${output}`);
        continue;
      }

      // If the element just to the right of the split index,
      //   isn't this element, swap them.
      if (splitIndex !== i) {
        const temp = output[splitIndex];
        console.log(`    swap ${output} ${splitIndex}:${temp} and ${i}:${output[i]}`);
        output[splitIndex] = output[i];
        output[i] = temp;
        console.log(`      swap ${output}`);
      }

      // Move the split index to the right by one, denoting an increase in the less-than sub-array size.
      splitIndex++;
    }

    // Move the pivot value to between the split.
    if (output[end] !== output[splitIndex]) {
      console.log(`    swap pivot ${output} (${splitIndex}:${output[splitIndex]} and ${end}:${output[end]})`);
      output[end] = output[splitIndex];
      output[splitIndex] = pivotValue;
      console.log(`      swap pivot ${output}`);
    }

    // Recursively sort the less-than and greater-than arrays.
    console.log(`Sort right ${splitIndex}`);
    recursiveSort(start, splitIndex - 1);
    console.log(`Sort left ${splitIndex}`);
    recursiveSort(splitIndex + 1, end);
  };

  // Sort the entire array.
  console.log('Sort all', input);
  recursiveSort(0, input.length - 1);
  return output;
};

module.exports = {
  native,
  quicksort,
};
