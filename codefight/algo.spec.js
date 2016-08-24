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

 var all = require('./algo');
describe('test the middleNumber challenge', function(){
  it('should pass test 1', function() {
    expect(all.Q.middleNumberCute(273, 415)).toEqual(344);
  });
  it('should pass test 2', function() {
    expect(all.Q.middleNumberCute(263, 416)).toEqual(-1);
  });
  it('should pass test 3', function() {
    expect(all.Q.middleNumberCute(66, 22)).toEqual(44);
  });
  it('should pass test 4', function() {
    expect(all.Q.middleNumberCute(23, 77)).toEqual(-1);
  });
  it('should pass test 5 Big', function() {
    expect(all.Q.middleNumberCute(222222222222222, 222222222222222)).toEqual(222222222222222);
  });
});

describe('Reverse test, find the pattern', function() {
  it('should pass test1', function() {
    // Found it!!!
    // 12   -> 2 -> 1*2
    // 23   -> 6 -> 2*3
    // 245  -> 28 -> 2*4 + 4*5
    // 3356 -> 54 -> 3*3 + 3*5 + 5*6
    expect(all.Q.weirdSum('12')).toEqual(2);
    expect(all.Q.weirdSum('23')).toEqual(6);
    expect(all.Q.weirdSum('245')).toEqual(28);
    expect(all.Q.weirdSum('3356')).toEqual(54);
    expect(all.Q.weirdSum('392042662597123062770822280754419675616717762113939763665635300660439205647072988025156696100890882829504899653020822523097537189741922901032931039591755423921710651051839830568532552900603100842502817638583094931275681895674658323826229500694352743461437239343663281057715078564680655066630315824621977251569759661690426889815828700186163199743911430347301407923879140165019272650154693217186869721844450202976970423767868856235576766540635030')).toEqual(8646);
    expect(all.Q.weirdSum('508123631449331076510859110090654129218720844548057502631369671373831848784094939811415387024279863904682360563911900217631451862396214105182221189376352850050387219533736678033470133827356337412283288067955614350147563918573587390569940642379260502472304703226903738203869759417644695429628966895167297663024654725634605843598421642')).toEqual(6319);
    expect(all.Q.weirdSum('217493666116294100136179036362199902423986170794769')).toEqual(1014);
  });

  it('should pass test2, rethought', function() {
    // Found it!!!
    // 12   -> 2 -> 1*2
    // 23   -> 6 -> 2*3
    // 245  -> 28 -> 2*4 + 4*5
    // 3356 -> 54 -> 3*3 + 3*5 + 5*6
    expect(all.Q.weirdSum2('12')).toEqual(2);
    expect(all.Q.weirdSum2('23')).toEqual(6);
    expect(all.Q.weirdSum2('245')).toEqual(28);
    expect(all.Q.weirdSum2('3356')).toEqual(54);
    expect(all.Q.weirdSum2('392042662597123062770822280754419675616717762113939763665635300660439205647072988025156696100890882829504899653020822523097537189741922901032931039591755423921710651051839830568532552900603100842502817638583094931275681895674658323826229500694352743461437239343663281057715078564680655066630315824621977251569759661690426889815828700186163199743911430347301407923879140165019272650154693217186869721844450202976970423767868856235576766540635030')).toEqual(8646);
    expect(all.Q.weirdSum2('508123631449331076510859110090654129218720844548057502631369671373831848784094939811415387024279863904682360563911900217631451862396214105182221189376352850050387219533736678033470133827356337412283288067955614350147563918573587390569940642379260502472304703226903738203869759417644695429628966895167297663024654725634605843598421642')).toEqual(6319);
    expect(all.Q.weirdSum2('217493666116294100136179036362199902423986170794769')).toEqual(1014);
  });
});
