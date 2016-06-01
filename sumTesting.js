console.log("Start of the Sum file");
'use strict'

var Sum = function (arg1, arg2) {
	if (arg1 && arg2) {
		return arg1 + arg2;
	}
	if (arg1 && arg1.length === 2) {
		return arg1[0] + arg1[1];
	}
}

// Testing section
var sumStraight = Sum(3,4);
var sumWithArray = Sum([3,4]);
console.log("sumStraight:", sumStraight === 7);
console.log("sumWithArray:", sumWithArray === 7);

