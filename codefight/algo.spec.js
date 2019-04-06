const expect = require('expect.js');
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

const { middleNumberCute, weirdSum, weirdSum2 } = require('./algo');

describe('test the middleNumber challenge', () => {
  it('should pass test 1', () => {
    expect(middleNumberCute(273, 415)).to.eql(344);
  });
  it('should pass test 2', () => {
    expect(middleNumberCute(263, 416)).to.eql(-1);
  });
  it('should pass test 3', () => {
    expect(middleNumberCute(66, 22)).to.eql(44);
  });
  it('should pass test 4', () => {
    expect(middleNumberCute(23, 77)).to.eql(-1);
  });
  it('should pass test 5 Big', () => {
    expect(middleNumberCute(222222222222222, 222222222222222)).to.eql(222222222222222);
  });
});

describe('Reverse test, find the pattern', () => {
  it('should pass test1', () => {
    // Found it!!!
    // 12   -> 2 -> 1*2
    // 23   -> 6 -> 2*3
    // 245  -> 28 -> 2*4 + 4*5
    // 3356 -> 54 -> 3*3 + 3*5 + 5*6
    expect(weirdSum('12')).to.eql(2);
    expect(weirdSum('23')).to.eql(6);
    expect(weirdSum('245')).to.eql(28);
    expect(weirdSum('3356')).to.eql(54);
    expect(weirdSum('392042662597123062770822280754419675616717762113939763665635300660439205647072988025156696100890882829504899653020822523097537189741922901032931039591755423921710651051839830568532552900603100842502817638583094931275681895674658323826229500694352743461437239343663281057715078564680655066630315824621977251569759661690426889815828700186163199743911430347301407923879140165019272650154693217186869721844450202976970423767868856235576766540635030')).to.eql(8646);
    expect(weirdSum('508123631449331076510859110090654129218720844548057502631369671373831848784094939811415387024279863904682360563911900217631451862396214105182221189376352850050387219533736678033470133827356337412283288067955614350147563918573587390569940642379260502472304703226903738203869759417644695429628966895167297663024654725634605843598421642')).to.eql(6319);
    expect(weirdSum('217493666116294100136179036362199902423986170794769')).to.eql(1014);
  });

  it('should pass test2, rethought', () => {
    // Found it!!!
    // 12   -> 2 -> 1*2
    // 23   -> 6 -> 2*3
    // 245  -> 28 -> 2*4 + 4*5
    // 3356 -> 54 -> 3*3 + 3*5 + 5*6
    expect(weirdSum2('12')).to.eql(2);
    expect(weirdSum2('23')).to.eql(6);
    expect(weirdSum2('245')).to.eql(28);
    expect(weirdSum2('3356')).to.eql(54);
    expect(weirdSum2('392042662597123062770822280754419675616717762113939763665635300660439205647072988025156696100890882829504899653020822523097537189741922901032931039591755423921710651051839830568532552900603100842502817638583094931275681895674658323826229500694352743461437239343663281057715078564680655066630315824621977251569759661690426889815828700186163199743911430347301407923879140165019272650154693217186869721844450202976970423767868856235576766540635030')).to.eql(8646);
    expect(weirdSum2('508123631449331076510859110090654129218720844548057502631369671373831848784094939811415387024279863904682360563911900217631451862396214105182221189376352850050387219533736678033470133827356337412283288067955614350147563918573587390569940642379260502472304703226903738203869759417644695429628966895167297663024654725634605843598421642')).to.eql(6319);
    expect(weirdSum2('217493666116294100136179036362199902423986170794769')).to.eql(1014);
  });
});
