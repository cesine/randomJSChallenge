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
   totKilledInJourney: 0
 });
};

module.exports = data;
