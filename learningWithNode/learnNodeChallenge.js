// All the following are from the usefull tutorial: learnyounode, It is really well done small step by step.
// https://github.com/workshopper/learnyounode

const fs = require('fs');
const path = require('path');
const http = require('http');
const bl = require('bl');
const net = require('net');
const through2Map = require('through2-map');
const url = require('url');

// Arg passed to the program
// console.log(process.argv);

function filteredlist() {
  const p = process.argv[2] || '../../downloads/';
  const fileType = `.${process.argv[3]}` || '.txt';
  fs.readdir(p, (err, list) => {
    if (err) {
      console.log('error: ', err);
      return;
    }
    list.map((obj) => {
      if (path.extname(obj) === fileType) {
        console.log(obj);
      } else {
        // console.log(path.extname(obj));
      }
    });
  });
}
// filteredlist();  // Exercice 5

function loadAExternalModule() {
  const myFilterModule = require('./myFilterModule');
  const passPath = process.argv[2];
  const extFilter = process.argv[3];

  // The module must export a single function that takes three arguments: the directory name,
  // the filename extension string and a callback function, in that order.
  myFilterModule(passPath, extFilter, makeItModular);

  function makeItModular(err, dataArr) {
    if (err) {
      return console.error(err);
    }
    dataArr.map((objToPrint) => {
      console.log(objToPrint);
    });
  }
}
// loadAExternalModule();  // Exercice 6


function makeMeAHTTPRequest() {
  const urlTofetch = process.argv[2];
  // console.log(urlTofetch);
  // http://localhost:50798
  http.get(urlTofetch, callback)
    .on('error', console.error);

  function callback(response) {
    response.setEncoding('utf8');
    // can be: "data", "error", "end"
    response.on('error', (data) => { console.error('Callback Event made on ERROR', data); });
    response.on('data', (data) => { console.log(data); });
    response.on('end', (data) => {
      // console.log("Callback Event made on End", data);
    });
  }
}
// makeMeAHTTPRequest();  // Exercice 7 Get a HTTP Request.


function httpCollect1() {
  const urlTofetch = process.argv[2];
  let allTheData = '';
  http.get(urlTofetch, callbackWithBl)
    .on('error', (data) => { console.error(data); });

  function callback(response) {
    response.on('error', (data) => { console.error(response); });
    response.on('data', (data) => {
      allTheData += data;
    });
    response.on('end', (data) => {
      allTheData = allTheData.toString();
      console.log(allTheData.length);
      console.log(allTheData);
    });
  }

  function callbackWithBl(response) {
    response.pipe(bl((err, data) => {
      if (err) {
        return console.error(err, data);
      }
      data = data.toString();
      console.log(data.length);
      console.log(data);
    }));
  }
}
// httpCollect1(); // Exercice 8 Get stream and displaying it once.

function returnMeTheData(url, position, callbackToDisplay) {
  return http.get(url, callback).on('error', data => console.error(data));

  function callback(response) {
    response.pipe(bl((err, data) => {
      if (err) {
        return err;
      }
      // console.log(data.toString());
      return callbackToDisplay(data.toString(), position);
    }));
  }
}

function jugglingAsync(response) {
  const url1 = process.argv[2];
  const url2 = process.argv[3];
  const url3 = process.argv[4];

  const urlArray = [[url1, 0], [url2, 1], [url3, 2]];
  let arrayToLog = ['', '', ''];
  let nbrReturn = 0;

  const countAndLogs = function (answer, position) {
    arrayToLog[position] = answer;
    nbrReturn++;
    if (nbrReturn === 3) {
      arrayToLog.map((sentense) => {
        console.log(sentense);
      });
    }
  };

  arrayToLog = urlArray.map((obj) => {
    returnMeTheData(obj[0], obj[1], countAndLogs);
  });
}

function bookSolution7() {
  const results = [];
  let count = 0;

  function printResults() {
    for (let i = 0; i < 3; i++) { console.log(results[i]); }
  }

  function httpGet(index) {
    http.get(process.argv[2 + index], (response) => {
      response.pipe(bl((err, data) => {
        if (err) {
          return console.error(err);
        }

        results[index] = data.toString();
        count++;

        if (count == 3) { printResults(); }
      }));
    });
  }

  for (let i = 0; i < 3; i++) {
    httpGet(i);
  }
}

// jugglingAsync(); //Exercice 9 making stuff asynch.

function zeroFill(i) {
  return (i < 10 ? '0' : '') + i;
}

function getCurrentDate() {
  const now = new Date();
  return `${now.getFullYear()}-${zeroFill(now.getMonth() + 1)}-${zeroFill(now.getDate())} ${zeroFill(now.getHours())}:${zeroFill(now.getMinutes())}\n`;
}

function timeTheServer() {
  const port = process.argv[2];
  // receive the Call, send back: "YYYY-MM-DD hh:mm" n "2013-07-06 17:42"

  const server = net.createServer((socket) => {
    // console.log("He mama I am a server", socket);
    const data = getCurrentDate();
    socket.write(data);
    socket.end();
  });
  server.listen(port);

  // date.getFullYear()
  //   date.getMonth()     // starts at 0
  //   date.getDate()      // returns the day of month
  //   date.getHours()
  //   date.getMinutes()

  // After sending the string, close the connection.
}

// timeTheServer(); // Exercice 10, TCP Testing the server Time


function makeAhttpFileServer() {
// Common dont give up!
  const port = process.argv[2];
  const fileToServe = process.argv[3];
  // console.log(fileToServe);
  const server = http.createServer((request, response) => {
    response.writeHead(200, { 'content-type': 'text/plain' }); // I did not do the header and it work :/ strange.
    fs.createReadStream(fileToServe).pipe(response);
  });
  server.listen(port);
}

// makeAhttpFileServer(); // HTTP FILE SERVER (Exercise 11 of 13)

function makeAServerUppercase() {
  const port = process.argv[2];
  const fileToServe = process.argv[3];
  // console.log(fileToServe);
  const server = http.createServer((request, response) => {
    // response.writeHead(200, { 'content-type': 'text/plain' });  // I did not do the header and it work :/ strange.
    request.pipe(through2Map(chunk => chunk.toString().toUpperCase())).pipe(response);
  });
  server.listen(port);
}


// makeAServerUppercase(); // HTTP UPPERCASERER (Exercise 12 of 13)

// HTTP API Server get at location: /api/parsetime:argumentIso (iso=2013-08-10T12:10:15.474Z) return the parsed dates
// /api/unixtime  --> Return date.now(); { "unixtime": 1376136615474 }
function spawnAJsonApiServer() {
  const port = process.argv[2];

  const server = http.createServer((request, response) => {
     		const parsedUrl = url.parse(request.url, true);
     		const receivedDate = new Date(parsedUrl.query.iso);
     		let dateToSendBack = '';
     		response.writeHead(200, { 'Content-Type': 'application/json' });

     		console.log(parsedUrl);
     		if (parsedUrl.pathname === '/api/parsetime') {
     			dateToSendBack = JSON.stringify({
     				hour: receivedDate.getHours(),
     				minute: receivedDate.getMinutes(),
     				second: receivedDate.getSeconds(),
     			});
     		}

     		if (parsedUrl.pathname === '/api/unixtime') {
     			dateToSendBack = JSON.stringify({ unixtime: receivedDate.getTime() });
     		}

     		response.write(dateToSendBack);
     		response.end();
  });
  server.listen(port);
}


spawnAJsonApiServer(); // HTTP JSON API SERVER (Exercise 13 of 13)

// You've finished all the challenges! Hooray!
