// Some interview question I found on GlassDoor for that precice cie. 

var Q = {};
//Q1 Make a function to solve a Suduko.
Q.solveThisSudoku = function(initialSudoku, previousPossibility) {
	// Step1 Split each in col-row-block for easy validation.????
	var rowMatrix = initialSudoku;
	var colMatrix = Q.transposeHorisontal(rowMatrix);
	// console.log("COLL D.but: ", colMatrix);
	var boxMatrix = [];
	var blockInsideMatrix = [[0, 0], [0, 3], [0, 6], [3, 0], [3, 3], [3, 6], [6, 0], [6, 3], [6, 6]];
	for (var i = 0; i < blockInsideMatrix.length; i++) {
		// console.log("Calling extractBlockOf3by3 with: ", blockInsideMatrix[i], i);
		boxMatrix.push(Q.extractBlockOf3by3(rowMatrix, blockInsideMatrix[i][0], blockInsideMatrix[i][1]));
	}

	// Step1 Checkif the sudoku match the Rules.
	if (validateSudoku(rowMatrix) === false) {
		console.log("Stopped because Matrix is not Sudoku anymore");
		return rowMatrix;
	}
	if (validateSudoku(colMatrix) === false) {
		console.log("Stopped because COL Matrix is not Sudoku anymore");
		return rowMatrix;
	}
	if (validateSudoku(boxMatrix) === false) {
		console.log("Stopped because the BOX Matrix is not Sudoku anymore");
		return rowMatrix;
	}

	// Step2: extract all possible number for each Row and columns.
	var rowPossibility = Q.returnRemaningPossibility(rowMatrix);
	var colPossibility = Q.returnRemaningPossibility(colMatrix);
	var boxPossibility = Q.returnRemaningPossibility(boxMatrix);
	var allPossibility = rowPossibility.join('').length + colPossibility.join('').length + boxPossibility.join('').length;
	// console.log("Row possiblity: ",rowPossibility);
	// console.log("Col possiblity: ",colPossibility);
	// console.log("Box possiblity: ",boxPossibility);
	console.log("ALL POSS: ",allPossibility);
	if (allPossibility === 0 || previousPossibility === allPossibility) {
		// All completed the matrix.
		// console.log(RowrowPossibility);
		console.log("Stopped by possibility:", allPossibility);
		return rowMatrix;
	} else {

		// For row 1 show all possiblity
		// console.log("Matrix Middle: ", rowMatrix);
		// Check each Cell if we can input only 1 number then Add it. and loop again.
		for (var row = 0; row < 9; row++) {
			// Go trough Each cell and if there is only 1 possibility then take it and move on. 
			for(var col = 0; col < 9; col++) {
				if (rowMatrix[row][col] === undefined) {
					var box = (Math.floor(row/3))*3+Math.floor(col/3);

					var cellPos = Q.returnitemPresentInAllarray(rowPossibility[row], colPossibility[col], boxPossibility[box]);
					if (cellPos.length === 1) {
						console.log("Found: " + cellPos[0], "at B:" + box + " R: " + row + " C: " + col, rowPossibility[row], colPossibility[col], boxPossibility[box]);
						rowMatrix[row][col] = cellPos[0];
						// console.log("Found: " + cellPos[0], " at R: " + row + " C: " + col);
					}
				}
			}
		}
		// Make another loop to find other unique possibility
		return Q.solveThisSudoku(rowMatrix, allPossibility);
	}
};

Q.returnitemPresentInAllarray = function(arr1, arr2, arr3) {
	var oneToNine = [1,2,3,4,5,6,7,8,9];
	return oneToNine.filter(function(obj) {
		if (arr1.indexOf(obj) > -1 && arr2.indexOf(obj) > -1 && arr3.indexOf(obj) > -1) {
			return obj;
		}
	});
};

Q.returnRemaningPossibility = function(matrix) {
	possibility = [];
	for(var row = 0; row < matrix.length; row++) {
		possibility[row] = returnAllremaningPossibility(matrix[row]);
	}
	return possibility;
};

