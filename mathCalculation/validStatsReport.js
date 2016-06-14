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
		sum += arrayOfTrial[i].reduce(function(a, b) {
			return a + b;
		});
	}
	var rounded = sum / totalLength;
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

	return rowByRowArray.reduce(function(a, b) {
		return a + b;
	}) / rowByRowArray.length;
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
	return rbarArray.reduce(function(a, b) {
		return a + b;
	}) / rbarArray.length;
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

spc.returnAllAnalysis = function(arrOfoperator, min, max, roundTo) {
	// What to extract = >
	// Repeatability of Equipment Variation, %E.V.
	// Reproducibility Operator Variation, %A.V.
	// Repeatability and Reproducibility (R&R), %R.&R.

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

	var rev = revHardcodedVal * spc.rDoubleBarAvg(arrOfoperator);
	var pcev = rev / (max - min);

	var rov = Math.sqrt(Math.pow((spc.xBarMinMaxDiff(arrOfoperator) * rovHardCodedVal), 2) - (Math.pow(rev, 2) / (nbrOfTrial * nbrOfpom)));
	var pcav = rov / (max - min);

	var rr = Math.sqrt(Math.pow(rev, 2) + Math.pow(rov, 2));
	var pcrr = Math.sqrt(Math.pow(pcev, 2) + Math.pow(pcav, 2));
	roundTo = roundTo || 10000000;
	return {
		rev: Math.round(rev * roundTo) / roundTo,
		pcev: Math.round(pcev * roundTo) / roundTo,
		rov: Math.round(rov * roundTo) / roundTo,
		pcav: Math.round(pcav * roundTo) / roundTo,
		rr: Math.round(rr * roundTo) / roundTo,
		pcrr: Math.round(pcrr * roundTo) / roundTo
	};
};

exports.spc = spc;

// The Cap analysis give us with some input the status if a item pass or fail
var cap = {};
// Input: 
// array of Value,
// Nominal Value, 
// Tolerance Min: positive value
// Tolerance Max, 
// zMin: What to compare the Z resulting to.

// math function dosent have StDev Need external package or just buit it myself:
function stDev(arrOfValue) {
	// The standard deviation is calculated using the "unbiased" or "n-1" method.
	var avg = cap.giveAvg(arrOfValue);

	var squareDiffs = arrOfValue.map(function(value) {
		var diff = value - avg;
		var sqrDiff = diff * diff;
		return sqrDiff;
	});

	// console.log(squareDiffs);
	var sumSqrtDiff = squareDiffs.reduce(function(a, b) {
		return a + b;
	});
	var stdDev = Math.sqrt(sumSqrtDiff / (squareDiffs.length - 1));
	// console.log("avg of diff:", sumSqrtDiff, stdDev);
	return stdDev;
}

cap.giveAvg = function(arrToCheck) {
	// return the average of the array
	return arrToCheck.reduce(function(a, b) {
		return a + b;
	}) / arrToCheck.length;
};

cap.giveStDev = function(arrToCheck) {
	// Note: this is using the n-1 unbias method.
	return stDev(arrToCheck);
};

function findMu3Signma(arrToCheck) {
	return giveAvg + 3 * cap.giveStDev(arrToCheck);
}

cap.zUpperSpec = function(target, maxTolerance, arrToCheck) {
	var avg = cap.giveAvg(arrToCheck);
	var stDev = cap.giveStDev(arrToCheck);
	// (Nominal + tolerance - average) / stDev(n-1);
	return (target + maxTolerance - avg) / stDev;
};

cap.zLowerSpec = function(target, minTolerance, arrToCheck) {
	var avg = cap.giveAvg(arrToCheck);
	var stDev = cap.giveStDev(arrToCheck);
	// (Nominal + tolerance - average) / stDev(n-1);
	return (avg - (target - Math.abs(minTolerance))) / stDev;
};


cap.cdf = function(x) {
	// http://stackoverflow.com/questions/14846767/std-normal-cdf-normal-cdf-or-error-function and wikipedia
	if (x > 7) {
		// The value is soo far away than the central that we hit the 99.9999%
		return 0;
	}
	var mean = 0,
		variance = 1; //To make it normalised 
	return 1 - 0.5 * (1 + erf((x - mean) / (Math.sqrt(2 * variance))));
};

