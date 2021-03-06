// Given two words (beginWord and endWord), and a dictionary's word list, find the length of shortest transformation sequence from beginWord to endWord, such that:
//
// Only one letter can be changed at a time.
// Each transformed word must exist in the word list. Note that beginWord is not a transformed word.
// Note:
//
// Return 0 if there is no such transformation sequence.
// All words have the same length.
// All words contain only lowercase alphabetic characters.
// You may assume no duplicates in the word list.
// You may assume beginWord and endWord are non-empty and are not the same.
// Example 1:
//
// Input:
// beginWord = "hit",
// endWord = "cog",
// wordList = ["hot","dot","dog","lot","log","cog"]
//
// Output: 5
//
// Explanation: As one shortest transformation is "hit" -> "hot" -> "dot" -> "dog" -> "cog",
// return its length 5.
// Example 2:
//
// Input:
// beginWord = "hit"
// endWord = "cog"
// wordList = ["hot","dot","dog","lot","log"]
//
// Output: 0
//
// Explanation: The endWord "cog" is not in wordList, therefore no possible transformation.

// Bruteforce version that track all possible path used and return the smallest one.
const ladderLength = (beginWord, endWord, wordList) => {
  // exit early option:
    // - if he end word is not in the list exit.
  if (wordList.indexOf(endWord) === -1) return 0;
    // - if no word have a space of 1 then exit.
// Complexity: Can go from a close word to far away to come back ex: distance of 1 to 5 and back to 1.


  // List all word with a distance of 1 from the Start.
  // list the distance of 1 of each word from the end.
  // First intuition was to step toward a smaller "end", but it cannot work since multiple path migh deviate before going back to the proper end.
  const {baseMap, startlist} = buildBaseMapObj(beginWord, endWord, wordList); // {} && [];

  const allPath = [];
  startlist.map(item => listAllPossiblePath(baseMap, item, [item], allPath));
  // Here we could find all the path we have inside the allPath array.

  return Math.min(...allPath.map(item => item.length)) + 2; // +2 is the start and end word.
  // Improvement possible: (return early) as soon as we find a path of length X, if the pathUsed.length > X then exit.
  // We could do a unique pre-pass to see if the most direct path exist (always via a smaller end value), otherwise try the main flow.
  // doing an extra loop & ordering the possibilityList from smallest end first might give a small performance boust,
  // but can be tricky if we have multiple distant graph that collide only with a single point between them, but might be better for 90% of the cases.
};

const buildBaseMapObj = (beginWord, endWord, wordList) => {
  const baseMap = {};
  const startlist = [];
  for (var i = 0; i < wordList.length; i++) {
    baseMap[wordList[i]] = {
      end: getWordDistance(endWord, wordList[i]),
      start: getWordDistance(beginWord, wordList[i]),
      possibilityList: listAllDistanceOfOne(wordList[i], wordList),
      forwardlist: [], // Next loop.
    }
    if (baseMap[wordList[i]].start === 1) {
      startlist.push(wordList[i]);
    }
  }
  return {baseMap, startlist};
}

// I dont like the way i do it here since I mutate allPath, but for now it will do.
const listAllPossiblePath = (baseMap, currentObj, pathUsed, allPath) => {
  if (baseMap[currentObj].end === 1) return allPath.push(pathUsed);
  const newlistTocheck = baseMap[currentObj].possibilityList.filter(item => (pathUsed.indexOf(item) === -1));
  if (newlistTocheck.length === 0) return false; // No good end.
  return newlistTocheck.reduce((prev, curr) => listAllPossiblePath(baseMap, curr, [...pathUsed, curr], allPath), pathUsed)
}

const listAllDistanceOfOne = (word, wordList) => wordList.filter((item) => (getWordDistance(word, item) === 1));

// Trying a slightly smarter approch.
const ladderLengthSmarter = (beginWord, endWord, wordList) => {
  if (wordList.indexOf(endWord) === -1) return 0;
  const {baseMap, startlist} = buildBaseMapObj(beginWord, endWord, wordList); // {} && [];
  const globPath = { max: undefined };
  startlist.map(item => listShortestPath(baseMap, item, [item], globPath));
  return (globPath.max)? globPath.max + 2 : 0; // Start & end step.

}

const listShortestPath = (baseMap, currentObj, pathUsed, globPath) => {
  if (globPath.max && pathUsed.length >= globPath.max) return false; // Not the shortest path so stop looking.
  if (baseMap[currentObj].end === 1) return globPath.max = pathUsed.length; // Shortest path so far.

  const newlistTocheck = baseMap[currentObj].possibilityList.filter(item => (pathUsed.indexOf(item) === -1));
  if (newlistTocheck.length === 0) return false; // No good end.
  return newlistTocheck.reduce((prev, curr) => listShortestPath(baseMap, curr, [...pathUsed, curr], globPath), pathUsed)
}

// Compute the edit distance between the two given strings
// https://en.wikibooks.org/wiki/Algorithm_Implementation/Strings/Levenshtein_distance
function getWordDistance(a, b) {
  if (a.length === 0) return b.length;
  if (b.length === 0) return a.length;

  var matrix = [];

  // increment along the first column of each row
  var i;
  for (i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }

  // increment each column in the first row
  var j;
  for (j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }

  // Fill in the rest of the matrix
  for (i = 1; i <= b.length; i++) {
    for (j = 1; j <= a.length; j++) {
      if (b.charAt(i-1) == a.charAt(j-1)) {
        matrix[i][j] = matrix[i-1][j-1];
      } else {
        matrix[i][j] = Math.min(matrix[i-1][j-1] + 1, // substitution
                                Math.min(matrix[i][j-1] + 1, // insertion
                                         matrix[i-1][j] + 1)); // deletion
      }
    }
  }

  return matrix[b.length][a.length];
};

module.exports = {
  ladderLength,
  getWordDistance,
  listAllDistanceOfOne,
  listAllPossiblePath,
  ladderLengthSmarter,
};
