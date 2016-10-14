/*jshint esversion: 6 */
// Function and variable needed:

// Loss of life:
// Faillure % at launch?
// Faillure % per motor activation?
// Faillure % per refulling attemp.
// Failed % per landing.
// Death ratio per year per lack of medical Care/Accident/Other.

// Variable needed:
// var persPerShip = 100;
// var engineMalfunction = 0.00; // Expectation that the engine have 1% of chance to malfunction & explode.
// var refuilingDefect = 0.00; // Expectation that a refuiling attemp failed and explode/cancel the mission.
// var landingFaillure = 0.0; // Stack on top of the engine faillure.

const data = require('./dataStructure');

// Object needed:
const calc = {};

calc.giveMeRandomNumber = () => {
  return Math.random();
};

calc.shouldItFail = (nbrTime, failRatio) => {
  // This is a Crude calculation but will give the % in the long run. We could adapt a more fancy algorithm but normally the algo is already there to find the failRatio.
  for(let i=0; i < nbrTime; i++) {
    if(Math.random() < failRatio) return false; // Catastrophic faillure so flight crash.
  }
  return true; //All Good.
};

calc.launchToSpaceFromEarth = () => {

};

calc.calcOneYear = (currentYear, parameters) => {
 let persPerShip = parameters.persPerShip,
 engineMalfunction = parameters.engineMalfunction,
 refuilingDefect = parameters.refuilingDefect,
 landingFaillure = parameters.landingFaillure,
 firstStageEngine = parameters.firstStageEngine,
 orbitRefulling = parameters.orbitRefulling,
 itsEngine = parameters.itsEngine,
 touristRatio = parameters.touristRatio;

  // Steps: Way there
  // Launch from Earth to Orbit
  let death = data.killedOption();
  let nbrBefore = currentYear.earthFleet.length;
  currentYear.earthFleet = currentYear.earthFleet.filter(() => {
      // We currently dont care about the object itself, we just want to randomely check if it pass or fail
      // if it fail it is automatically removed from the list. so we can test the next risk.
      let failOrNot = calc.shouldItFail(firstStageEngine, engineMalfunction);
      if (!failOrNot) {death.takeOff +=  persPerShip;}
      return failOrNot;
    }
  );

  // Refuel in orbit (4x)
  currentYear.earthFleet = currentYear.earthFleet.filter(() => {
    let failOrNot = calc.shouldItFail(orbitRefulling, refuilingDefect);
    if (!failOrNot) {death.refueling +=  persPerShip;}
    return failOrNot;
  });

  // Launch to Next planet
  currentYear.earthFleet = currentYear.earthFleet.filter(() => {
    let failOrNot = calc.shouldItFail(itsEngine, engineMalfunction);
    if (!failOrNot) {death.journey +=  persPerShip;}
    return failOrNot;
  });

  // Decelerate on arrival
  currentYear.earthFleet = currentYear.earthFleet.filter(() => {
    let failOrNot = calc.shouldItFail(itsEngine, engineMalfunction);
    if (!failOrNot) {death.journey +=  persPerShip;}
    return failOrNot;
  });

  // landing
  currentYear.earthFleet = currentYear.earthFleet.filter(() => {
    let failOrNot = calc.shouldItFail(1, landingFaillure);
    if (!failOrNot) {death.landing +=  persPerShip;}
    return failOrNot;
  }); //Once landing per ship :)


  // "Same time" Take what is on mars already.
  // Refulling (1x) --> No casulty if fail, just lost of ship.
  currentYear.marsFleet = currentYear.marsFleet.filter(() => {
    let failOrNot = calc.shouldItFail(1, refuilingDefect);
    if (!failOrNot) {
      // No casulty if fail, just lost of ship.
      // death.takeOff +=  0;
    }
    return failOrNot;
  });

  let nbrMarsStart = currentYear.marsFleet.length; //No loss at refueling since it is done empty of people.
  // Depart of tourist from land.
  currentYear.marsFleet = currentYear.marsFleet.filter(() => {
    let failOrNot = calc.shouldItFail(itsEngine, refuilingDefect);
    if (!failOrNot) {death.takeOff +=  Math.round(persPerShipt * touristRatio);}
    return failOrNot;
  });

  // Decelerating on Earth
  currentYear.marsFleet = currentYear.marsFleet.filter(() => {
    let failOrNot = calc.shouldItFail(itsEngine, refuilingDefect);
    if (!failOrNot) {death.journey +=  Math.round(persPerShipt * touristRatio);}
    return failOrNot;
  });

  // Landing back on Earth.
  currentYear.marsFleet = currentYear.marsFleet.filter(() => {
    let failOrNot = calc.shouldItFail(1, landingFaillure);
    if (!failOrNot) {death.landing +=  Math.round(persPerShipt * touristRatio);}
    return failOrNot;
  }); //Once landing per ship :)

  let newArrival = currentYear.earthFleet.length * persPerShip;
  let tourist = Math.round(currentYear.earthFleet.length * touristRatio);

  // Maximum of 100 per ship
  if (tourist / nbrMarsStart > persPerShip) {
    // would only arrive if the return ratio is 100% or fail rate is SUPER high on refuling.
    tourist = persPerShip * nbrMarsStart;
  }
  currentYear.martian += newArrival - tourist;

  // Adding 1 trip to all ship and retirering old one.
  currentYear.marsFleet = currentYear.marsFleet.map((obj)=>{
    if (obj.trip < reusabilityOfShip) {
      obj.trip ++;
      return obj;
    }
  });

  // Noticed that Mars and Earth fleet are inversed. This is because What left from Earth is now on the surface of Mars and vice versa.
  let objToReturn = {
    martian: currentYear.martian,
    earthFleet: currentYear.marsFleet,
    marsFleet: currentYear.earthFleet,
    totKilledIn: death
  };
  // console.log(objToReturn);
  return objToReturn;
};

module.exports = calc;
