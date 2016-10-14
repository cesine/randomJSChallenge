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
 var dataStructure = require('./dataStructure'); //This return a modufiable object instead of having a copy. Waiting for Import const in ES6.

sumObj = ( obj ) => {
  return Object.keys( obj )
          .reduce( function( sum, key ){
            return sum + parseFloat( obj[key] );
          }, 0 );
};

 describe('validating the Calculation with different assumptions', () => {
   var parameters;
   beforeEach(() => {
     parameters = dataStructure.parameters(); // this will get the basic assomption about the model. Then we can change it according to the test.

    //  By forcing each parameters at 0 by start we can check the impact of each one by one.
     parameters.engineMalfunction = 0;
     parameters.refuilingDefect = 0;
     parameters.landingFaillure = 0;
     parameters.touristRatio = 0;
   });

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
     let yearToTest = dataStructure.blankYear();
     yearToTest.earthFleet.push(dataStructure.newShip());

     let resultOfYear0 = calc.calcOneYear(yearToTest, parameters);
    //  if there is no defect all should land safely.
    // console.log(resultOfYear0);
     expect(resultOfYear0.martian).toEqual(100);
     expect(resultOfYear0.earthFleet.length).toEqual(0);
     expect(resultOfYear0.marsFleet.length).toEqual(1);
     expect(resultOfYear0.totKilledIn.takeOff).toEqual(0);
     expect(resultOfYear0.totKilledIn.landing).toEqual(0);
     expect(resultOfYear0.totKilledIn.refueling).toEqual(0);
   });

   it('Should test Engine faillure year 1', () => {
     let yearToTest = dataStructure.blankYear();
     yearToTest.earthFleet.push(dataStructure.newShip());
     yearToTest.martian = 50; //Starting with 50 already.
    //  console.log("yearToTest Engine faillure:", yearToTest);

     parameters.engineMalfunction = 1; // Expectation that the engine have 100% of chance to malfunction & explode.

     let resultOfYear0 = calc.calcOneYear(yearToTest, parameters);
     let peopleLost = (parameters.persPerShip + yearToTest.martian) - (resultOfYear0.martian); // This dosent count the people leaving volontarely."Tourisum"
    // console.log(resultOfYear0);
     expect(resultOfYear0.martian).toEqual(50);
     expect(resultOfYear0.earthFleet.length).toEqual(0);
     expect(resultOfYear0.marsFleet.length).toEqual(0);
     expect(resultOfYear0.totKilledIn.takeOff).toEqual(100);
     expect(resultOfYear0.totKilledIn.landing).toEqual(0);
     expect(resultOfYear0.totKilledIn.refueling).toEqual(0);
     expect(sumObj(resultOfYear0.totKilledIn)).toEqual(peopleLost);
   });

   it('Should test refulling faillure year 1', () => {
     let yearToTest = dataStructure.blankYear();
     yearToTest.earthFleet.push(dataStructure.newShip());
     yearToTest.martian = 100; //Starting with 100 already.
    //  console.log("yearToTest Refulling faillure:", yearToTest);

     parameters.refuilingDefect = 1; // Expectation that a refuiling attemp failed and explode/cancel the mission.

     let resultOfYear0 = calc.calcOneYear(yearToTest, parameters);
     let peopleLost = (parameters.persPerShip + yearToTest.martian) - (resultOfYear0.martian); // This dosent count the people leaving volontarely."Tourisum"
     expect(resultOfYear0.martian).toEqual(100);
     expect(resultOfYear0.earthFleet.length).toEqual(0);
     expect(resultOfYear0.marsFleet.length).toEqual(0);
     expect(resultOfYear0.totKilledIn.takeOff).toEqual(0);
     expect(resultOfYear0.totKilledIn.landing).toEqual(0);
     expect(resultOfYear0.totKilledIn.refueling).toEqual(100);
     expect(sumObj(resultOfYear0.totKilledIn)).toEqual(peopleLost);
   });

   it('Should test Landing faillure year 1', () => {
     let yearToTest = dataStructure.blankYear();
     yearToTest.earthFleet.push(dataStructure.newShip());
     yearToTest.martian = 100; //Starting with 100 already.
     console.log("yearToTest Landing faillure:", yearToTest);

     parameters.landingFaillure = 1; // Stack on top of the engine faillure.

     let resultOfYear0 = calc.calcOneYear(yearToTest, parameters);
     console.log("Result of Landing faillure: ",resultOfYear0, yearToTest.earthFleet, parameters.persPerShip, yearToTest.martian, resultOfYear0.martian);
     let peopleLost = (parameters.persPerShip + yearToTest.martian) - (resultOfYear0.martian); // This dosent count the people leaving volontarely."Tourisum"
    //  if there is no defect all should land safely.
     expect(resultOfYear0.martian).toEqual(100);
     expect(resultOfYear0.earthFleet.length).toEqual(0);
     expect(resultOfYear0.marsFleet.length).toEqual(0);
     expect(resultOfYear0.totKilledIn.takeOff).toEqual(0);
     expect(resultOfYear0.totKilledIn.landing).toEqual(100);
     expect(resultOfYear0.totKilledIn.refueling).toEqual(0);
     expect(sumObj(resultOfYear0.totKilledIn)).toEqual(peopleLost);
   });
 });
