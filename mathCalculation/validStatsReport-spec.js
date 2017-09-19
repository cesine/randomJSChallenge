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

// ToRun: jasmine-node validStatsReport-spec.js --verbose

const all = require('./validStatsReport');


describe('testing all apect of the SPC report', () => {
  const trialArrOfUserA = [
    [21.987, 21.992, 21.999, 21.985, 22.017, 21.958, 21.984, 21.973, 21.998, 21.998],
    [21.975, 21.999, 21.977, 21.984, 21.998, 22.012, 22.018, 21.996, 21.975, 21.996],
    [21.994, 22.012, 21.985, 21.978, 21.985, 22.005, 21.976, 21.983, 21.999, 21.972],
  ];
  const trialArrOfUserB = [
    [21.967, 21.976, 21.992, 21.995, 21.996, 22.002, 21.969, 21.987, 21.97, 21.979],
    [21.985, 21.979, 21.992, 21.982, 21.986, 21.977, 21.983, 21.996, 21.975, 21.979],
    [21.986, 21.968, 21.992, 21.973, 21.986, 21.974, 21.99, 21.996, 22.001, 21.99],
  ];
  const trialArrOfUserC = [
    [21.976, 21.982, 21.974, 21.988, 21.979, 21.965, 21.984, 21.988, 21.984, 21.986],
    [21.981, 21.988, 22.023, 21.999, 21.983, 22.011, 21.979, 21.985, 21.999, 21.984],
    [22.002, 22.016, 21.983, 21.999, 21.965, 22.002, 21.997, 22.005, 21.982, 21.993],
  ];
  const roundTo = 10000000;
  const allTheTrials = [trialArrOfUserA, trialArrOfUserB, trialArrOfUserC];
  const allOperator2Trial = [
    [trialArrOfUserA[0], trialArrOfUserA[1]],
    [trialArrOfUserB[0], trialArrOfUserB[1]],
    [trialArrOfUserC[0], trialArrOfUserC[1]],
  ];

  // Assuming a Min = 21.94 , Max = 22.28
  const resultIf3OpAnd3Trial = {
    rev: 0.0690317,
    pcev: 0.2030343,
    rov: 0.0111536,
    pcav: 0.0328048,
    rr: 0.0699269,
    pcrr: 0.2056674,
  };

  const resultIf3OpAnd2Trial = {
    rev: 0.06688,
    pcev: 0.1967059,
    rov: 0.0144422,
    pcav: 0.0424771,
    rr: 0.0684216,
    pcrr: 0.2012399,
  };

  it('should check that the Xbar for each user match the template', () => {
    expect(Math.round(all.spc.xBar(trialArrOfUserA) * roundTo) / roundTo).toEqual(21.9903333);
    expect(Math.round(all.spc.xBar(trialArrOfUserB) * roundTo) / roundTo).toEqual(21.9841);
    expect(Math.round(all.spc.xBar(trialArrOfUserC) * roundTo) / roundTo).toEqual(21.9894);
  });

  it('should return the RBar (average of max-min of each row', () => {
    expect(Math.round(all.spc.rBar(trialArrOfUserA) * roundTo) / roundTo).toEqual(0.0269);
    expect(Math.round(all.spc.rBar(trialArrOfUserB) * roundTo) / roundTo).toEqual(0.0162);
    expect(Math.round(all.spc.rBar(trialArrOfUserC) * roundTo) / roundTo).toEqual(0.0248);
  });

  it('should get the difference between the maximum and minimum of the Xbar', () => {
    expect(Math.round(all.spc.xBarMinMaxDiff(allTheTrials) * roundTo) / roundTo).toEqual(0.0062333);
    expect(Math.round(all.spc.xBarMinMaxDiff([trialArrOfUserA, trialArrOfUserB]) * roundTo) / roundTo).toEqual(0.0062333);
  });

  it('should get the Average of the Rbar', () => {
    expect(Math.round(all.spc.rDoubleBarAvg(allTheTrials) * roundTo) / roundTo).toEqual(0.0226333);
    expect(Math.round(all.spc.rDoubleBarAvg([trialArrOfUserA, trialArrOfUserB]) * roundTo) / roundTo).toEqual(0.02155);
  });

  it('Should give the UCL value depending on the number of trial', () => {
    // 3 operator 3 trial
    expect(Math.round(all.spc.giveTheUcl(allTheTrials) * roundTo) / roundTo).toEqual(0.058394);
    // Trying with 2 operator and 3 trial.
    expect(Math.round(all.spc.giveTheUcl([trialArrOfUserA, trialArrOfUserB]) * roundTo) / roundTo).toEqual(0.055599);
    // all operator but 2 trial:
    expect(Math.round(all.spc.giveTheUcl(allOperator2Trial) * roundTo) / roundTo).toEqual(0.04796);
  });

  it('Should match the final target value', () => {
    // Assuming a Min = 21.94 , Max = 22.28
    expect(all.spc.returnAllAnalysis(allTheTrials, 21.94, 22.28)).toEqual(resultIf3OpAnd3Trial);
    expect(all.spc.returnAllAnalysis(allOperator2Trial, 21.94, 22.28)).toEqual(resultIf3OpAnd2Trial);
  });
});

