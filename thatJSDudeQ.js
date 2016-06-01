// S,me q,estion I,f,und here: http://www.thatjsdude.com/interview/js1.html#isPrime

// Q1: check Prime
// Question: How would you verify a prime number?  Note: a Prime is only divisable by itself and by 1. 
function isTheNumberPrime(numberToValidate) {
	// If pair and more than 2 then skip:
	// edge cases:
	if (numberToValidate > 2 && numberToValidate % 2 === 0) {
		console.log("Divisible by 2");
		return false;
	}
	if (numberToValidate === 1 || numberToValidate === 2) {
		return true;
	}
	for (var i = 3; i < numberToValidate -1; i++) {
		if (numberToValidate % i === 0) {
			console.log("Divisible by: ", i);
			return false;
		}
	}
	// Nothing made it fail
	return true;
}

function testQ1() {
	console.log("Testing prime Number");
	// Test:
	var numberToTest = [2,3,5,7,12,115,977];
	var totalFaillingNumber = [];
	// Note: 12 and 115 is NOT a prime number
	for (var i = 0; i < numberToTest.length; i++) {
		if (!isTheNumberPrime(numberToTest[i])) {
			totalFaillingNumber.push(numberToTest[i]);
			console.log(numberToTest[i], ' is not Prime');
		}
	}

	if (totalFaillingNumber.length === 2) {
		console.log("Success!!!");
	} else {
		console.log("somethign is wrong.");
	}
}
// testQ1();


