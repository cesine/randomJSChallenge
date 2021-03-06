// S,me q,estion I,f,und here: http://www.thatjsdude.com/interview/js1.html#isPrime

// Q1: check Prime
// Question: How would you verify a prime number?  Note: a Prime is only divisable by itself and by 1.
function isTheNumberPrime(numberToValidate) {
  // If pair and more than 2 then skip:
  // edge cases:
  if (numberToValidate > 2 && numberToValidate % 2 === 0) {
    console.log('Divisible by 2');
    return false;
  }
  if (numberToValidate === 1 || numberToValidate === 2) {
    return true;
  }
  for (let i = 3; i < numberToValidate - 1; i++) {
    if (numberToValidate % i === 0) {
      console.log('Divisible by: ', i);
      return false;
    }
  }
  // Nothing made it fail
  return true;
}

function testQ1() {
  console.log('Testing prime Number');
  // Test:
  const numberToTest = [2, 3, 5, 7, 12, 115, 977];
  const totalFaillingNumber = [];
  // Note: 12 and 115 is NOT a prime number
  for (let i = 0; i < numberToTest.length; i++) {
    if (!isTheNumberPrime(numberToTest[i])) {
      totalFaillingNumber.push(numberToTest[i]);
      console.log(numberToTest[i], ' is not Prime');
    }
  }

  if (totalFaillingNumber.length === 2) {
    console.log('Success!!!');
  } else {
    console.log('somethign is wrong.');
  }
}
// testQ1();


// 2. Prime Factors
// Question: How could you find all prime factors of a number?
function listOfAllPrimeNumber(numberToEvaluate) {
  const listOfAllPrime = [];
  for (let i = 2; i < numberToEvaluate; i++) {
    if (isTheNumberPrime(i)) {
      listOfAllPrime.push(i);
    }
  }
  console.log(listOfAllPrime);
  return listOfAllPrime;
}

// Q2 section2: If a number X find all Prime of that could multiply to that number.
function primeFactorOfTheNumber(numberToEvaluate) {
  primeArray = listOfAllPrimeNumber(numberToEvaluate);
  const listOfAllPrimeFactor = [];
  let division = numberToEvaluate / 2;
  for (let i = 0; i < primeArray.length && i < division; i++) {
    division = numberToEvaluate / primeArray[i];
    if (primeArray.indexOf(division) > 0) {
      listOfAllPrimeFactor.push(primeArray[i]);
      listOfAllPrimeFactor.push(division);
    }
  }
  return listOfAllPrimeFactor;
}


function testQ2() {
  console.log('Listing the prime Number');
  // expect 25 Prime number bellow 100.
  const WikiListOfprime = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97];
  console.log(WikiListOfprime.length === listOfAllPrimeNumber(100).length);
  console.log([3, 23].toString() === primeFactorOfTheNumber(69).toString());
}
// testQ2();


// 3. Fibonacci
// Question: How do get nth Fibonacci number?  ie: fn-1 + fn Starting at 1.
function getFibonacciNbr(positionToEvaluate, initialArray) {
  if (!initialArray) {
    initialArray = [0, 1];
  }
  if (initialArray.length > positionToEvaluate) {
    return initialArray[initialArray.length - 1];
  }
  // Keep adding
  const NextElementToPush = initialArray[initialArray.length - 2] + initialArray[initialArray.length - 1];
  // console.log("currently adding " + NextElementToPush);
  initialArray.push(NextElementToPush);
  return getFibonacciNbr(positionToEvaluate, initialArray);
}

function Fibonacci(n) {
  // Recursion Exemple from the internet ==> SUPER Slow!!!
  if (n <= 1) {
    return n;
  }
  return Fibonacci(n - 1) + Fibonacci(n - 2);
}

function getFiboinLoop(positionToEvaluate) {
  const initialArray = [0, 1];
  for (let i = 2; i <= positionToEvaluate; i++) {
    initialArray[i] = initialArray[i - 1] + initialArray[i - 2];
  }
  // console.log(initialArray);
  return initialArray[positionToEvaluate];
}


