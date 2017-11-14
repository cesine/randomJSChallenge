// The way I would build it:
const equalTarget = (nbr, list, target) => {
  for (let i = 0; i < list.length; i++) {
    if (nbr + list[i] === target) {
      return [nbr, list[i]];
    }
  }
  return false;
};

const findTarget = (nbrList, target) => {
  const tmpList = nbrList.filter(item => item <= target);
  // Longuer but cleaner:
  // return tmpList.map((nbr, i, arr) => equalTarget(nbr, [...arr].splice(i), target)).filter(item => item);

  // Less looping
  const returnList = [];
  tmpList.map((nbr, i, arr) => {
    const result = equalTarget(nbr, [...arr].splice(i), target);
    if (result) { returnList.push(result); }
    return false;
  });
  return returnList; // Or simply filter the tmpList, but that add a loop in the list.
};

// What Google/Blogs suggest:
// Java: http://k2code.blogspot.ie/2012/01/given-integer-array-and-number-x-find.html
// Java: http://k2code.blogspot.ie/2013/08/hash-tables.html#2SumProblem
// JS: https://hackernoon.com/two-sum-problem-in-javascript-156cbbd05a80
// Sooo Clever.... I wish I was that smart... :/
const hashMapTwoSum = (array, sum) => {
  const hashMap = {};
  const results = [];

  for (let i = 0; i < array.length; i++) {
    if (hashMap[array[i]]) {
      results.push([hashMap[array[i]], array[i]]);
    } else {
      hashMap[sum - array[i]] = array[i];
    }
  }
  return results;
};

module.exports = {
  findTarget,
  equalTarget,
  hashMapTwoSum,
};
