/**
 * Sort an array of inputs using the native sort function
 * @param input
 * @returns {Array}
 */
function native(input, compare) {
  return input.sort(compare);
}

module.exports = {
  native,
};