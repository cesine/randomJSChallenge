/*
 ======== A Handy Little Jasmine Reference ========
 inspired by  https://github.com/pivotal/jasmine/wiki/Matchers
 Spec matchers:
 expect(x).toEqual(y); compares objects or primitives x and y and passes if they are equivalent
 expect(x).toBe(y); compares objects or primitives x and y and passes if they are the same object
 expect(x).toMatch(pattern); compares x to string or regular expression pattern and passes if they match
 expect(x).toBeDefined(); passes if x is not undefined
 expect(x).toBeUndefined(); passes if x is undefined
 expect(x).toBeNull(); passes if x is null
 expect(x).toBeTruthy(); passes if x evaluates to true
 expect(x).toBeFalsy(); passes if x evaluates to false
 expect(x).toContain(y); passes if array or string x contains y
 expect(x).toBeLessThan(y); passes if x is less than y
 expect(x).toBeGreaterThan(y); passes if x is greater than y
 expect(x).toBeCloseTo; matcher is for precision math comparison
 expect(x).toThrow; matcher is for testing if a function throws an exception
 expect(x).toThrowError; matcher is for testing a specific thrown exception
 expect(function(){fn();}).toThrow(e); passes if function fn throws exception e when executed
 Every matcher's criteria can be inverted by prepending .not:
 expect(x).not.toEqual(y); compares objects or primitives x and y and passes if they are not equivalent
 Custom matchers help to document the intent of your specs, and can help to remove code duplication in your specs.
 beforeEach(function() {
 this.addMatchers({});
 */

// ToRun: jasmine-node validStatsReport-spec.js --verbose

var allQ = require('./validStatsReport');


describe('testing all apect of the SPC report', function() {
	var trialArrOfUserA = [[21.987, 21.992, 21.999, 21.985, 22.017, 21.958, 21.984, 21.973, 21.998, 21.998],
					[21.975, 21.999, 21.977, 21.984, 21.998, 22.012, 22.018, 21.996, 21.975, 21.996],
					[21.994, 22.012, 21.985, 21.978, 21.985, 22.005, 21.976, 21.983, 21.999, 21.972]];
	var trialArrOfUserB = [[21.967, 21.976, 21.992, 21.995, 21.996, 22.002, 21.969, 21.987, 21.97, 21.979],
					[21.985, 21.979, 21.992, 21.982, 21.986, 21.977, 21.983, 21.996, 21.975, 21.979],
					[21.986, 21.968, 21.992, 21.973, 21.986, 21.974, 21.99, 21.996, 22.001, 21.99]];
	var trialArrOfUserC = [[21.976 ,21.982 ,21.974 ,21.988 ,21.979 ,21.965 ,21.984 ,21.988 ,21.984 ,21.986],
					[21.981 ,21.988 ,22.023 ,21.999 ,21.983 ,22.011 ,21.979 ,21.985 ,21.999 ,21.984],
					[22.002 ,22.016 ,21.983 ,21.999 ,21.965 ,22.002 ,21.997 ,22.005 ,21.982 ,21.993]];
	var roundTo = 10000000;
	var allTheTrials = [trialArrOfUserA, trialArrOfUserB, trialArrOfUserC];
	var allOperator2Trial = [[trialArrOfUserA[0], trialArrOfUserA[1]], [trialArrOfUserB[0], trialArrOfUserB[1]], [trialArrOfUserC[0], trialArrOfUserC[1]]];

	// Assuming a Min = 21.94 , Max = 22.28
	var resultIf3OpAnd3Trial = {
		rev:  0.0690317,
		pcev: 0.2030343,
		rov:  0.0111536,
		pcav: 0.0328048,
		rr:   0.0699269,
		pcrr: 0.2056674
	};

	var resultIf3OpAnd2Trial = {
		rev:  0.06688,
		pcev: 0.1967059,
		rov:  0.0144422,
		pcav: 0.0424771,
		rr:   0.0684216,
		pcrr: 0.2012399
	};

	it('should check that the Xbar for each user match the template', function() {
		expect(Math.round(allQ.spc.xBar(trialArrOfUserA)*roundTo)/roundTo).toEqual(21.9903333);
		expect(Math.round(allQ.spc.xBar(trialArrOfUserB)*roundTo)/roundTo).toEqual(21.9841);
		expect(Math.round(allQ.spc.xBar(trialArrOfUserC)*roundTo)/roundTo).toEqual(21.9894);
	});

	it('should return the RBar (average of max-min of each row', function() {
		expect(Math.round(allQ.spc.rBar(trialArrOfUserA)*roundTo)/roundTo).toEqual(0.0269);
		expect(Math.round(allQ.spc.rBar(trialArrOfUserB)*roundTo)/roundTo).toEqual(0.0162);
		expect(Math.round(allQ.spc.rBar(trialArrOfUserC)*roundTo)/roundTo).toEqual(0.0248);
	});

	it('should get the difference between the maximum and minimum of the Xbar', function() {
		expect(Math.round(allQ.spc.xBarMinMaxDiff(allTheTrials)*roundTo)/roundTo).toEqual(0.0062333);
		expect(Math.round(allQ.spc.xBarMinMaxDiff([trialArrOfUserA, trialArrOfUserB])*roundTo)/roundTo).toEqual(0.0062333);
	});

	it('should get the Average of the Rbar', function() {
		expect(Math.round(allQ.spc.rDoubleBarAvg(allTheTrials)*roundTo)/roundTo).toEqual(0.0226333);
		expect(Math.round(allQ.spc.rDoubleBarAvg([trialArrOfUserA, trialArrOfUserB])*roundTo)/roundTo).toEqual(0.02155);
	});

	it('Should give the UCL value depending on the number of trial', function() {
		// 3 operator 3 trial
		expect(Math.round(allQ.spc.giveTheUcl(allTheTrials)*roundTo)/roundTo).toEqual(0.058394);
		// Trying with 2 operator and 3 trial.
		expect(Math.round(allQ.spc.giveTheUcl([trialArrOfUserA, trialArrOfUserB])*roundTo)/roundTo).toEqual(0.055599);
		// all operator but 2 trial:
		expect(Math.round(allQ.spc.giveTheUcl(allOperator2Trial)*roundTo)/roundTo).toEqual(0.04796);
	});

	it('Should match the final target value', function() {
		// Assuming a Min = 21.94 , Max = 22.28
		expect(allQ.spc.returnAllAnalysis(allTheTrials, 21.94, 22.28)).toEqual(resultIf3OpAnd3Trial);
		expect(allQ.spc.returnAllAnalysis(allOperator2Trial, 21.94, 22.28)).toEqual(resultIf3OpAnd2Trial);
	});


});