function testQ3() {
  console.log('Testing Fibonacci');
  const wikiSequence = [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55.89];
  console.log('wikiPos3: ', wikiSequence[3] == Fibonacci(3));
  console.log('wikiPos9: ', wikiSequence[9] == Fibonacci(9));
  console.log('wikiLoop9: ', wikiSequence[9] == getFiboinLoop(9));
  const initial = Date.now();
  const recursiveBig = Fibonacci(40);
  const timeRecursive = Date.now();
  const loopBig = getFiboinLoop(10000);
  const loopRecursive = Date.now();
  console.log('Recursive: ', timeRecursive - initial);
  console.log('LoopTime :', loopRecursive - timeRecursive);
}
// testQ3();


// 4. Greatest Common Divisor
// Question: How would you find the greatest common divisor of two numbers?
// ex: 100 and 200 would divide both by 100, 50, but max is 100. right?
// Option1: List all divisor of the smallest number and find the max of the other number.
function maxDivisorOfBothNumber(number1, number2) {
  let min = number1;
  let max = number2;
  if (number2 < number1) {
    min = number2;
    max = number1;
  }
  // Step1: extract all possible divisor of Numb1
  function listAllDivisor(number) {
    const listToReturn = [];
    let max = number;
    for (let i = 0; i <= max; i++) {
      if (number % i === 0) {
        max = number / i;
        listToReturn.push(i);
        listToReturn.push(max);
      }
    }
    return listToReturn;
  }

  const allPossibleDivisor = listAllDivisor(min).sort((a, b) => a - b); // So we have the maximum in order
  // But this can be really expensive
  for (let divisor = allPossibleDivisor.length - 1; divisor >= 0; divisor--) {
    if (max % allPossibleDivisor[divisor] === 0) {
      return allPossibleDivisor[divisor];
    }
  }
}

function maxDivisionInLoop(number1, number2) {
  const divisor = 2;
  const maxDivisor = 1;

  if (number1 < 2 || number2 < 2) {
    return 1;
  }

  for (let i = number1; i >= 1; i--) {
    if (number1 % i === 0 && number2 % i === 0) {
      // Found it!!! --> Assuming nbr1 < 2
      return i;
    }
  }
}

function greatestCommonDivisor(a, b) {
  if (b === 0) { return a; }
  return greatestCommonDivisor(b, a % b);
}

// (100, 150)
// (150, 100%150 = 100)
// (100, 150%100 = 50)
// (50, 100%50 = 0)
// return 50

// (14, 21)
// (21, 14%21 = 14)
// (14, 21%14 = 7)
// (7, 14%7 = 0)
// return 7

function testQ4() {
  // First attemp with list all but expensive
  console.log('Testing Commond Divisor');
  console.log('testing 100: ', maxDivisorOfBothNumber(100, 200) === 100);
  console.log('Testing 75: ', maxDivisorOfBothNumber(150, 225) === 75);
  console.log('Testing 14 & 21: ', maxDivisorOfBothNumber(14, 21) === 7);
  console.log('Testing 69 & 169: ', maxDivisorOfBothNumber(69, 169) === 1);

  // Loop attemp
  console.log('testing 100: ', maxDivisionInLoop(100, 200) === 100);
  console.log('Testing 75: ', maxDivisionInLoop(150, 225) === 75);
  console.log('Testing 14 & 21: ', maxDivisionInLoop(14, 21) === 7);
  console.log('Testing 69 & 169: ', maxDivisionInLoop(69, 169) === 1);

  // Fancy solution
  console.log('testing 100: ', greatestCommonDivisor(100, 200) === 100);
  console.log('Testing 75: ', greatestCommonDivisor(150, 225) === 75);
  console.log('Testing 14 & 21: ', greatestCommonDivisor(14, 21) === 7);
  console.log('Testing 69 & 169: ', greatestCommonDivisor(69, 169) === 1);
}
// testQ4();