// 2. Prime Factors
// Question: How could you find all prime factors of a number?
function listOfAllPrimeNumber(numberToEvaluate) {
	var listOfAllPrime = [];
	for (var i = 2; i < numberToEvaluate; i++) {
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
	var listOfAllPrimeFactor = [];
	var division = numberToEvaluate/2;
	for (var i = 0; i < primeArray.length && i < division; i++) {
		division = numberToEvaluate / primeArray[i];
		if (primeArray.indexOf(division) > 0) {
			listOfAllPrimeFactor.push(primeArray[i]);
			listOfAllPrimeFactor.push(division);
		}
	}
	return listOfAllPrimeFactor;
}


function testQ2() {	
	console.log("Listing the prime Number");
	// expect 25 Prime number bellow 100.
	var WikiListOfprime = [2,3,5,7,11,13,17,19,23,29,31,37,41,43,47,53,59,61,67,71,73,79,83,89,97];
	console.log(WikiListOfprime.length === listOfAllPrimeNumber(100).length);
	console.log([3, 23].toString() === primeFactorOfTheNumber(69).toString());
}
// testQ2();


// 3. Fibonacci
// Question: How do get nth Fibonacci number?  ie: fn-1 + fn Starting at 1. 
function getFibonacciNbr (positionToEvaluate, initialArray) {
	if (!initialArray) {
		initialArray = [0,1];
	}
	if (initialArray.length > positionToEvaluate) {
		return initialArray[initialArray.length -1];
	} else {
		// Keep adding
		var NextElementToPush = initialArray[initialArray.length -2] + initialArray[initialArray.length -1];
		// console.log("currently adding " + NextElementToPush);
		initialArray.push(NextElementToPush);
		return getFibonacciNbr(positionToEvaluate, initialArray);
	}
}

function Fibonacci(n) {
	// Recursion Exemple from the internet ==> SUPER Slow!!!
    if (n <= 1) {
        return n;
    } else {
        return Fibonacci(n - 1) + Fibonacci(n - 2);
    }
}

function getFiboinLoop (positionToEvaluate) {
	var initialArray = [0,1];
	for (var i = 2; i <= positionToEvaluate; i++) {
		initialArray[i] = initialArray[i-1] + initialArray[i-2];
	}
	// console.log(initialArray);
	return initialArray[positionToEvaluate];
}


function testQ3() {
	console.log("Testing Fibonacci");
	var wikiSequence = [0,1,1,2,3,5,8,13,21,34,55.89];
	console.log("wikiPos3: ", wikiSequence[3] == Fibonacci(3));
	console.log("wikiPos9: ", wikiSequence[9] == Fibonacci(9));
	console.log("wikiLoop9: ", wikiSequence[9] == getFiboinLoop(9));
	var initial = Date.now();
	var recursiveBig = Fibonacci(40);
	var timeRecursive = Date.now();
	var loopBig = getFiboinLoop(10000);
	var loopRecursive = Date.now();
	console.log("Recursive: ", timeRecursive - initial);
	console.log("LoopTime :", loopRecursive - timeRecursive);
}
// testQ3();


// 4. Greatest Common Divisor
// Question: How would you find the greatest common divisor of two numbers?
// ex: 100 and 200 would divide both by 100, 50, but max is 100. right?
// Option1: List all divisor of the smallest number and find the max of the other number.
function maxDivisorOfBothNumber(number1, number2) {
	var min = number1;
	var max = number2;
	if (number2 < number1) {
		min = number2;
		max = number1;
	}
	// Step1: extract all possible divisor of Numb1
	function listAllDivisor(number) {
		var listToReturn = [];
		var max = number;
		for (var i = 0; i <= max; i++) {
			if (number % i === 0) {
				max = number / i;
				listToReturn.push(i);
				listToReturn.push(max);
			}
		}
		return listToReturn;
	}

	var allPossibleDivisor = listAllDivisor(min).sort(function(a,b){return a-b;}); //So we have the maximum in order
	// But this can be really expensive
	for (var divisor = allPossibleDivisor.length - 1; divisor >= 0; divisor--) {
		if (max % allPossibleDivisor[divisor] === 0) {
			return allPossibleDivisor[divisor];
		}
	}
}

function maxDivisionInLoop(number1, number2){
	var divisor = 2;
	var maxDivisor = 1;

	if (number1 < 2 || number2 < 2) {
		return 1;
	}

	for (var i = number1; i >= 1; i--) {
		if (number1 % i === 0  && number2 % i === 0) {
			// Found it!!! --> Assuming nbr1 < 2
			return i;
		}
	}
}

function greatestCommonDivisor(a, b){
   if(b === 0)
     return a;
   else 
     return greatestCommonDivisor(b, a%b);
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
	console.log("Testing Commond Divisor");
	console.log("testing 100: ", 100 === maxDivisorOfBothNumber(100,200));
	console.log("Testing 75: ", 75 === maxDivisorOfBothNumber(150,225));
	console.log("Testing 14 & 21: ", 7 === maxDivisorOfBothNumber(14,21));
	console.log("Testing 69 & 169: ", 1 === maxDivisorOfBothNumber(69,169));

	// Loop attemp
	console.log("testing 100: ", 100 === maxDivisionInLoop(100,200));
	console.log("Testing 75: ", 75 === maxDivisionInLoop(150,225));
	console.log("Testing 14 & 21: ", 7 === maxDivisionInLoop(14,21));
	console.log("Testing 69 & 169: ", 1 === maxDivisionInLoop(69,169));

	// Fancy solution
	console.log("testing 100: ", 100 === greatestCommonDivisor(100,200));
	console.log("Testing 75: ", 75 === greatestCommonDivisor(150,225));
	console.log("Testing 14 & 21: ", 7 === greatestCommonDivisor(14,21));
	console.log("Testing 69 & 169: ", 1 === greatestCommonDivisor(69,169));	
}
// testQ4();


// 5. remove Duplicate
// Question: How would you remove duplicate members from an array?
// Assume Number And Text
function returnOnlyUnique(arrayToCheck) {
	var uniqueArray = [];
	
	for (var item = 0; item < arrayToCheck.length; item++) {
		if (uniqueArray.indexOf(arrayToCheck[item]) == -1) {
			uniqueArray.push(arrayToCheck[item]);
		}
	}

	// console.log(uniqueArray);
	return uniqueArray;
}

function testQ5 () {
	console.log("Removing Duplicate test");
	// Note: To test a more precice array we need to build a custon check function for the validation. 
	console.log([1,2,3,4,5].toString() == returnOnlyUnique([1,2,3,3,4,4,4,5]).toString());
	console.log([1,"asd","abc",4,5].toString() == returnOnlyUnique([1,"asd","abc","asd","abc",4,4,4,5]).toString());
}
// testQ5();

// 6. merge two sorted array
// Question: How would you merge two sorted array?
// ex: [1,2,5] + [3,4,6] = [1,2,3,4,5,6] ?
// is it number or Text???? I assume it is number if we say they are "sorted???"
function mergeThoseArray(array1, array2) {
	// Concat + sort.
	var combinedArray = [];
	combinedArray = array1.concat(array2).sort(function(a,b){return a-b;});
	return combinedArray;
}

function testQ6() {
	console.log("Merge 2 sorted Array");
	console.log(mergeThoseArray([1,2,5],[3,4,6]));
	console.log([1,2,3,4,5,6].toString() === mergeThoseArray([1,2,5],[3,4,6]).toString());
	console.log([1, 2, 2, 3, 5, 6, 9, 29].toString() === mergeThoseArray([2,5,6,9], [1,2,3,29]).toString());
}
// testQ6();

// 7. swap number without temp
// Question: How would you swap two numbers without using a temporary variable?
function swapnumber(a,b) {
	console.log('before swap: ','a: ', a, 'b: ', b);
	b = b -a;
  	a = a+ b;
  	b = a-b;
	console.log('after swap: ','a: ', a, 'b: ', b); 
}

function swapNumb(a, b){
  console.log("a: " + a + " and b: " + b);
  a = a ^ b;
  console.log("newA:", a);
  b = a ^ b;
  console.log("newB:", b);
  a = a ^ b;
  console.log("newA2:", a);
  console.log("a: " + a + " and b: " + b);
}

function testQ7(){
	// impossible to test this one??
	// Note: Did not find the answer because it is SUPER strange to do. no real application on this.
	console.log(swapnumber(2, 5));
	swapNumb(3, 10);
}
// testQ7();

// 8. string reverse
// Question: How would you reverse a string in JavaScript?
function reverseString (strToReverse) {
	// Lazy Way:
	return strToReverse.split('').reverse().join('');
}

function reverseStringRecu (strToReverse, reversedArr) {
	// NO idea why this dosent work reversedArr is not a array. and I overkilled the recursion!?! Lets make it complex!?! :(
	if (typeof strToReverse == 'string') {
		strToReverse = strToReverse.split('');
	}
	if (!reversedArr) {
		console.log("reverse is Empty");
		reversedArr = [];
	}
	if (strToReverse.length === 0) {
		return reversedArr.join('');
	} else {
		var popped = strToReverse.pop();
		reversedArr = reversedArr.push(popped);
		console.log(reversedArr, strToReverse, popped);
		return reverseStringRecu(strToReverse, reversedArr);
	}
}

function reverseStr (str) {
    if (str === "") {
        return "";
    } else {
        return reverseStr(str.substr(1)) + str.charAt(0);
    }
}

String.prototype.protoReverseString = function() {
	if (!this || this.length < 2) {
		return this;
	}
	return this.split('').reverse().join('');
};

function testQ8() {
	console.log(reverseString("gfedcba"));
	console.log("abcdefg" === reverseString("gfedcba"));
	console.log("you are a nice dude" === reverseString("edud ecin a era uoy"));

	// RecusrivedWay
	console.log(reverseStr("gfedcba"));
	console.log("abcdefg" === reverseStr("gfedcba"));
	console.log("you are a nice dude" === reverseStr("edud ecin a era uoy"));

	
	console.log("gfedcba".protoReverseString());
	console.log("abcdefg" === "gfedcba".protoReverseString());
	console.log("you are a nice dude" === "edud ecin a era uoy".protoReverseString());
}
// testQ8();
