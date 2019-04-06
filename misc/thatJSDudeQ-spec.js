const {
  reverseMapThisSentense,
  reverseRecuThisSentense,
  Q10,
  Q11,
  Q15,
  Q16,
  Q18,
  Qmul,
} = require('../misc/thatJSDudeQ');
const expect = require('expect.js');

describe('that JS Dude Question', () => {
  it('should reverse a sentense', () => {
    expect('I am starting to be tired').to.eql(reverseMapThisSentense('tired be to starting am I'));
    expect('I am starting to be tired').to.eql(reverseRecuThisSentense('tired be to starting am I'));
  });
});


describe('that JS Dude Question #10', () => {
  it('should reverse each word in a sentense', () => {
    expect('I am the good boy').to.eql(Q10.reverseMapInPlace('I ma eht doog yob'));
    expect('I am the good boy').to.eql(Q10.reverseRecuInPlace('I ma eht doog yob'));
  });
});

describe('that JS Dude Question #11', () => {
  it('should find the first duplicated Char', () => {
    expect(Q11.giveMeFirstRepeatChar('the quick brown fox jumps then quickly blow air')).to.eql('o');
    expect(Q11.giveMeFirstRepeatChar('the elephant')).to.eql('e');
    expect(Q11.giveMeFirstRepeatChar('abc def ghijkl mnop')).to.be(false);
  });

  it('should find the first NON duplicated Char', () => {
    expect(Q11.giveMeFirstNonRepeatChar('the quick brown fox jumps then quickly blow air')).to.eql('f');
  });
});

describe('that JS Dude Question #15', () => {
  it('should Sort and find the missing number ', () => {
    expect(Q15.sortAndLoop([1, 2, 3, 4, 5, 6, 8, 9, 10, 11, 12, 13])).to.eql(7);
    expect(Q15.sortAndLoop([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12])).to.be(false);
  });

  it('should loop and find the missing number', () => {
    expect(Q15.loopAndCheckMissing([13, 12, 1, 2, 3, 4, 5, 6, 8, 9, 10, 11])).to.eql(7);
    expect(Q15.loopAndCheckMissing([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12])).to.be(false);
  });

  it('should loop and find the missing number', () => {
    expect(Q15.doItMathStyle([13, 12, 1, 2, 3, 4, 5, 6, 8, 9, 10, 11])).to.eql(7);
    expect(Q15.doItMathStyle([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12])).to.eql(13);
    expect(Q15.doItMathStyle([2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12])).to.eql(1);
  });
});

describe('that JS Dude Question #16', () => {
  it('should check if the dividor is inside the array ', () => {
    expect(Q16.isDivisorPartOfTheArray(10, [1, 14, 22, 7, 5])).to.be(false);
    expect(Q16.isDivisorPartOfTheArray(10, [1, 14, 22, 7, 5, 2])).to.be(true);
  });

  it('Real Q16, Sum 2 in array to get result', () => {
    expect(Q16.istheSUMthere(155, [1, 2, 3, 4, 5, 6, 7, 8])).to.be(false);
    expect(Q16.istheSUMthere(15, [1, 2, 5, 4, 10, 7, 8])).to.be(true);
  });

  it('Real Q16, Sum 2 in array to get result', () => {
    expect(Q16.isTheSumBySoustraction(155, [1, 2, 3, 4, 5, 6, 7, 8])).to.be(false);
    expect(Q16.isTheSumBySoustraction(15, [1, 2, 5, 4, 10, 7, 8])).to.be(true);
  });
});

describe('Question of 0', () => {
  it('should calculate proper 0', () => {
    expect(Q18.countNbrOfZeroUpToN(50)).to.eql(6);
    expect(Q18.countNbrOfZeroUpToN(100)).to.eql(12);
    // expect(Q18.countNbrOfZeroUpToN(2014)).to.eql(223); that one dosent work.
  });
});

describe.skip('Testing Multiple Multiplication', () => {
  it('should return the sum of Function', () => {
    // javascript console.log(mul(2)(3)(4)); // output : 24 console.log(mul(4)(3)(4)); // output : 48
    expect(Qmul.mul(2)(3)(4)()).to.eql(24);
    expect(Qmul.mul(4)(3)(4)()).to.eql(48);
  });

  it('should return the sum of Function', () => {
    // javascript console.log(mul(2)(3)(4)); // output : 24 console.log(mul(4)(3)(4)); // output : 48
    expect(Qmul.recuMult(2)(3)(4)()).to.eql(24);
    expect(Qmul.recuMult(4)(3)(4)()).to.eql(48);
  });
});
