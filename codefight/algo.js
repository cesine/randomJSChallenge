
/* jshint esversion: 6 */
// https://codefights.com/challenge/2c7Jcq5H2FM9RbQ77/main
// Given two numbers n and m, find their digital average.
// The digital average can be calculated only if all digits in their sum are even. To obtain the digital average, each digit of this sum should be divided by 2.
// If the digital average cannot be calculated, return -1 instead.
// Example
// For n = 273 and m = 415, the output should be
// middleNumber(n, m) = 344.
// n + m = 688. 6 / 2 = 3, and 8 / 2 = 4. Thus, the answer is 344.

const middleNumber = (n, m) => {
  // This work in 10ms and with big number. But it was mainly to play with split. It is not a Viable function.


  const sum = (n + m).toString();
  const total = sum.split('').map(obj => ~~obj / 2).join('');
  if (total != parseInt(total)) { return -1; } // The ~~ would not work for number larger than 1Billion.
  return parseInt(total);
};

const middleNumberCute = (n, m) => {
  // This work in 10ms and with big number.


  const sum = (n + m);
  if (/[13579]/.test(sum)) {
    return -1;
  }
  // Only return if the Sum is ALL Pair number.
  return sum / 2;
};

// This is the winner's solution. Works on 11ms
// Dosent work for number larger than 1Billion. Not sure why.
const WinnerSolution = (n, m) => -/[13579]/.test(n += m) | n / 2;

// Reverse find the challenge. --> Found it, String "abcd" a*b + b*c + c*d
// https://codefights.com/challenge/ZCYFuFbwzddBXXHgp/main
// That work, now let's try shrinking it down
const weirdSum = (s) => {
  const numberStr = s.split('');
  return recursion(0, ~~numberStr.pop(), numberStr);
};

recursion = (sum, prev, remaning) => {
  if (remaning.length === 0) {
    return sum;
  }
  const next = ~~remaning.pop();
  return recursion(sum + next * prev, next, remaning);
};

// Attemp2 reduce.
const weirdSum2 = (s) => {
  let sum = 0;
  s.split('').reduce((prev, curr) => {
    sum += prev * curr;
    return curr;
  });
  return sum;
};


module.exports = {
  middleNumber,
  middleNumberCute,
  WinnerSolution,
  weirdSum,
  weirdSum2,
};
