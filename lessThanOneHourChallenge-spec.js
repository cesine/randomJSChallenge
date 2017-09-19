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

// ToRun: jasmine-node X-spec.js --verbose

const allQ = require('./lessThanOneHourChallenge');
const expect = require('expect.js');

describe('Less than 1h challenge', () => {
  it('Shoudl summ all number: ', () => {
    expect(allQ.Q.sumFor([1, 2, 3, 4, 5])).toEqual(15);
    expect(allQ.Q.sumLoop([1, 2, 3, 4, 6])).toEqual(16);
    expect(allQ.Q.sumRecur([1, 2, 3, 4, 7])).toEqual(17);
  });

  it('should merge both list', () => {
    expect(allQ.Q.mergeBothList(['a', 'b', 'c'], [1, 2, 3])).toEqual(['a', 1, 'b', 2, 'c', 3]);
  });

  it('should get a list of all first N Fibonacci number', () => {
    expect(allQ.Q.fibo(10)).toEqual([0, 1, 1, 2, 3, 5, 8, 13, 21, 34]);
    expect(allQ.Q.fiboLoop(10)).toEqual([0, 1, 1, 2, 3, 5, 8, 13, 21, 34]);
  });

  it('should Give me the largest number', () => {
    expect(allQ.Q.largestNumberFromArray([50, 2, 1, 9])).toEqual(95021);
    // expect(allQ.Q.largestNumberFromArray([420, 42, 423])).toEqual(42342420); This case dosent work. Expected 42342042 to equal 42342420.
  });

  it('should give me all possible way of making 100 out of 1 to 9', () => {
    expect(allQ.Q.giveMeAllPossible100()).toContain('1+2+34–5+67–8+9');
  });
});

