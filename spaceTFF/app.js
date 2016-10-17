/*jshint esversion: 6 */

var express = require('express');
var app = express();
var nunjucks = require('nunjucks');

var _templates = process.env.NODE_PATH ? process.env.NODE_PATH + '/templates' : 'templates' ;
nunjucks.configure(_templates, {
    autoescape: true,
    express: app
});
app.engine( 'html', nunjucks.render );
app.set( 'view engine', 'html' );
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css')); // redirect CSS bootstrap
app.use('/customcss', express.static(__dirname + '/customcss'));

// Own Dependency
var calc = require('./calculation');
var dataStructure = require('./dataStructure');

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
  let popGrowth = calc.iterateThat([initialCondition], param, 30, 10000, 1);
  // let popGrowth = [initialCondition];
  res.render('index', {popGrowth: popGrowth});
});

module.exports = app;