// 5. remove Duplicate
// Question: How would you remove duplicate members from an array?
// Assume Number And Text
function returnOnlyUnique(arrayToCheck) {
  const uniqueArray = [];

  for (let item = 0; item < arrayToCheck.length; item++) {
    if (uniqueArray.indexOf(arrayToCheck[item]) == -1) {
      uniqueArray.push(arrayToCheck[item]);
    }
  }

  // console.log(uniqueArray);
  return uniqueArray;
}

function testQ5() {
  console.log('Removing Duplicate test');
  // Note: To test a more precice array we need to build a custon check function for the validation.
  console.log([1, 2, 3, 4, 5].toString() == returnOnlyUnique([1, 2, 3, 3, 4, 4, 4, 5]).toString());
  console.log([1, 'asd', 'abc', 4, 5].toString() == returnOnlyUnique([1, 'asd', 'abc', 'asd', 'abc', 4, 4, 4, 5]).toString());
}
// testQ5();

// 6. merge two sorted array
// Question: How would you merge two sorted array?
// ex: [1,2,5] + [3,4,6] = [1,2,3,4,5,6] ?
// is it number or Text???? I assume it is number if we say they are "sorted???"
function mergeThoseArray(array1, array2) {
  // Concat + sort.
  let combinedArray = [];
  combinedArray = array1.concat(array2).sort((a, b) => a - b);
  return combinedArray;
}

function testQ6() {
  console.log('Merge 2 sorted Array');
  console.log(mergeThoseArray([1, 2, 5], [3, 4, 6]));
  console.log([1, 2, 3, 4, 5, 6].toString() === mergeThoseArray([1, 2, 5], [3, 4, 6]).toString());
  console.log([1, 2, 2, 3, 5, 6, 9, 29].toString() === mergeThoseArray([2, 5, 6, 9], [1, 2, 3, 29]).toString());
}
// testQ6();

// 7. swap number without temp
// Question: How would you swap two numbers without using a temporary variable?
function swapnumber(a, b) {
  console.log('before swap: ', 'a: ', a, 'b: ', b);
  b -= a;
  	a += b;
  	b = a - b;
  console.log('after swap: ', 'a: ', a, 'b: ', b);
}

function swapNumb(a, b) {
  console.log(`a: ${a} and b: ${b}`);
  a ^= b;
  console.log('newA:', a);
  b = a ^ b;
  console.log('newB:', b);
  a ^= b;
  console.log('newA2:', a);
  console.log(`a: ${a} and b: ${b}`);
}

function testQ7() {
  // impossible to test this one??
  // Note: Did not find the answer because it is SUPER strange to do. no real application on this.
  console.log(swapnumber(2, 5));
  swapNumb(3, 10);
}
// testQ7();

// 8. string reverse
// Question: How would you reverse a string in JavaScript?
function reverseString(strToReverse) {
  // Lazy Way:
  return strToReverse.split('').reverse().join('');
}

function reverseStringRecu(strToReverse, reversedArr) {
  // NO idea why this dosent work reversedArr is not a array. and I overkilled the recursion!?! Lets make it complex!?! :(
  if (typeof strToReverse === 'string') {
    strToReverse = strToReverse.split('');
  }
  if (!reversedArr) {
    console.log('reverse is Empty');
    reversedArr = [];
  }
  if (strToReverse.length === 0) {
    return reversedArr.join('');
  }
  const popped = strToReverse.pop();
  reversedArr = reversedArr.push(popped);
  console.log(reversedArr, strToReverse, popped);
  return reverseStringRecu(strToReverse, reversedArr);
}

function reverseStr(str) {
  if (str === '') {
    return '';
  }
  return reverseStr(str.substr(1)) + str.charAt(0);
}

String.prototype.protoReverseString = function () {
  if (!this || this.length < 2) {
    return this;
  }
  return this.split('').reverse().join('');
};

