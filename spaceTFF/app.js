/*jshint esversion: 6 */

var express = require('express');
var app = express();


// Own Dependency
var calc = require('./calculation');
var dataStructure = require('./dataStructure');

// Fix Variable:
var port = 1701;

app.get('/', function (req, res) {
  "use strict";
  let initialCondition = dataStructure.blankYear();
  let param = dataStructure.parameters();
  // {
  //   persPerShip: 100,
  //   engineMalfunction: 0.1,
  //   refuilingDefect: 0.02,
  //   landingFaillure: 0.05,
  //   reusabilityOfShip: 5,
  //   improvement: 0.05,
  //   firstStageEngine: 42,
  //   itsEngine: 9,
  //   touristRatio: 0.3,
  //   orbitRefulling: 4,
  //   probIncreaseProdOfIts: 0,
  //   itsIncreaseOf: 1,
  // }
  param.probIncreaseProdOfIts = 0.3;
  param.itsIncreaseOf = 1;
  let popGrowth = calc.iterateThat([initialCondition], param, 100, 1000000, 1);
  res.json(popGrowth);
});

app.listen(port, function () {
  console.log('Server running on:', port);
});
