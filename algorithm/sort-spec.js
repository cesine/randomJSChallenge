// eslint-disable-next-line import/no-extraneous-dependencies
const expect = require('expect.js');

const {merge, mergesort, native, quicksort, quicksortRecursive, partition, swap} = require('./sort');

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

    it('should partition empty array', () => {
      const input = [];
      expect(partition(input, 0, 0, compareNumbers)).to.equal(1);
      expect(input).to.eql([]);
    });

    it('should partition with no change', () => {
      const input = [1, 2, 3];
      expect(partition(input, 0, 2, compareNumbers)).to.equal(2);
      expect(input).to.eql([1, 2, 3]);
    });

    it('should partition with inverse order', () => {
      const input = [3, 2, 1];
      expect(partition(input, 0, 2, compareNumbers)).to.equal(2);
      expect(input).to.eql([1, 2, 3]);
    });

    it('should partition with random order', () => {
      const input = [3, 7, 8, 4, 2, 1, 5];
      expect(partition(input, 0, 6, compareNumbers)).to.equal(4);
      expect(input).to.eql([3, 1, 2, 4, 8, 7, 5]);
    });

    it('should partition with another random order', () => {
      const input = [3, 8, 7, 4, 2, 1, 5];
      expect(partition(input, 0, 6, compareNumbers)).to.equal(4);
      expect(input).to.eql([3, 1, 2, 4, 7, 8, 5]);
    });

    it('should partition inside an array', () => {
      const input = [3, 4, 2, 1, 5, 8, 7];
      expect(partition(input, 0, 3, compareNumbers)).to.equal(3);
      expect(input).to.eql([3, 1, 2, 4, 5, 8, 7]);
    });

    it('should partition inside an array again', () => {
      const input = [1, 4, 2, 3, 5, 8, 7];
      expect(partition(input, 0, 3, compareNumbers)).to.equal(3);
      expect(input).to.eql([1, 3, 2, 4, 5, 8, 7]);
    });

    it('should sort empty array', () => {
      expect(quicksort([], compareNumbers)).to.eql([]);
    });

    it('should sort random numbers', () => {
      expect(quicksort([3, 8, 7, 4, 2, 1, 5], compareNumbers)).to.eql([1, 2, 3, 4, 5, 7, 8]);
    });

    it('should sort numbers', () => {
      expect(quicksort([1, 7, 3, 4, 2, 6, 5, 8, 9], compareNumbers)).to.eql([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    });

    it('should sort non-unique numbers', () => {
      expect(quicksort([1, 7, 3, 4, 2, 6, 7, 5, 8, 9], compareNumbers)).to.eql([1, 2, 3, 4, 5, 6, 7, 7, 8, 9]);
    });

    it('should sort sorted numbers', () => {
      expect(quicksort([1, 2, 3, 4, 5, 6, 7, 8, 9], compareNumbers)).to.eql([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    });

    it('should sort numbers inverse case', () => {
      expect(quicksort([9, 8, 7, 6, 5, 4, 3, 2, 1], compareNumbers)).to.eql([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    });

    it('should sort numbers worst case', () => {
      expect(quicksort([9, 1, 8, 2, 7, 3, 6, 4, 5], compareNumbers)).to.eql([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    });

    it('should sort unicode', () => {
      expect(quicksort([
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

  describe('mergesort', () => {
    it('should merge', () => {
      expect(merge([1, 3], [2, 4], compareNumbers)).to.eql([1, 2, 3, 4]);
    });

    it('should sort sample numbers', () => {
      expect(mergesort([6, 5, 3, 1, 8, 7, 2, 4], compareNumbers)).to.eql([1, 2, 3, 4, 5, 6, 7, 8]);
    });

    it('should sort numbers', () => {
      expect(mergesort([1, 2, 8, 7, 6, 5, 4, 3, 2, 1], compareNumbers)).to.eql([1, 1, 2, 2, 3, 4, 5, 6, 7, 8]);
    });

    it('should sort unicode', () => {
      expect(mergesort([
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
});