function testQ8() {
  console.log(reverseString('gfedcba'));
  console.log(reverseString('gfedcba') === 'abcdefg');
  console.log(reverseString('edud ecin a era uoy') === 'you are a nice dude');

  // RecusrivedWay
  console.log(reverseStr('gfedcba'));
  console.log(reverseStr('gfedcba') === 'abcdefg');
  console.log(reverseStr('edud ecin a era uoy') === 'you are a nice dude');


  console.log('gfedcba'.protoReverseString());
  console.log('gfedcba'.protoReverseString() === 'abcdefg');
  console.log('edud ecin a era uoy'.protoReverseString() === 'you are a nice dude');
}
// testQ8();

// 9. reverse words
// Question: How would you reverse words in a sentence? --> Without using the simple split and reverse :)
const reverseMapThisSentense = function(strToReverse) {
  const arrayOfWord = strToReverse.split(' ');
  const arrToReturn = [];
  arrayOfWord.map((str) => {
    arrToReturn.unshift(str);
  });
  return arrToReturn.join(' ');
}

const reverseRecuThisSentense = function(strToReverse) {
  const nextSpace = strToReverse.indexOf(' ');
  if (nextSpace < 0) {
    return strToReverse;
  }
  return `${reverseRecuThisSentense(strToReverse.substr(nextSpace + 1))} ${strToReverse.substr(0, nextSpace)}`;
}

// 10. reverse in place
// Question: If you have a string like "I am the good boy". How can you generate "I ma eht doog yob"? Please note that the words are in place but reverse.

const Q10 = {};

Q10.reverseMapInPlace = function (strToModify) {
  const arrToModify = strToModify.split(' ');
  const reversedArray = arrToModify.map(obj => obj.split('').reverse().join(''));
  return reversedArray.join(' ');
};

Q10.reverseRecuInPlace = function (strToModify) {
  const nextSpace = strToModify.indexOf(' ');
  if (nextSpace < 0) {
    return reverseStr(strToModify);
  }
  const reverseWord = strToModify.substr(0, nextSpace);
  // make the recursion
  return `${reverseStr(reverseWord)} ${Q10.reverseRecuInPlace(strToModify.substr(nextSpace + 1))}`;
};


// 11. First non repeating char
// Question: How could you find the first non repeating char in a string? (small string,)
const Q11 = {};

Q11.giveMeFirstRepeatChar = function (strToInvestigate) {
  let miniString = strToInvestigate;
  // if (strToInvestigate.length > 1000) {
  // TODO: Loop trough the rest later
  miniString = strToInvestigate.substr(0, 1000).replace(/ /g, '');
  const uniqueValue = [];
  const totalLength = miniString.length;
  for (let i = 0; i < totalLength; i++) {
    if (uniqueValue.indexOf(miniString[i]) == -1) {
      uniqueValue.push(miniString[i]);
    } else {
      // This was found already so Send it.
      return miniString[i];
    }
  }
  // }
  // No unique item was found.
  return false;
};

Q11.giveMeFirstNonRepeatChar = function (strToInvestigate) {
  const len = strToInvestigate.length;
  for (let charAt = 0; charAt < len; charAt++) {
    if (strToInvestigate.indexOf(strToInvestigate[charAt]) === strToInvestigate.lastIndexOf(strToInvestigate[charAt])) {
      return strToInvestigate[charAt];
    }
  }
  // No unique car
  return false;
};


// 15. missing number
// Question: from a unsorted array of numbers 1 to 100 excluding one number, how will you find that number.
// First guess: Sort the array and go trough it.
// Second guess: if all are there, just loop until you find one.

const Q15 = {};

Q15.sortAndLoop = function (arrayToCheck) {
  arrayToCheck.sort((a, b) => a - b);
  for (let i = 0; i < arrayToCheck.length; i++) {
    // this is problematic for first and last number. but can be applied to any number
    if (arrayToCheck[i] + 1 < arrayToCheck[i + 1]) {
      return arrayToCheck[i] + 1;
    }
  }
  return false;
};

function getMaxOfArray(numArray) {
  return Math.max.apply(null, numArray);
}