function returnAllremaningPossibility(arr) {
	var oneToNine = [1,2,3,4,5,6,7,8,9];
	 return oneToNine.filter(function(value) {
		if (arr.indexOf(value) === -1) {
			return value;
		}
	});
}

function makeLetWorkInES5 (arrayToCopy) {
	// dosent have acces to Let so it mix all my data.
	return arrayToCopy.map(function(obj) {return obj;});
}

Q.transposeHorisontal = function (arr) {
	if (!arr) {return false;}

	var transpodedArr = [];
	for(var row = 0; row < arr.length; row++) {
		var thisColumnsArray = [];
		for(var columns = 0; columns < arr[row].length; columns++) {
			thisColumnsArray.push(arr[columns][row]);
		}
		transpodedArr.push(thisColumnsArray);
	}
	return transpodedArr;
};

function validateSudoku(sudokuToCheck) {
	// Rules: 
	// - Each row can only have unique value from 1 to 9. 
	// - Each columns can only have unique value from 1 to 9. 
	// - Each Block of 3x3 must have all value from 1 to 9.

	// Check each Row block
	for(var row = 0; row < sudokuToCheck.length; row++) {
		if (Q.validateAllNbrInArr(sudokuToCheck[row]) === false) {
			return false;
		}
	}
	return true;
}

Q.validateAllNbrInArr = function(arr) {
		var notLinkArray = makeLetWorkInES5(arr);
		var sortedArr = notLinkArray.sort(); //Work only for 1 to 9, after I need to specify a function otherwise 1,10,2 will happen.
		for(var i = 0; i <= sortedArr.length; i++) {
			if (sortedArr[i] && sortedArr[i + 1] && sortedArr[i] === sortedArr[i + 1]) {
				// Duplicate found.
				return false;
			}
		}
		return true;
};

Q.extractBlockOf3by3 = function (arr, rowOffset, colOffset) {
	// console.log("Array of: ", arr, rowOffset, colOffset);
	var subMatrix = [];
	for (var row = rowOffset; row < rowOffset + 3; row++) {
		for(var col = colOffset; col < colOffset + 3; col++) {
			subMatrix.push(arr[row][col]);
		}
	}
	return subMatrix;
};

//Q2 Return the number of unique integers in an array
Q.returnNumOfUniqueIntegers = function (arrToCheck) {
	var arrToReturn = [];
	var len = arrToCheck.length;
 	if (arrToCheck) {
		for(var i = 0; i < len; i++) {
			if (arrToCheck.indexOf(arrToCheck[i]) === arrToCheck.lastIndexOf(arrToCheck[i])) {
				// First and last index are the same
				arrToReturn.push(arrToCheck[i]);
			}	
		}
		return arrToReturn;
	}
};

//Q3 Return the two largest unique numbers within an array
Q.returnLargest2Nbr = function(arrToCheck) {
	var max = arrToCheck[0];
	var lastMax = arrToCheck[1];
	var len = arrToCheck.length;

	if (lastMax > max) {
		max = arrToCheck[1];
		lastMax = arrToCheck[0];
	}

	for(i = 2; i < len; i++) {
		if (arrToCheck[i] > max) {
			lastMax = max;
			max = arrToCheck[i];
		} else if(arrToCheck[i] > lastMax) {
			lastMax = arrToCheck[i];
		}
	}
	return [max, lastMax];
};

//Q4 Reverse a string in place
Q.reverseStrInPlace = function (strToReverse) {
	return strToReverse.split('').reverse().join('');
};

//Q5 2 number missing in a n number string. 
Q.findTheMissingtwo = function(arrToCheck) {
	// fixing it with a loop
	var len = arrToCheck.length;
	missing = [];
	for(var i = 0; i < len; i++) {
		if (arrToCheck[i + 1] && arrToCheck[i] < arrToCheck[i + 1] - 1) {
			missing.push(arrToCheck[i] + 1);
		}
		if (arrToCheck[i] === arrToCheck[i + 1] - 3) {
			// We have a 2 step gap here
			missing.push(arrToCheck[i] + 2);
		}
	}
	return missing;
};


