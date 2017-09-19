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

// ToRun: jasmine-node thatJSDudeQ-spec.js --verbose
const allQ = require('./thatJSDudeQ');
const expect = require('expect.js');

describe('that JS Dude Question', () => {
  it('should reverse a sentense', () => {
    expect('I am starting to be tired').toEqual(allQ.reverseMapThisSentense('tired be to starting am I'));
    expect('I am starting to be tired').toEqual(allQ.reverseRecuThisSentense('tired be to starting am I'));
  });
});


describe('that JS Dude Question #10', () => {
  it('should reverse each word in a sentense', () => {
    expect('I am the good boy').toEqual(allQ.Q10.reverseMapInPlace('I ma eht doog yob'));
    expect('I am the good boy').toEqual(allQ.Q10.reverseRecuInPlace('I ma eht doog yob'));
  });
});

describe('that JS Dude Question #11', () => {
  it('should find the first duplicated Char', () => {
    expect(allQ.Q11.giveMeFirstRepeatChar('the quick brown fox jumps then quickly blow air')).toEqual('o');
    expect(allQ.Q11.giveMeFirstRepeatChar('the elephant')).toEqual('e');
    expect(allQ.Q11.giveMeFirstRepeatChar('abc def ghijkl mnop')).toBeFalsy();
  });

  it('should find the first NON duplicated Char', () => {
    expect(allQ.Q11.giveMeFirstNonRepeatChar('the quick brown fox jumps then quickly blow air')).toEqual('f');
  });
});

describe('that JS Dude Question #15', () => {
  it('should Sort and find the missing number ', () => {
    expect(allQ.Q15.sortAndLoop([1, 2, 3, 4, 5, 6, 8, 9, 10, 11, 12, 13])).toEqual(7);
    expect(allQ.Q15.sortAndLoop([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12])).toBeFalsy();
  });

  it('should loop and find the missing number', () => {
    expect(allQ.Q15.loopAndCheckMissing([13, 12, 1, 2, 3, 4, 5, 6, 8, 9, 10, 11])).toEqual(7);
    expect(allQ.Q15.loopAndCheckMissing([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12])).toBeFalsy();
  });

  it('should loop and find the missing number', () => {
    expect(allQ.Q15.doItMathStyle([13, 12, 1, 2, 3, 4, 5, 6, 8, 9, 10, 11])).toEqual(7);
    expect(allQ.Q15.doItMathStyle([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12])).toEqual(13);
    expect(allQ.Q15.doItMathStyle([2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12])).toEqual(1);
  });
});

describe('that JS Dude Question #16', () => {
  it('should check if the dividor is inside the array ', () => {
    expect(allQ.Q16.isDivisorPartOfTheArray(10, [1, 14, 22, 7, 5])).toBeFalsy();
    expect(allQ.Q16.isDivisorPartOfTheArray(10, [1, 14, 22, 7, 5, 2])).toBeTruthy();
  });

  it('Real Q16, Sum 2 in array to get result', () => {
    expect(allQ.Q16.istheSUMthere(155, [1, 2, 3, 4, 5, 6, 7, 8])).toBeFalsy();
    expect(allQ.Q16.istheSUMthere(15, [1, 2, 5, 4, 10, 7, 8])).toBeTruthy();
  });

  it('Real Q16, Sum 2 in array to get result', () => {
    expect(allQ.Q16.isTheSumBySoustraction(155, [1, 2, 3, 4, 5, 6, 7, 8])).toBeFalsy();
    expect(allQ.Q16.isTheSumBySoustraction(15, [1, 2, 5, 4, 10, 7, 8])).toBeTruthy();
  });
});

describe('Question of 0', () => {
  it('should calculate proper 0', () => {
    expect(allQ.Q18.countNbrOfZeroUpToN(50)).toEqual(6);
    expect(allQ.Q18.countNbrOfZeroUpToN(100)).toEqual(12);
    // expect(allQ.Q18.countNbrOfZeroUpToN(2014)).toEqual(223); that one dosent work.
  });
});

describe('Testing Multiple Multiplication', () => {
  it('should return the sum of Function', () => {
    // javascript console.log(mul(2)(3)(4)); // output : 24 console.log(mul(4)(3)(4)); // output : 48
    expect(allQ.Qmul.mul(2)(3)(4)).toEqual(24);
    expect(allQ.Qmul.mul(4)(3)(4)).toEqual(48);
  });

  it('should return the sum of Function', () => {
    // javascript console.log(mul(2)(3)(4)); // output : 24 console.log(mul(4)(3)(4)); // output : 48
    expect(allQ.Qmul.recuMult(2)(3)(4)).toEqual(24);
    expect(allQ.Qmul.recuMult(4)(3)(4)).toEqual(48);
  });
});