Q15.loopAndCheckMissing = function (arrayToCheck) {
  const maximum = getMaxOfArray(arrayToCheck);
  // console.log(maximum);
  for (let i = arrayToCheck.length - 1; i >= 0; i--) {
    if (arrayToCheck[i] < maximum && arrayToCheck.indexOf(arrayToCheck[i] + 1) == -1) {
      return arrayToCheck[i] + 1;
    }
  }
  return false;
};

Q15.doItMathStyle = function (arrayToCheck) {
  // Here we assume the array always atart at 1 ??
  const len = arrayToCheck.length;
  sumOfTheArray = 0;
  expectedSum = (len + 1) * (len + 2) / 2;

  sumOfTheArray = arrayToCheck.reduce((before, item) => before + item);
  // console.log("sum Of the array: ",sumOfTheArray, expectedSum);
  return expectedSum - sumOfTheArray;
};


// 16. Sum of two
// Question: From a unsorted array, check whether there are any two numbers that will sum up to a given number?
// I would go reverse, Find all divisor pair of that number and check if both are part of the array.

const Q16 = {};

Q16.isDivisorPartOfTheArray = function (nbrToDivide, arrayToCheck) {
  function giveMeAllDivisorPair(nbrToCheck) {
    let max = nbrToCheck;
    const arrToReturn = [];
    for (let i = 1; i < max; i++) {
      if (nbrToCheck % i === 0) {
        max = nbrToCheck / i;
        arrToReturn.push([i, max]);
      }
    }
    return arrToReturn;
  }
  const divisorPairList = giveMeAllDivisorPair(nbrToDivide);

  for (let pair = divisorPairList.length - 1; pair >= 0; pair--) {
    const minDiv = divisorPairList[pair][0];
    const maxDiv = divisorPairList[pair][1];
    if (arrayToCheck.indexOf(minDiv) > -1 && arrayToCheck.indexOf(maxDiv) > -1) {
      // Found a Match
      return true;
    }
  }
  return false;
};

Q16.istheSUMthere = function (nbrToAddTo, arrayToCheck) {
  for (let i = arrayToCheck.length - 1; i >= 0; i--) {
    for (let j = 0; j < i; j++) {
      if (arrayToCheck[j] + arrayToCheck[i] === nbrToAddTo) {
        // console.log("Bingo: ", arrayToCheck[j],arrayToCheck[i],nbrToAddTo);
        return true;
      }
    }
  }
  return false;
};

Q16.isTheSumBySoustraction = function (nbrToAddTo, arrayToCheck) {
  let difference = {},
    len = arrayToCheck.length;

  for (let item = arrayToCheck.length - 1; item >= 0; item--) {
    const remaining = nbrToAddTo - arrayToCheck[item];
    if (difference[remaining]) {
      return true;
    }
    difference[arrayToCheck[item]] = true;
  }
  return false;
};

// 18. Counting Zeros
// Question: Count Total number of zeros from 1 upto n?
// Answer: If n = 50. number of 0 would be 11 (0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100). Please note that 100 has two 0. This one looks simple but little tricky

const Q18 = {};

Q18.countNbrOfZeroUpToN = function (nbrToReach) {
  let nbrOfZ = 0;
  for (let i = nbrToReach; i >= 0; i--) {
    const str = `${i}`;
    const nbrToAdd = str.match(/0/g);
    if (nbrToAdd) {
      // console.log(str, nbrToAdd);
      nbrOfZ += nbrToAdd.length;
    }
  }
  return nbrOfZ;
};


// Write a mul function which will produce the following outputs when invoked:
// javascript console.log(mul(2)(3)(4)); // output : 24 console.log(mul(4)(3)(4)); // output : 48
const Qmul = {};

Qmul.recuMult = function (x, sum = 1) {
  console.log('this is X: ', x, sum);
  if (!x) { return sum; }

  return (y) => Qmul.recuMult(y, x * sum);
};

Qmul.mul = x => y => z => x * y * z;

module.exports = {
  reverseMapThisSentense,
  reverseRecuThisSentense,
  Q10,
  Q11,
  Q15,
  Q16,
  Q18,
  Qmul,
};
