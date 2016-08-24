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

 var all = require('./algo');
describe('test the middleNumber challenge', function(){
  it('should pass test 1', function() {
    expect(all.Q.middleNumberCute(273, 415)).toEqual(344);
  });
  it('should pass test 2', function() {
    expect(all.Q.middleNumberCute(263, 416)).toEqual(-1);
  });
  it('should pass test 3', function() {
    expect(all.Q.middleNumberCute(66, 22)).toEqual(44);
  });
  it('should pass test 4', function() {
    expect(all.Q.middleNumberCute(23, 77)).toEqual(-1);
  });
  it('should pass test 5 Big', function() {
    expect(all.Q.middleNumberCute(222222222222222, 222222222222222)).toEqual(222222222222222);
  });
});
