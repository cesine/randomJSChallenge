const {
  solveThisSudoku,
  returnitemPresentInAllarray,
  returnRemaningPossibility,
  transposeHorisontal,
  validateAllNbrInArr,
  extractBlockOf3by3,
  returnNumOfUniqueIntegers,
  returnLargest2Nbr,
  reverseStrInPlace,
  findTheMissingtwo,
  isMatch,
  splitinSubStrWithMatch,
  splitinSubStrRecuWithMatch,
  cleanTestStr,
} = require('../misc/someIntervQ');
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
    expect(extractBlockOf3by3(sudokuSolution, 0, 0)).to.eql([7, 2, 5, 4, 6, 9, 1, 8, 3]);
    expect(extractBlockOf3by3(sudokuSolution, 6, 6)).to.eql([8, 5, 9, 2, 3, 4, 6, 1, 7]);
    expect(extractBlockOf3by3(sudokuSolution, 3, 6)).to.eql([1, 6, 3, 7, 4, 2, 5, 9, 8]);
    expect(extractBlockOf3by3(sudoku, 3, 6)).to.eql([1, undefined, undefined, undefined, undefined, 2, 5, undefined, undefined]);
    expect(validateAllNbrInArr([7, 2, 5, 4, 6, 9, 1, 8, 3])).to.be(true);
    expect(validateAllNbrInArr([7, 2, 5, 4, 6,,,, 3])).to.be(true);
    expect(validateAllNbrInArr([7, 2, 5, 4, 6, 9, 1, 4, 3])).to.be(false);
    expect(returnRemaningPossibility([[7, 2, 5, 4, 6,,,, 3]])).to.eql([[1, 8, 9]]);
    expect(transposeHorisontal(smallArr)).to.eql(transposeSmallArr);
    expect(returnitemPresentInAllarray([1, 2, 3], [4, 5, 6], [7, 8, 9])).to.eql([]);
    expect(returnitemPresentInAllarray([1, 2, 4], [4, 5, 6], [4, 8, 9])).to.eql([4]);
    expect(solveThisSudoku(sudoku)).to.eql(sudokuSolution);
    expect(solveThisSudoku(sudoku2)).to.eql(sudoku2Sol);
  });

  it('shoudl return a array of unique number', () => {
    expect(returnNumOfUniqueIntegers([1, 2, 2, 2, 2, 3, 3, 3, 4, 5, 4, 5, 6, 7, 2, 10])).to.eql([1, 6, 7, 10]);
  });

  it('should return a array of the max 2 number found.', () => {
    expect(returnLargest2Nbr([1, 2, 2, 2, 2, 110, 3, 3, 4, 5, 4, 5, 6, 7, 2, 10, 1])).to.eql([110, 10]);
  });

  it('Should reverse a string in place', () => {
    expect(reverseStrInPlace("Let's Hope for the best!")).to.eql("!tseb eht rof epoH s'teL");
  });

  it('Should return the missing 2 number of the Array', () => {
    expect(findTheMissingtwo([1, 2, 3, 4, 5, 6, 8, 9, 10, 11, 12, 13, 14, 15, 16, 18, 19, 20, 21])).to.eql([7, 17]);
    expect(findTheMissingtwo([1, 2, 3, 4, 5, 6, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21])).to.eql([7, 8]);
  });

  it('should get The RegEx Right', () => {
    expect(isMatch('', '*')).to.be(true);
    expect(isMatch('', '*****')).to.be(true);
    expect(isMatch('', '**a*')).to.be(false);
    expect(isMatch('b', '*b')).to.be(true);
    expect(isMatch('cabt', 'c*t')).to.be(true);
    expect(isMatch('abbbbbbb', 'a*b')).to.be(true);
    expect(isMatch('Something really long that should not match', '**really long that*')).to.be(true);

    expect(isMatch('bcat', 'c*t')).to.be(false);
    expect(isMatch('cats', 'c*t')).to.be(false);
  });

  it('Test the support function of the RegEx Match', () => {
    expect(cleanTestStr('asdfgh')).to.eql('asdfgh');
    expect(cleanTestStr('asd***fgh')).to.eql('asd*fgh');
    expect(cleanTestStr('**asdfgh')).to.eql('*asdfgh');
    expect(cleanTestStr('****')).to.eql('*');
    expect(cleanTestStr('*')).to.eql('*');
  });

  it('testing The SubString split', () => {
    expect(splitinSubStrWithMatch('this Dog chace this cat and it is Stupid this Is What it is', 'this')).to.eql(['this Dog chace this cat and it is Stupid this Is What it is', 'this cat and it is Stupid this Is What it is', 'this Is What it is']);
    expect(splitinSubStrWithMatch('abcabcabcabcd', 'abc')).to.eql(['abcabcabcabcd', 'abcabcabcd', 'abcabcd', 'abcd']);
    expect(splitinSubStrRecuWithMatch(undefined, 'abcabcabcabcd', 'abc')).to.eql(['abcabcabcabcd', 'abcabcabcd', 'abcabcd', 'abcd']);
  });
});
