const { Q } = require('../misc/redditRandomQ');
const expect = require('expect.js');

describe('Reddit random question Testing', () => {
  it('Should test the Pascal Triangle', () => {
    expect(Q.returnAllRowOfPascalBeforeNLoop(1)).to.eql([[1]]);
    expect(Q.returnAllRowOfPascalBeforeNLoop(2)).to.eql([[1], [1, 1]]);
    expect(Q.returnAllRowOfPascalBeforeNLoop(3)).to.eql([[1], [1, 1], [1, 2, 1]]);
    expect(Q.returnAllRowOfPascalBeforeNLoop(4)).to.eql([[1], [1, 1], [1, 2, 1], [1, 3, 3, 1]]);
    expect(Q.returnAllRowOfPascalBeforeNLoop(7)).to.eql([[1], [1, 1], [1, 2, 1], [1, 3, 3, 1], [1, 4, 6, 4, 1], [1, 5, 10, 10, 5, 1], [1, 6, 15, 20, 15, 6, 1]]);
  });

  it('Should return me the Row of the Triangle only', () => {
    expect(Q.returnRowOfPascalBeforeNMath(1)).to.eql([1]);
    expect(Q.returnRowOfPascalBeforeNMath(2)).to.eql([1, 1]);
    expect(Q.returnRowOfPascalBeforeNMath(3)).to.eql([1, 2, 1]);
    expect(Q.returnRowOfPascalBeforeNMath(4)).to.eql([1, 3, 3, 1]);
    expect(Q.returnRowOfPascalBeforeNMath(7)).to.eql([1, 6, 15, 20, 15, 6, 1]);
  });

  it('Should give the most repeated string in the array', () => {
    expect(Q.theMostFrequentStringInArray(['asdf', 'this poney is evil', 'asdf', 'asdf', 'This is not real'])).to.eql('asdf');
  });

  it('Should tell me is the word is present in order in the array of array', () => {
    const arrayToCheck = [['A', 'G', 'H', 'N'], ['U', 'L', 'O', 'A'], ['N', 'M', 'L', 'K'], ['L', 'B', 'V', 'M']];
    expect(Q.findWordInArray('ALL', arrayToCheck)).to.be(false);
    expect(Q.findWordInArray('LOAN', arrayToCheck)).to.be(true);
  });
});

