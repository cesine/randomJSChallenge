/*jshint esversion: 6 */

var express = require('express');
var app = express();


// Own Dependency
var calc = require('./calculation');

// Fix Variable:
var port = 1701;

app.get('/', function (req, res) {
  "use strict";
  let rand = calc.giveMeRandomNumber();
  res.send('Display data here' + rand);
});

app.listen(port, function () {
  console.log('Server running on:', port);
});
