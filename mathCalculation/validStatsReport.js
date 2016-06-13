// This file is for 2 or 3 operator to caputre some trial data and with thos trial extract the Repatability of the measurement technique. 
var spc = {};
// Input would be: 
// Operator 1, 2 || 3. with 3 trial each.
// nbr Of sample per trial = 1 to X(10+).

// ToRun: returnAllAnalysis([[Operator1], [Operator2], [Operator3]], min, max, roundTo); See Test system for exemple. 

// Steps1 : Extract XbarUser and RbarUser for each user.
spc.xBar = function(arrayOfTrial) {
	// ArrayofTrial need to be a Array containing all trial array.
	// xBar = Average of all the trial data. 
	var sum = 0;
	var totalLength = 0;
	for (var i = 0; i < arrayOfTrial.length; i++) {
		totalLength += arrayOfTrial[i].length;
		sum += arrayOfTrial[i].reduce(function(a, b) {return a + b; });
	}
	var rounded = sum/totalLength;
	return rounded;
};

spc.rBar = function(arrayOfTrial) {
	// rBar = Max-Min of each Row and Average of that.
	var sum = 0;
	var totalLength = 0;
	var rowByRowArray = [];
	// Go Row by Row.
	for (var row = 0; row < arrayOfTrial[0].length; row++) {
		var rowArray = [];
		for (var trial = 0; trial < arrayOfTrial.length; trial++) {
			// Goes from Row by Row on Trial 1,2,3
			// Restructuring to make it Row by row first.
			rowArray.push(arrayOfTrial[trial][row]);
		}
		var localMax = getMaxOfArray(rowArray);
		var localMin = getMinOfArray(rowArray);
		rowByRowArray.push(localMax - localMin);
	}
	
	return rowByRowArray.reduce(function(a, b) {return a + b; }) / rowByRowArray.length;
};

function getMaxOfArray(numArray) {
  return Math.max.apply(null, numArray);
}
function getMinOfArray(numArray) {
  return Math.min.apply(null, numArray);
}

spc.xBarMinMaxDiff = function(arrOfoperator) {
	// Each operator have multiple trial.
	// We need to find the Maximum of all Xbar - Minimum of all Xbar.
	var xbarArray = [];
	for (var operator = arrOfoperator.length - 1; operator >= 0; operator--) {
		xbarArray.push(spc.xBar(arrOfoperator[operator]));
	}
	return (getMaxOfArray(xbarArray) - getMinOfArray(xbarArray));
};

spc.rDoubleBarAvg = function(arrOfoperator) {
	// Each operator have multiple trial.
	// We need to find the average of all RBar
	var rbarArray = [];
	for (var operator = arrOfoperator.length - 1; operator >= 0; operator--) {
		rbarArray.push(spc.rBar(arrOfoperator[operator]));
	}
	return rbarArray.reduce(function(a,b) {return a + b;}) / rbarArray.length;
};

spc.giveTheUcl = function(arrOfoperator) {
	// UCL depen dif there is 2 or 3 trial per Operator. So we can have 3 operator doign 2 trial.
	// Hardcoded multiplicated value: 
	// if 2 = 3.27,
	// if 3 = 2.58
	var multiplicator = -1;
	if (arrOfoperator[0].length === 2) {
		// console.log("2 Operator");
		multiplicator = 3.27;
	} else if (arrOfoperator[0].length === 3) {
		// console.log("3 Operator");
		multiplicator = 2.58;
	}
	// If it is not 2 or 3 I dont have the value so return 0 and crash+fix the system.
	return spc.rDoubleBarAvg(arrOfoperator) * multiplicator;
};

spc.returnAllAnalysis = function (arrOfoperator, min, max, roundTo) {
	if (!arrOfoperator || !min || !max) {
		return "error missing param";
	}
	var revHardcodedVal = -1, 
		rovHardCodedVal = -1,
		nbrOfOperator = arrOfoperator.length,
		nbrOfTrial = arrOfoperator[0].length,
		nbrOfpom = arrOfoperator[0][0].length;
	
	if (nbrOfTrial === 2) {
		// console.log("2 trial");
		revHardcodedVal = 4.56;
	} else if (nbrOfTrial === 3) {
		// console.log("3 trial");
		revHardcodedVal = 3.05;
	}
	
	if (nbrOfOperator === 2) {
		// console.log("2 Operators");
		rovHardCodedVal = 3.65;
	} else if (nbrOfOperator === 3) {
		// console.log("3 Operators");
		rovHardCodedVal = 2.7;
	}

	var rev = revHardcodedVal*spc.rDoubleBarAvg(arrOfoperator);
	var pcev = rev / (max - min);

	var rov = Math.sqrt(Math.pow((spc.xBarMinMaxDiff(arrOfoperator) * rovHardCodedVal), 2) - (Math.pow(rev, 2) / (nbrOfTrial * nbrOfpom)));
	var pcav = rov / (max - min);

	var rr = Math.sqrt(Math.pow(rev, 2) + Math.pow(rov, 2));
	var pcrr = Math.sqrt(Math.pow(pcev, 2) + Math.pow(pcav, 2));
	roundTo = roundTo || 10000000;
	return {
		rev: Math.round(rev*roundTo)/roundTo,
		pcev: Math.round(pcev*roundTo)/roundTo,
		rov: Math.round(rov*roundTo)/roundTo,
		pcav: Math.round(pcav*roundTo)/roundTo,
		rr: Math.round(rr *roundTo)/roundTo,
		pcrr: Math.round(pcrr*roundTo)/roundTo
	};
};

exports.spc = spc;

// REPEATABILITY AND REPRODUCIBILITY

// What to extract = >
// Repeatability of Equipment Variation, %E.V.
// Reproducibility Operator Variation, %A.V.
// Repeatability and Reproducibility (R&R), %R.&R.