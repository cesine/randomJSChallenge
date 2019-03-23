// eslint-disable-next-line import/no-extraneous-dependencies
const expect = require('expect.js');

const { native, quicksort, partition, swap } = require('./sort');

describe('sort', () => {
  function compareNumbers(a, b) {
    return a - b;
  }

  describe('native', () => {
    it('should throw an error if input is not an array', () => {
      try {
        native('a');
      } catch (err) {
        expect(err.message).to.eql('input.sort is not a function');
      }
    });

    it('should handle empty arrays', () => {
      expect(native([])).to.eql([]);
    });

    it('should sort numbers', () => {
      expect(native([1, 2, 8, 7, 6, 5, 4, 3, 2, 1], compareNumbers)).to.eql([1, 1, 2, 2, 3, 4, 5, 6, 7, 8]);
    });

    it('should sort unicode', () => {
      // https://github.com/minimaxir/big-list-of-naughty-strings/blob/master/blns.txt
      expect(native([
        'ヽ༼ຈل͜ຈ༽ﾉ ヽ༼ຈل͜ຈ༽ﾉ',
        '1E02',
        '(｡◕ ∀ ◕｡)',
        '-1',
        '-1.00',
        '｀ｨ(´∀｀∩',
        '🐶',
        'عل',
        '__ﾛ(,_,*)',
        '1E+02',
        '・(￣∀￣)・:*:',
        'الإطلاق',
        'إيو',
        '1E2',
      ], function (a, b) {
        return a.localeCompare(b);
      })).to.eql([
        '__ﾛ(,_,*)',
        '-1',
        '-1.00',
        '・(￣∀￣)・:*:',
        '(｡◕ ∀ ◕｡)',
        '｀ｨ(´∀｀∩',
        '🐶',
        'ヽ༼ຈل͜ຈ༽ﾉ ヽ༼ຈل͜ຈ༽ﾉ',
        '1E+02',
        '1E02',
        '1E2',
        'إيو',
        'الإطلاق',
        'عل',
      ]);
    });
  });

  describe('quicksort', () => {
    it('should swap', () => {
      expect(swap(['x', 'xx', 'xxx'], 0, 2)).to.eql(['xxx', 'xx', 'x']);
    });

    it('should partition with no change', () => {
      const input = [1, 2, 3];
      expect(partition(input, 2, 0, 2)).to.equal(2);
      expect(input).to.eql([1, 2, 3]);
    });

    it('should partition with inverse order', () => {
      const input = [3, 2, 1];
      expect(partition(input, 2, 0, 2)).to.equal(0);
      expect(input).to.eql([1, 2, 3]);
    });

    it('should partition with random order', () => {
      const input = [3, 7, 8, 4, 2, 1, 5];
      expect(partition(input, 6, 0, 6)).to.equal(4);
      expect(input).to.eql([3, 4, 2, 1, 5, 7, 8]);
    });

    it('should partition with another random order', () => {
      const input = [3, 8, 7, 4, 2, 1, 5];
      expect(partition(input, 6, 0, 6)).to.equal(4);
      expect(input).to.eql([3, 4, 2, 1, 5, 8, 7]);
    });

    it('should partition inside an array', () => {
      const input = [3, 4, 2, 1, 5, 8, 7];
      expect(partition(input, 3, 0, 3)).to.equal(0);
      expect(input).to.eql([1, 4, 2, 3, 5, 8, 7]);
    });

    it('should partition inside an array again', () => {
      const input = [1, 4, 2, 3, 5, 8, 7];
      expect(partition(input, 3, 0, 3)).to.equal(2);
      expect(input).to.eql([1, 2, 3, 4, 5, 8, 7]);
    });

    it('should sort random numbers', () => {
      expect(quicksort([3, 8, 7, 4, 2, 1, 5], compareNumbers)).to.eql([1, 2, 3, 4, 5, 7, 8]);
    });

    it('should sort numbers', () => {
      expect(quicksort([1, 7, 3, 4, 2, 6, 5, 8, 9], compareNumbers)).to.eql([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    });

    it('should sort sorted numbers', () => {
      expect(quicksort([1, 2, 3, 4, 5, 6, 7, 8, 9], compareNumbers)).to.eql([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    });

    it('should sort numbers worst case', () => {
      expect(quicksort([9, 8, 7, 6, 5, 4, 3, 2, 1], compareNumbers)).to.eql([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    });
  });
});