describe('It shoudl check all aspect of the Z test for the array', () => {
  const arrToCheck = [7.0180, 7.0200, 7.0150, 7.0190, 7.0160, 7.0160, 7.0200, 7.0220, 7.0150, 7.0160, 7.0180, 7.0220, 7.0260, 7.0210, 7.0160, 7.0150, 7.0160, 7.0250, 7.0240, 7.0160, 7.0230, 7.0180, 7.0160, 7.0160, 7.0140, 7.0200, 7.0210, 7.0230, 7.0200, 7.0160];
  let roundTo = 10000000,
    max = 0.036,
    min = 0.018,
    target = 7;
  it('should give me the average', () => {
    expect(Math.round(all.cap.giveAvg(arrToCheck) * roundTo) / roundTo).toEqual(7.0187667);
  });

  it('Should give me the StDev of the function', () => {
    expect(Math.round(all.cap.giveStDev(arrToCheck) * roundTo) / roundTo).toEqual(0.0033598);
  });

  it('Should give me the Upper Z value', () => {
    expect(Math.round(all.cap.zUpperSpec(7, 0.036, arrToCheck) * roundTo) / roundTo).toEqual(5.1292168);
  });

  it('Should give me the lower Z value', () => {
    expect(Math.round(all.cap.zLowerSpec(7, 0.018, arrToCheck) * roundTo) / roundTo).toEqual(10.9429907);
  });

  it('Should give me the Remaining of the Cumulative NormalDistValue of the Z Value', () => {
    expect(Math.round(all.cap.cdf(5.1292168) * roundTo) / roundTo).toEqual(0.0000001);
    expect(Math.round(all.cap.cdf(0) * roundTo) / roundTo).toEqual(0.5);
    expect(Math.round(all.cap.cdf(1.333333) * roundTo) / roundTo).toEqual(0.0912113);
    expect(Math.round(all.cap.cdf(2) * roundTo) / roundTo).toEqual(0.0227501);
  });

  it('Should give me the Zst point', () => {
    expect(Math.round(all.cap.findZst(arrToCheck, min, max) * roundTo) / roundTo).toEqual(8.0361037);
  });

  it('Should give me the Z Quality', () => {
    expect(Math.round(all.cap.findZQuality(arrToCheck, target, min, max) * roundTo) / roundTo).toEqual(4.9912169);
  });

  it('Should give me the Final Pass-Fail result', () => {
    expect(all.cap.giveMeThePassFailStatus(arrToCheck, target, min, max, 4.5)).toBeTruthy();

    const arrToCheck2 = [21.0000, 21.9910, 21.9780, 21.9880, 21.9790, 21.9860, 21.9770, 21.9890, 21.9840, 21.9880, 21.9860, 21.9890, 21.9790, 21.9830, 21.9880, 21.9760, 21.9850, 21.9860, 21.9880, 21.9890, 21.9880, 21.9850, 21.9870, 21.9880, 21.9860, 21.9780, 21.9890, 21.9760, 21.9800, 21.9820];
    expect(all.cap.giveMeThePassFailStatus(arrToCheck2, 22.11, 0.17, 0.17, 4.5)).toBeFalsy();
  });
});