// Simple Regex , Yea right. 
// Write a function that implements a regex inspired string matching algorithm with the following definition
// boolean isMatch(String pattern, String test)
// The test string only contains the characters a-z and the test string can contain
// the characters a-z and the ‘*’ character. The ‘*’ character matches 0 or more of
// any character. 
// Option Recursive or Loop.

Q.isMatch = function (strToMatch, testStr) {
	// edge cases: * ** *****
	// Step 1 remove all duplicate of ** in the regEx;
	if (!testStr) {
		if (!strToMatch) {
			console.log("We hit the last car and the last Test.");
			return true;
		}
		console.log("We hit the last Test but still have a string");
		return false;
	}

	testStr = Q.cleanTestStr(testStr); //This should be remove outside since it need to be done only once.
	if (testStr === '*') {
		console.log("Then there is only * in the string so return true");
		return true;
	}


	if (!strToMatch) {
		console.log("Meaning we passed trough ALL the string length and found nothing.");
		return false;
	} else {
		var splitTestChunk = testStr.split('*');
		if (testStr[0] === '*') {
			var chunk1 = splitTestChunk[1]; //In the case where we start with *
			var allSubstrToCheck = Q.splitinSubStrWithMatch(strToMatch, chunk1);
			// This will give me all string that I have to check.
			// meaning I have "abcabcabcabcd", "abcabcabcd", "abcabcd", "abcd" for a target of "abc"
			for (var i = 0; i < allSubstrToCheck.length; i++) {
				console.log("strToCheck: "+ allSubstrToCheck[i], "with target: " + testStr.substring(1));
				if (Q.isMatch(allSubstrToCheck[i], testStr.substring(1)) === true) {
					// We found a match deep down in one of them.
					console.log("We found a Match!!! It should stop here!",allSubstrToCheck[i], testStr.substring(1))
					return true;
				}
			}
		} else {
			var chunk0 = splitTestChunk[0];
			// "*abc*cde became abc*cde"
			// match the first one abc with the string then go deeper
			if (strToMatch.indexOf(chunk0) === 0) {
				var chunkLen = chunk0.length;
				console.log("testing anther loop with:", strToMatch.substring(chunkLen), testStr.substring(chunkLen));
				return Q.isMatch(strToMatch.substring(chunkLen), testStr.substring(chunkLen));
			} else {
				console.log("There is no wild card and the first car dosent match");

				return false;
			}
		}
	}
};

Q.splitinSubStrWithMatch = function(strToSplit, withWhat) {
	var arrOfStrToSendBack = [];
	var remaningStr = strToSplit;

	// initial Index to start at
	nextIndex = remaningStr.indexOf(withWhat);
	while (remaningStr && nextIndex > -1) {
		// aabbaaccddaa --> aabbaaccddaa
		remaningStr = remaningStr.substring(nextIndex);
		// console.log("current String to Push:", remaningStr, nextIndex);
		arrOfStrToSendBack.push(remaningStr);
		// This is after the last car, what can I get 
		nextIndex = remaningStr.indexOf(withWhat, 1);
	}
	return arrOfStrToSendBack;
};

Q.splitinSubStrRecuWithMatch = function(totalArray, strToSplit, withWhat) {
	totalArray = totalArray || [];
	// console.log(totalArray, strToSplit);
	if(!strToSplit || strToSplit.indexOf(withWhat, 1) === -1) {
		totalArray.push(strToSplit); //This dosent make sense but what the hell. 
		return totalArray;
	} else {
		strToSplit = strToSplit.substring(strToSplit.indexOf(withWhat));
		totalArray.push(strToSplit);
		return Q.splitinSubStrRecuWithMatch(totalArray, strToSplit.substring(strToSplit.indexOf(withWhat, 1)), withWhat);
	}
};


Q.cleanTestStr = function(testStr) {
	return testStr.split('').reduce(function(previous, current) {
			// console.log("Prev: ",previous, current);
		if (previous.endsWith('*') && current === '*') {
			// duplicate of **, or ***, or ab***cd
			// console.log("NOT Writing it!");
			return previous;
		} else {
			return previous +''+ current;
		}
	});
};



exports.Q = Q;