function erf(x) {
	// save the sign of x
	var sign = (x >= 0) ? 1 : -1;
	x = Math.abs(x);

	// constants
	var a1 = 0.254829592;
	var a2 = -0.284496736;
	var a3 = 1.421413741;
	var a4 = -1.453152027;
	var a5 = 1.061405429;
	var p = 0.3275911;

	// A&S formula 7.1.26
	var t = 1.0 / (1.0 + p * x);
	var y = 1.0 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-x * x);
	return sign * y; // erf(-x) = -erf(x);
}

// Note: We require both Tolerance otherwise it is a different function
cap.findZst = function(arrToCheck, minTolerance, maxTolerance) {
	// (Min + Max)/2 / sigma(n-1)
	return ((maxTolerance + Math.abs(minTolerance)) / 2) / cap.giveStDev(arrToCheck);
};

cap.findZQuality = function(arrToCheck, target, minTolerance, maxTolerance) {
	var ZUpper = cap.zUpperSpec(target, maxTolerance, arrToCheck);
	var Zlower = cap.zLowerSpec(target, minTolerance, arrToCheck);
	var minZValue = Zlower,
		PvalHi = 0,
		PvalLow = 0;

	if (ZUpper < Zlower) {
		minZValue = ZUpper;
	}
	if (minZValue > 7) {
		// Cases where both Z are Higher than 7, Meaning the Test is virtually 100%. 
		console.log("Min is higher than 7 anyway.");
		return minZValue;
	}
	PvalHi = cap.cdf(ZUpper);
	PvalLow = cap.cdf(Zlower);

	if (PvalHi === 0 && PvalLow === 0) {
		// meaning both are higher than 7 and the test just Hit 99.999999% and dosent matter anymore
		return minZValue;
	}

	var calcNormDistr = NormSInv(Math.min(Math.max(0.0000003, 1 - PvalHi - PvalLow), 0.9999996999996));
	return Math.min(minZValue, calcNormDistr);
};

function NormSInv(p) {
	// Here I suggest using a library, but I did not wanted to add a library for 1 or 2 function. 
	var a1 = -39.6968302866538, a2 = 220.946098424521, a3 = -275.928510446969;
	var a4 = 138.357751867269, a5 = -30.6647980661472, a6 = 2.50662827745924;
	var b1 = -54.4760987982241, b2 = 161.585836858041, b3 = -155.698979859887;
	var b4 = 66.8013118877197, b5 = -13.2806815528857, c1 = -7.78489400243029E-03;
	var c2 = -0.322396458041136, c3 = -2.40075827716184, c4 = -2.54973253934373;
	var c5 = 4.37466414146497, c6 = 2.93816398269878, d1 = 7.78469570904146E-03;
	var d2 = 0.32246712907004, d3 = 2.445134137143, d4 = 3.75440866190742;
	var p_low = 0.02425, p_high = 1 - p_low; var q, r;
	var retVal;

	if ((p < 0) || (p > 1)) {
		retVal = 0;
		// "NormSInv: Argument out of range.";
	} else if (p < p_low) {
		q = Math.sqrt(-2 * Math.log(p));
		retVal = (((((c1 * q + c2) * q + c3) * q + c4) * q + c5) * q + c6) / ((((d1 * q + d2) * q + d3) * q + d4) * q + 1);
	} else if (p <= p_high) {
		q = p - 0.5;
		r = q * q;
		retVal = (((((a1 * r + a2) * r + a3) * r + a4) * r + a5) * r + a6) * q / (((((b1 * r + b2) * r + b3) * r + b4) * r + b5) * r + 1);
	} else {
		q = Math.sqrt(-2 * Math.log(1 - p));
		retVal = -(((((c1 * q + c2) * q + c3) * q + c4) * q + c5) * q + c6) / ((((d1 * q + d2) * q + d3) * q + d4) * q + 1);
	}
	return retVal;
}

cap.giveMeThePassFailStatus = function(arrToCheck, target, minTolerance, maxTolerance, minZqual) {
	var zQual = cap.findZQuality(arrToCheck, target, minTolerance, maxTolerance);
	minZqual = minZqual || 4.5;
	if (minZqual < zQual) {
		// "PASS"
		return true;
	} else {
		// "FAIL"
		return false;
	}
};

exports.cap = cap;