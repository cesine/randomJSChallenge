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

module.exports = data;
