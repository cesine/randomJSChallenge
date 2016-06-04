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

// ToRun: jasmine-node redditRandomQ-spec.js --verbose
var allQ = require('./redditRandomQ');

describe('Reddit random question Testing', function() {
	it('Should test the Pascal Triangle', function() {
		expect(allQ.Q.returnAllRowOfPascalBeforeNLoop(1)).toEqual([[1]]);
		expect(allQ.Q.returnAllRowOfPascalBeforeNLoop(2)).toEqual([[1],[1,1]]);
		expect(allQ.Q.returnAllRowOfPascalBeforeNLoop(3)).toEqual([[1],[1,1],[1,2,1]]);
		expect(allQ.Q.returnAllRowOfPascalBeforeNLoop(4)).toEqual([[1],[1,1],[1,2,1],[1,3,3,1]]);
		expect(allQ.Q.returnAllRowOfPascalBeforeNLoop(7)).toEqual([[1],[1,1],[1,2,1],[1,3,3,1],[1,4,6,4,1],[1,5,10,10,5,1],[1,6,15,20,15,6,1]]);
	});

	it('Should return me the Row of the Triangle only', function() {
		expect(allQ.Q.returnRowOfPascalBeforeNMath(1)).toEqual([1]);
		expect(allQ.Q.returnRowOfPascalBeforeNMath(2)).toEqual([1,1]);
		expect(allQ.Q.returnRowOfPascalBeforeNMath(3)).toEqual([1,2,1]);
		expect(allQ.Q.returnRowOfPascalBeforeNMath(4)).toEqual([1,3,3,1]);
		expect(allQ.Q.returnRowOfPascalBeforeNMath(7)).toEqual([1,6,15,20,15,6,1]);
	});

	it('Should give the most repeated string in the array', function() {
		expect(allQ.Q.theMostFrequentStringInArray(['asdf', 'this poney is evil', 'asdf', 'asdf', 'This is not real'])).toEqual("asdf");
	});

	it('Should tell me is the word is present in order in the array of array', function() {
		var arrayToCheck = [['A','G','H','N'], ['U','L','O','A'], ['N','M','L','K'], ['L','B','V','M']];
		expect(allQ.Q.findWordInArray('ALL', arrayToCheck)).toBeFalsy();
		expect(allQ.Q.findWordInArray('LOAN', arrayToCheck)).toBeTruthy();
	});
});




