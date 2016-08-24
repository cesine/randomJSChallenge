
/*jshint esversion: 6 */
// https://codefights.com/challenge/2c7Jcq5H2FM9RbQ77/main
// Given two numbers n and m, find their digital average.
// The digital average can be calculated only if all digits in their sum are even. To obtain the digital average, each digit of this sum should be divided by 2.
// If the digital average cannot be calculated, return -1 instead.
// Example
// For n = 273 and m = 415, the output should be
// middleNumber(n, m) = 344.
// n + m = 688. 6 / 2 = 3, and 8 / 2 = 4. Thus, the answer is 344.

var Q = {};

Q.middleNumber = (n, m) => {
  // This work in 10ms and with big number. But it was mainly to play with split. It is not a Viable function.
  'use strict';
  let sum = (n+m).toString();
  let total = sum.split('').map(obj => {return ~~obj / 2;}).join('');
  if (total != parseInt(total)) { return -1; } // The ~~ would not work for number larger than 1Billion.
  return parseInt(total);
};

Q.middleNumberCute = (n, m) => {
  // This work in 10ms and with big number.
  'use strict';
  let sum = (n+m);
  if(/[13579]/.test(sum)) {
    return -1;
  } else {
    // Only return if the Sum is ALL Pair number.
    return sum / 2;
  }
};

// This is the winner's solution. Works on 11ms
// Dosent work for number larger than 1Billion. Not sure why.
Q.WinnerSolution = (n, m) => -/[13579]/.test(n += m) | n/2;
exports.Q = Q;
