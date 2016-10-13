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

const reusabilityOfShip = 5;
const improvement = 0.05; // improvement over the last time: ex 10% landing faillure, then 0.1*0.9 = 0.09 then 0.09*0.9 = 0.081 and so on every years.
const firstStageEngine = 42;
const itsEngine = 9;
const touristRatio = 0.3; // Ratio of tourist that just arrived that will leave in the next flight out.
const orbitRefulling = 4;

// Object needed:
let newShip = {trip:0};
let population = [{
  martian: 0,
  earthFleet: [{trip:0}],
  marsFleet: [],
  totKilledInJourney: 0
}];
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

calc.calcOneYear = (currentYear, persPerShip, engineMalfunction, refuilingDefect, landingFaillure) => {

  // Steps: Way there
  // Launch from Earth to Orbit
  let nbrBefore = currentYear.earthFleet.length;
  currentYear.earthFleet = currentYear.earthFleet.filter(() => {
      // We currently dont care about the object itself, we just want to randomely check if it pass or fail
      return calc.shouldItFail(firstStageEngine, engineMalfunction);
    }
  );

  // Refuel in orbit (4x)
  currentYear.earthFleet = currentYear.earthFleet.filter(() => {return calc.shouldItFail(orbitRefulling, refuilingDefect);});

  // Launch to Next planet
  currentYear.earthFleet = currentYear.earthFleet.filter(() => {return calc.shouldItFail(itsEngine, engineMalfunction);});

  // Decelerate on arrival
  currentYear.earthFleet = currentYear.earthFleet.filter(() => {return calc.shouldItFail(itsEngine, engineMalfunction);});

  // landing
  currentYear.earthFleet = currentYear.earthFleet.filter(() => {return calc.shouldItFail(1, landingFaillure);}); //Once landing per ship :)


  // "Same time" Take what is on mars already.
  // Refulling (1x) --> No casulty if fail, just lost of ship.
  currentYear.marsFleet = currentYear.marsFleet.filter(() => {return calc.shouldItFail(1, refuilingDefect);});

  let nbrMarsStart = currentYear.marsFleet.length; //No loss at refueling since it is done empty of people.
  // Depart of tourist from land.
  currentYear.marsFleet = currentYear.marsFleet.filter(() => {return calc.shouldItFail(itsEngine, refuilingDefect);});

  // Decelerating on Earth
  currentYear.marsFleet = currentYear.marsFleet.filter(() => {return calc.shouldItFail(itsEngine, refuilingDefect);});

  // Landing back on Earth.
  currentYear.marsFleet = currentYear.marsFleet.filter(() => {return calc.shouldItFail(1, landingFaillure);}); //Once landing per ship :)

  let newArrival = currentYear.earthFleet.length * persPerShip;
  let tourist = Math.round(currentYear.earthFleet.length * touristRatio);
  let nbrKilledOnTheWay = (nbrBefore - currentYear.earthFleet.length) * persPerShip;
  let nbrKilledWayBack = Math.round((currentYear.marsFleet.length/nbrMarsStart) * tourist) || 0; //This is to prevent 0/0 when we start.
  // console.log("newArrival: ", newArrival);
  // console.log("tourist: ", tourist);
  // console.log("nbrKilledOnTheWay: ", nbrKilledOnTheWay);
  // console.log("nbrKilledWayBack: ", nbrKilledWayBack);
  // Maximum of 100 per ship
  if (tourist / nbrMarsStart > persPerShip) {
    // would only arrive if the return ratio is 100% or fail rate is SUPER high on refuling.
    tourist = persPerShip * nbrMarsStart;
  }
  currentYear.martian += newArrival - tourist;
  currentYear.totKilledInJourney += nbrKilledOnTheWay + nbrKilledWayBack; // nbr of tourist ship back that failed are not full.

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
    totKilledInJourney: currentYear.totKilledInJourney
  };
  // console.log(objToReturn);
  return objToReturn;
};

module.exports = calc;