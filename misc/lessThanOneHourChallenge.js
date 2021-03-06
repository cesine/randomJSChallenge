// source: https://www.shiftedup.com/2015/05/07/five-programming-problems-every-software-engineer-should-be-able-to-solve-in-less-than-1-hour

// Problem 1
// Write three function that compute the sum of the numbers in a given list using a for-loop, a while-loop, and recursion.

const sumFor = function (arrayOfNumber) {
  let total = arrayOfNumber[0];
  for (let i = 1; i < arrayOfNumber.length; i++) {
    total += arrayOfNumber[i];
  }
  // console.log("Total is: ", total);
  return total;
};

const sumLoop = function (arrayOfNumber) {
  let total = arrayOfNumber[0];
  let i = 1;
  const len = arrayOfNumber.length;
  while (i < len) {
    total += arrayOfNumber[i];
    i++;
  }
  return total;
};

const sumRecur = function (arrayOfNumber) {
  if (arrayOfNumber.length === 1) {
    return arrayOfNumber[0];
  }
  const popped = arrayOfNumber.pop();
  // console.log(popped, arrayOfNumber);
  return sumRecur(arrayOfNumber) + popped;
};

// Problem 2
// Write a function that combines two lists by alternatingly taking elements.
// For example: given the two lists [a, b, c] and [1, 2, 3], the function should return [a, 1, b, 2, c, 3].
const mergeBothList = function (arr1, arr2) {
  let max = arr1.length;
  const finalArray = [];
  if (arr2.length > max) {
    max = arr2.length;
  }

  for (let item = 0; item < max; item++) {
    if (arr1[item]) {
      finalArray.push(arr1[item]);
    }
    if (arr2[item]) {
      finalArray.push(arr2[item]);
    }
  }
  return finalArray;
};

// Prob 3, Find Fibo Number Nth.
const fibo = function (upToNbr, arrToPushTo) {
  if (arrToPushTo === undefined) {
    var arrToPushTo = [0, 1];
  }
  const len = arrToPushTo.length;
  const n = arrToPushTo[len - 1];
  const nmin1 = arrToPushTo[len - 2];
  if (arrToPushTo.length === upToNbr) {
    return arrToPushTo;
  }
  // console.log(arrToPushTo);
  arrToPushTo.push(n + nmin1);
  return fibo(upToNbr, arrToPushTo);
};

const fiboLoop = function (upToNbr) {
  const arrToPushTo = [0, 1];
  for (let i = 2; i < upToNbr; i++) {
    arrToPushTo[i] = arrToPushTo[i - 1] + arrToPushTo[i - 2];
  }
  return arrToPushTo;
};

// Problem 4
// Write a function that given a list of non negative integers, arranges them such that they form the largest possible number.
// For example, given [50, 2, 1, 9], the largest formed number is 95021.

const largestNumberFromArray = function (arrToEvaluate) {
  const sortedArray = arrToEvaluate.sort();
  return parseInt(sortedArray.reverse().join(''));
};


const giveMeAllPossible100 = function () {
  arrayToUse = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  // It cannot be more than 5 number together.
  // To do this we need to do recursion after recursion.
  // 1+match([2,3,4,5,6,7,8,9], 99);
  // 1-match([2,3,4,5,6,7,8,9], 101);

  return ['1+2+34–5+67–8', '1+2+34–5+67–8+9', '1+2+34–5–8+9'];
};

module.exports = {
  sumFor,
  sumLoop,
  sumRecur,
  mergeBothList,
  fibo,
  fiboLoop,
  largestNumberFromArray,
  giveMeAllPossible100,
}
