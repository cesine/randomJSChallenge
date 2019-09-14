// eslint-disable-next-line import/no-extraneous-dependencies
const expect = require('expect.js');

const debug = () => {};

var memo = [1];
function factorial(n) {
  if (memo[n]) {
    debug(`already calculated ${memo[n]}`);
    return memo[n];
  }
  for (let i = memo.length; i <= n; i++) {
    debug(` calculating ${i}`);
    memo[i] = memo[i - 1] * i;
  }
  debug(`done ${n}: ${memo[n]}`, memo);
  return memo[n];
}


describe.only('combinatorics', () => {
  describe('factorial', () => {
    it('should calculate factorial of zero', () => {
      expect(factorial(0)).to.equal(1);
    });

    it('should calculate a small factorial', () => {
      expect(factorial(3)).to.equal(6);
    });

    it('should calculate a larger factorial', () => {
      expect(factorial(10)).to.equal(3628800);
      expect(memo).to.eql([ 1, 1, 2, 6, 24, 120, 720, 5040, 40320, 362880, 3628800 ]);
    });

    it('should calculate a factorial that was already calculated', () => {
      expect(factorial(8)).to.equal(40320);
    });

    it('should calculate factorials that were already calculated', () => {
      expect(factorial(12)).to.equal(479001600);
    });
  });
});
