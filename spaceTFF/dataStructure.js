/*jshint esversion: 6 */
var data = {}; //until Import work out of the box and I can use const.

data.newShip = () => {
  return Object.assign({},{trip:0});
};

data.blankYear = () => {
 return Object.assign({}, {
   martian: 0,
   earthFleet: [],
   marsFleet: [],
   totKilledIn: {}
 });
};

data.killedOption = () => {
  return Object.assign({}, {
    takeOff: 0,
    journey: 0,
    landing: 0,
    refueling: 0
  });
};

data.parameters = () => {
  return Object.assign({},
    {
      persPerShip: 100,
      engineMalfunction: 0.0,
      refuilingDefect: 0.0,
      landingFaillure: 0.0,
      reusabilityOfShip: 5,
      improvement: 0.05,
      firstStageEngine: 42,
      itsEngine: 9,
      touristRatio: 0.3,
      orbitRefulling: 4
    }
  );
};

module.exports = data;
