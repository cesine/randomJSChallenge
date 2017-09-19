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

const allQ = require('./someIntervQ'); // Easier in ES6 I can just require the function itself.
const expect = require('expect.js');

describe('Some test from GlassDoor on Addapa', () => {
  // http://www.puzzles.ca/sudoku_puzzles/sudoku_easy_211_solution.html
  const sudoku = [
    [7, 2,,, 3, 9,,, 6],
    [,,,, 5,, 3,, 1],
    [,,,,, 7,,, 5],
    [,,,,,, 1,, ],
    [9,, 6,,,,,, 2],
    [, 3,,,,, 5,, ],
    [3, 7,,,, 4, 8,, ],
    [6,, 8, 9, 7,,, 3],
    [5,,,,,,,, ],
  ];
  const sudokuSolution = [
    [7, 2, 5, 1, 3, 9, 4, 8, 6],
    [4, 6, 9, 2, 5, 8, 3, 7, 1],
    [1, 8, 3, 4, 6, 7, 9, 2, 5],
    [8, 4, 7, 5, 9, 2, 1, 6, 3],
    [9, 5, 6, 3, 8, 1, 7, 4, 2],
    [2, 3, 1, 7, 4, 6, 5, 9, 8],
    [3, 7, 2, 6, 1, 4, 8, 5, 9],
    [6, 1, 8, 9, 7, 5, 2, 3, 4],
    [5, 9, 4, 8, 2, 3, 6, 1, 7],
  ];

  const smallArr = [
    [7, 2, 5],
    [4, 6, 9],
    [1, 8, 3],
  ];
  const transposeSmallArr = [
    [7, 4, 1],
    [2, 6, 8],
    [5, 9, 3],
  ];

  // http://www.puzzles.ca/sudoku_puzzles/sudoku_medium_005.html --> Nbr5
  const sudoku2 = [
    [3,, 4,, 1, 8, 5,, 9],
    [1,,,, 6, 4,,, ],
    [, 8, 2,,,,,, ],
    [, 1,,,, 6, 9, 4],
    [, 9, 6,,,,,, ],
    [,,, 7,, 1, 6, 3],
    [, 2,,, 5, 3,,, ],
    [, 5, 7, 9,,,, 8],
    [,,,,,, 4,, ],
  ];

  const sudoku2Sol = [
    [3, 6, 4, 2, 1, 8, 5, 7, 9],
    [1, 7, 9, 5, 6, 4, 8, 2, 3],
    [5, 8, 2, 3, 7, 9, 1, 6, 4],
    [7, 1, 3, 8, 2, 6, 9, 4, 5],
    [8, 9, 6, 4, 3, 5, 2, 1, 7],
    [2, 4, 5, 7, 9, 1, 6, 3, 8],
    [4, 2, 8, 1, 5, 3, 7, 9, 6],
    [6, 5, 7, 9, 4, 2, 3, 8, 1],
    [9, 3, 1, 6, 8, 7, 4, 5, 2],
  ];

  it('Q1: should solve a Suduku box', () => {
    expect(allQ.Q.extractBlockOf3by3(sudokuSolution, 0, 0)).toEqual([7, 2, 5, 4, 6, 9, 1, 8, 3]);
    expect(allQ.Q.extractBlockOf3by3(sudokuSolution, 6, 6)).toEqual([8, 5, 9, 2, 3, 4, 6, 1, 7]);
    expect(allQ.Q.extractBlockOf3by3(sudokuSolution, 3, 6)).toEqual([1, 6, 3, 7, 4, 2, 5, 9, 8]);
    expect(allQ.Q.extractBlockOf3by3(sudoku, 3, 6)).toEqual([1, undefined, undefined, undefined, undefined, 2, 5, undefined, undefined]);
    expect(allQ.Q.validateAllNbrInArr([7, 2, 5, 4, 6, 9, 1, 8, 3])).toBeTruthy();
    expect(allQ.Q.validateAllNbrInArr([7, 2, 5, 4, 6,,,, 3])).toBeTruthy();
    expect(allQ.Q.validateAllNbrInArr([7, 2, 5, 4, 6, 9, 1, 4, 3])).toBeFalsy();
    expect(allQ.Q.returnRemaningPossibility([[7, 2, 5, 4, 6,,,, 3]])).toEqual([[1, 8, 9]]);
    expect(allQ.Q.transposeHorisontal(smallArr)).toEqual(transposeSmallArr);
    expect(allQ.Q.returnitemPresentInAllarray([1, 2, 3], [4, 5, 6], [7, 8, 9])).toEqual([]);
    expect(allQ.Q.returnitemPresentInAllarray([1, 2, 4], [4, 5, 6], [4, 8, 9])).toEqual([4]);
    expect(allQ.Q.solveThisSudoku(sudoku)).toEqual(sudokuSolution);
    expect(allQ.Q.solveThisSudoku(sudoku2)).toEqual(sudoku2Sol);
  });

  it('shoudl return a array of unique number', () => {
    expect(allQ.Q.returnNumOfUniqueIntegers([1, 2, 2, 2, 2, 3, 3, 3, 4, 5, 4, 5, 6, 7, 2, 10])).toMatch([1, 6, 7, 10]);
  });

  it('should return a array of the max 2 number found.', () => {
    expect(allQ.Q.returnLargest2Nbr([1, 2, 2, 2, 2, 110, 3, 3, 4, 5, 4, 5, 6, 7, 2, 10, 1])).toMatch([110, 10]);
  });

  it('Should reverse a string in place', () => {
    expect(allQ.Q.reverseStrInPlace("Let's Hope for the best!")).toEqual("!tseb eht rof epoH s'teL");
  });

  it('Should return the missing 2 number of the Array', () => {
    expect(allQ.Q.findTheMissingtwo([1, 2, 3, 4, 5, 6, 8, 9, 10, 11, 12, 13, 14, 15, 16, 18, 19, 20, 21])).toEqual([7, 17]);
    expect(allQ.Q.findTheMissingtwo([1, 2, 3, 4, 5, 6, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21])).toEqual([7, 8]);
  });

  it('should get The RegEx Right', () => {
    expect(allQ.Q.isMatch('', '*')).toBeTruthy();
    expect(allQ.Q.isMatch('', '*****')).toBeTruthy();
    expect(allQ.Q.isMatch('', '**a*')).toBeFalsy();
    expect(allQ.Q.isMatch('b', '*b')).toBeTruthy();
    expect(allQ.Q.isMatch('cabt', 'c*t')).toBeTruthy();
    expect(allQ.Q.isMatch('abbbbbbb', 'a*b')).toBeTruthy();
    expect(allQ.Q.isMatch('Something really long that should not match', '**really long that*')).toBeTruthy();

    expect(allQ.Q.isMatch('bcat', 'c*t')).toBeFalsy();
    expect(allQ.Q.isMatch('cats', 'c*t')).toBeFalsy();
  });

  it('Test the support function of the RegEx Match', () => {
    expect(allQ.Q.cleanTestStr('asdfgh')).toEqual('asdfgh');
    expect(allQ.Q.cleanTestStr('asd***fgh')).toEqual('asd*fgh');
    expect(allQ.Q.cleanTestStr('**asdfgh')).toEqual('*asdfgh');
    expect(allQ.Q.cleanTestStr('****')).toEqual('*');
    expect(allQ.Q.cleanTestStr('*')).toEqual('*');
  });

  it('testing The SubString split', () => {
    expect(allQ.Q.splitinSubStrWithMatch('this Dog chace this cat and it is Stupid this Is What it is', 'this')).toEqual(['this Dog chace this cat and it is Stupid this Is What it is', 'this cat and it is Stupid this Is What it is', 'this Is What it is']);
    expect(allQ.Q.splitinSubStrWithMatch('abcabcabcabcd', 'abc')).toEqual(['abcabcabcabcd', 'abcabcabcd', 'abcabcd', 'abcd']);
    expect(allQ.Q.splitinSubStrRecuWithMatch(undefined, 'abcabcabcabcd', 'abc')).toEqual(['abcabcabcabcd', 'abcabcabcd', 'abcabcd', 'abcd']);
  });
});

