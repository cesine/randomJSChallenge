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

function enumeratePermutations({ set, choose }) {
  if (!set.length) {
    return [];
  }

  const result = []
  set.forEach((item) => {
    console.log('item', item);
    for (let i = 0; i < choose; i++) {
      return set.map((innerItem) => {
        console.log(`${i}th innerItem`, innerItem);
        result.push([item, innerItem]);
      });
    };
  });

  // for (let i = 0; i < choose; i++) {
  //   const items = [...set];
  //   result[i] = [];

  //   for (let j = items.length; j > 0; j--) {
  //     item = items.pop();
  //     console.log(`position ${i} item ${item}`);
  //     result[i].push([set[i], item]);
  //   }
  // }

  return Object.values(result).sort(Intl.Collator().compare);
}

describe('combinatorics', () => {
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

  describe.only('enumeratePermutations', () => {
    it('should enumerate the permutations of an empty set', () => {
      expect(enumeratePermutations({ set: [] })).to.eql([]);
    });

    it('should enumerate the permutations of an small set', () => {
      expect(enumeratePermutations({
        set: ['A', 'K', 'B'],
        choose: 1,
      })).to.eql(['A', 'B', 'K']);
    });

    it('should enumerate the permutations of an small set', () => {
      expect(enumeratePermutations({
        set: ['A', 'B', 'C'],
        choose: 2,
      })).to.eql([
        ['A', 'A'],
        ['A', 'B'],
        ['A', 'C'],
        ['B', 'A'],
        ['B', 'B'],
        ['B', 'C'],
        ['C', 'A'],
        ['C', 'B'],
        ['C', 'C'],
      ]);
    });

    it.only('should enumerate the permutations of an small set', () => {
      expect(enumeratePermutations({
        set: ['A', 'B', 'C'],
        choose: 3,
      })).to.eql([
      ]);
    });
  });
});
