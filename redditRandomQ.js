var Q = {};

// Define a function that returns n lines of Pascal’s Triangle.
Q.returnAllRowOfPascalBeforeNLoop = function(nbrToReach) {
	var arrToReturn = [[1],[1,1]];
	if (nbrToReach <= 1) {
		return [[1]];
	} else if (nbrToReach === 2) {
		return arrToReturn;
	}

	for (var row = 1; row < nbrToReach -1; row++) {
		// Building the next row inside currArr.
		var arrNm1 = arrToReturn[row];
		// console.log(arrNm1, arrToReturn);
		var currArr = [];
		for (var i = 0; i <= arrNm1.length; i++) {
			var xM1Nbr = arrNm1[i-1] | 0;
			var xNbr = arrNm1[i] | 0;
			currArr.push(xM1Nbr + xNbr);
		}
		// console.log("position: ", row, currArr);
		arrToReturn.push(currArr);
	}
	return arrToReturn;
};

function factorialMeThis(nbr) {
	if (nbr > 20) {
		// TOO LARGE.
		return 0;
	}
	if (nbr <= 1) {
		return 1;
	} else {
		return factorialMeThis(nbr - 1) * nbr;
	}
}

Q.returnRowOfPascalBeforeNMath = function(rowNbr) {
	var arrToReturn = [];
	rowNbr --;
	for (var i = 0; i <= rowNbr; i++) {
		arrToReturn[i] = factorialMeThis(rowNbr)/(factorialMeThis(i)*factorialMeThis(rowNbr-i));
	}
	return arrToReturn;
};

Q.theMostFrequentStringInArray = function(arrOfStr) {
	// step1: find all string
	var fullSentense = arrOfStr.join(',');
	var	maximumFound = 0;
	var maxString = "";

	for (var strItem = 0; strItem < arrOfStr.length; strItem++) {
		var strToCheck = arrOfStr[strItem];
		if (strToCheck !== maxString) {
			var re = new RegExp(arrOfStr[strItem],"g");
			var nbrOfMatch = fullSentense.match(re);
			// console.log("match is: ",nbrOfMatch);
			if (nbrOfMatch.length > maxString) {
				maximumFound = fullSentense.match(re).length;
				maxString = arrOfStr[strItem];
				// console.log(maximumFound, maxString);
			}
		}
	}
	return maxString;
};


// Given a collection of words, find which of the words exist in a matrix of latters.
// Example:
// Given the matrix bellow, find the words “ALL” and “LOAN”  All = 0, LOAN = 1. Assume Case sensitive?

// [['A','G','H','N'],
// ['U','L','O','A'],
// ['N','M','L','K'],
// ['L','B','V','M']]

Q.findWordInArray = function(wordToCheck, arrOfArr) {
	// Here we assume the type is good. 
	if (wordToCheck && arrOfArr) {
		var concatArray = arrOfArr.toString().replace(/,/g, '');
		if (concatArray.indexOf(wordToCheck) > -1) {
			// Gatcha!
			return true;
		} else {
			// word is missing.
			return false;
		}
	} else {
		return false;
	}
	
}


exports.Q = Q;





