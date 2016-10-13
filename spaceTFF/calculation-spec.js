/*jshint esversion: 6 */
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

 var  calc = require('./calculation');

 describe('validating the Calculation with different assumptions', () => {
   it('Should return a random number', () => {
     expect(calc.giveMeRandomNumber()).toBeGreaterThan(0);
   });

   it('Should fail with 100% faillure', () => {
     expect(calc.shouldItFail(42,1)).toBeFalsy();
   });

   it('Should pass with 0% faillure', () => {
     expect(calc.shouldItFail(42,0)).toBeTruthy();
   });

   it('Should test the No faillure year 1', () => {
     let yearToTest = {
       martian: 0,
       earthFleet: [{trip:0}],
       marsFleet: [],
       totKilledInJourney: 0
     };
     let persPerShip = 100;
     let engineMalfunction = 0.00; // Expectation that the engine have 1% of chance to malfunction & explode.
     let refuilingDefect = 0.00; // Expectation that a refuiling attemp failed and explode/cancel the mission.
     let landingFaillure = 0.0; // Stack on top of the engine faillure.

     let resultOfYear0 = calc.calcOneYear(yearToTest, persPerShip, engineMalfunction, refuilingDefect, landingFaillure);
    //  if there is no defect all should land safely.
    console.log(resultOfYear0);
     expect(resultOfYear0.martian).toEqual(100);
     expect(resultOfYear0.earthFleet.length).toEqual(0);
     expect(resultOfYear0.marsFleet.length).toEqual(1);
     expect(resultOfYear0.totKilledInJourney).toEqual(0);
   });

   it('Should test Engine faillure year 1', () => {
     let yearToTest = {
       martian: 100,
       earthFleet: [{trip:0}],
       marsFleet: [],
       totKilledInJourney: 0
     };
     let persPerShip = 100;
     let engineMalfunction = 1; // Expectation that the engine have 1% of chance to malfunction & explode.
     let refuilingDefect = 0.0; // Expectation that a refuiling attemp failed and explode/cancel the mission.
     let landingFaillure = 0.0; // Stack on top of the engine faillure.

     let resultOfYear0 = calc.calcOneYear(yearToTest, persPerShip, engineMalfunction, refuilingDefect, landingFaillure);
    //  if there is no defect all should land safely.
    console.log(resultOfYear0);
     expect(resultOfYear0.martian).toEqual(100);
     expect(resultOfYear0.earthFleet.length).toEqual(0);
     expect(resultOfYear0.marsFleet.length).toEqual(0);
     expect(resultOfYear0.totKilledInJourney).toEqual(100);
   });

   it('Should test refulling faillure year 1', () => {
     let yearToTest = {
       martian: 100,
       earthFleet: [{trip:0}],
       marsFleet: [],
       totKilledInJourney: 0
     };
     let persPerShip = 100;
     let engineMalfunction = 0; // Expectation that the engine have 1% of chance to malfunction & explode.
     let refuilingDefect = 1; // Expectation that a refuiling attemp failed and explode/cancel the mission.
     let landingFaillure = 0.0; // Stack on top of the engine faillure.

     let resultOfYear0 = calc.calcOneYear(yearToTest, persPerShip, engineMalfunction, refuilingDefect, landingFaillure);
    //  if there is no defect all should land safely.
    console.log(resultOfYear0);
     expect(resultOfYear0.martian).toEqual(100);
     expect(resultOfYear0.earthFleet.length).toEqual(0);
     expect(resultOfYear0.marsFleet.length).toEqual(0);
     expect(resultOfYear0.totKilledInJourney).toEqual(100);
   });

   it('Should test Landing faillure year 1', () => {
     let yearToTest = {
       martian: 100,
       earthFleet: [{trip:0}],
       marsFleet: [],
       totKilledInJourney: 0
     };
     let persPerShip = 100;
     let engineMalfunction = 0; // Expectation that the engine have 1% of chance to malfunction & explode.
     let refuilingDefect = 0; // Expectation that a refuiling attemp failed and explode/cancel the mission.
     let landingFaillure = 1; // Stack on top of the engine faillure.

     let resultOfYear0 = calc.calcOneYear(yearToTest, persPerShip, engineMalfunction, refuilingDefect, landingFaillure);
    //  if there is no defect all should land safely.
    console.log(resultOfYear0);
     expect(resultOfYear0.martian).toEqual(100);
     expect(resultOfYear0.earthFleet.length).toEqual(0);
     expect(resultOfYear0.marsFleet.length).toEqual(0);
     expect(resultOfYear0.totKilledInJourney).toEqual(100);
   });
 });