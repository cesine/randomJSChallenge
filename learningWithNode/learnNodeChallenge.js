// All the following are from the usefull tutorial: learnyounode, It is really well done small step by step. 
// https://github.com/workshopper/learnyounode

var fs = require("fs");
var path = require("path");
var http = require("http");
var bl = require('bl');
var net = require('net');
var through2Map = require('through2-map');
var url = require('url');

// Arg passed to the program
// console.log(process.argv);

function filteredlist () {
	var p = process.argv[2] || '../../downloads/';
	var fileType = '.' + process.argv[3] || '.txt';
	fs.readdir(p, function callback (err, list) { 
		if(err) {
			console.log("error: ", err);
			return;
		}
		list.map(function(obj){
			if (path.extname(obj) === fileType) {
				console.log(obj);
			} else {
				// console.log(path.extname(obj));
			}
		});
	});
}
// filteredlist();  // Exercice 5

function loadAExternalModule () {

	var myFilterModule = require('./myFilterModule');
	var passPath = process.argv[2];
	var extFilter = process.argv[3];

	// The module must export a single function that takes three arguments: the directory name,
	// the filename extension string and a callback function, in that order.
	myFilterModule(passPath, extFilter, makeItModular);

	function makeItModular (err, dataArr) {
		if (err) {
			return console.error(err);
		} else {
			dataArr.map(function(objToPrint) {
				console.log(objToPrint);
			});
		}
	}
}
// loadAExternalModule();  // Exercice 6


function makeMeAHTTPRequest() {
	var urlTofetch = process.argv[2];
	// console.log(urlTofetch);
	// http://localhost:50798
	http.get(urlTofetch, callback)
		.on('error', console.error);

	function callback(response) {
		response.setEncoding('utf8');
		// can be: "data", "error", "end"
		response.on("error", function (data) {console.error("Callback Event made on ERROR", data); });
		response.on("data", function (data) {console.log(data); });
		response.on("end", function (data) { 
			// console.log("Callback Event made on End", data);
		});
	}
}
// makeMeAHTTPRequest();  // Exercice 7 Get a HTTP Request.


function httpCollect1() {
	var urlTofetch = process.argv[2];
	var allTheData = "";
	http.get(urlTofetch, callbackWithBl)
		.on('error', function(data){console.error(data);});

	function callback (response) {
		response.on('error', function(data){console.error(response);});
		response.on('data', function(data) {
			allTheData = allTheData + data;
		});
		response.on('end', function(data) {
			allTheData = allTheData.toString();
			console.log(allTheData.length);
			console.log(allTheData);
		});
	}

	function callbackWithBl(response) {
		response.pipe(bl(function (err, data) {
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
	return http.get(url, callback).on('error', function(data) {return console.error(data);});

	function callback (response) {
		response.pipe(bl(function (err, data) {
			if (err) {
				return err;
			}
			// console.log(data.toString());
			return callbackToDisplay(data.toString(), position);
			
		}));
	}
}

function jugglingAsync(response) {
	var url1 = process.argv[2];
	var url2 = process.argv[3];
	var url3 = process.argv[4];

	var urlArray = [[url1,0], [url2,1], [url3,2]];
	var arrayToLog = ["","",""];
	var nbrReturn = 0;

	var countAndLogs = function(answer, position) {
		arrayToLog[position] = answer;
		nbrReturn ++;
		if (nbrReturn === 3) {
			arrayToLog.map(function(sentense) {
				console.log(sentense);
			});
		}
	};

	arrayToLog = urlArray.map(function(obj) {
		returnMeTheData(obj[0], obj[1], countAndLogs);
	});
}

function bookSolution7 () {
  var results = [];
  var count = 0;

   function printResults () {
     for (var i = 0; i < 3; i++)
       console.log(results[i]);
   }

   function httpGet (index) {
     http.get(process.argv[2 + index], function (response) {
       response.pipe(bl(function (err, data) {
         if (err) {
           return console.error(err);
         }

         results[index] = data.toString();
         count++;

         if (count == 3)
           printResults();
       }));
     });
   }

   for (var i = 0; i < 3; i++) {
     httpGet(i);
   }
}

// jugglingAsync(); //Exercice 9 making stuff asynch.

function zeroFill(i) {
  return (i < 10 ? '0' : '') + i;
}

function getCurrentDate() {
	var now = new Date();
	return now.getFullYear()+'-'+zeroFill(now.getMonth()+1)+'-'+zeroFill(now.getDate())+' '+zeroFill(now.getHours())+':'+zeroFill(now.getMinutes()) + "\n";
}

function timeTheServer () {
	var port = process.argv[2];
	// receive the Call, send back: "YYYY-MM-DD hh:mm" n "2013-07-06 17:42"

	var server = net.createServer(function (socket){
       // console.log("He mama I am a server", socket);
       var data = getCurrentDate();
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


function makeAhttpFileServer () {
// Common dont give up!
	var port = process.argv[2];
	var fileToServe = process.argv[3];
	// console.log(fileToServe);
	var server = http.createServer(function (request, response) {
		response.writeHead(200, { 'content-type': 'text/plain' });  // I did not do the header and it work :/ strange. 
		fs.createReadStream(fileToServe).pipe(response);
	});
	server.listen(port);
}

// makeAhttpFileServer(); // HTTP FILE SERVER (Exercise 11 of 13)

function makeAServerUppercase() {
	var port = process.argv[2];
	var fileToServe = process.argv[3];
	// console.log(fileToServe);
	var server = http.createServer(function (request, response) {
		// response.writeHead(200, { 'content-type': 'text/plain' });  // I did not do the header and it work :/ strange. 
		request.pipe(through2Map(function (chunk) {
       return chunk.toString().toUpperCase();
     })).pipe(response);
	});
	server.listen(port);

}


// makeAServerUppercase(); // HTTP UPPERCASERER (Exercise 12 of 13)

//HTTP API Server get at location: /api/parsetime:argumentIso (iso=2013-08-10T12:10:15.474Z) return the parsed dates
// /api/unixtime  --> Return date.now(); { "unixtime": 1376136615474 }
function spawnAJsonApiServer () {
	var port = process.argv[2];

     var server = http.createServer(function(request, response) {
     		var parsedUrl = url.parse(request.url, true);
     		var receivedDate = new Date(parsedUrl.query.iso);
     		var dateToSendBack = "";
     		response.writeHead(200, { 'Content-Type': 'application/json' })

     		console.log(parsedUrl);
     		if (parsedUrl.pathname === '/api/parsetime') {
     			dateToSendBack = JSON.stringify({
     				hour: receivedDate.getHours(),
     				minute: receivedDate.getMinutes(),
     				second: receivedDate.getSeconds()
     			});
     		}

     		if (parsedUrl.pathname === '/api/unixtime') {
     			dateToSendBack = JSON.stringify({unixtime:receivedDate.getTime()});
     		}

     		response.write(dateToSendBack);
     		response.end();

     });
     server.listen(port);
}


spawnAJsonApiServer(); // HTTP JSON API SERVER (Exercise 13 of 13)

// You've finished all the challenges! Hooray!