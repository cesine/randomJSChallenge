// This is from: https://github.com/bulkan/async-you 
// Design to try/play with the Async Library

var http = require('http'), 
async = require('async'),
fs = require('fs');

function gettingSomeWaterfall() {

	// var fetchServer = "http://localhost:3131";
	var fileTORead = process.argv[2];
	var body = '';
	// console.log(fetchServer);

	async.waterfall([
	  function(callToPassArgToNextFnct){
	    fs.readFile(fileTORead, function(err, data){
	      if (err) {
	      	return done(err, null);
	      }
	      callToPassArgToNextFnct(null, data);
	    });
	  },

	  function(data2, callToPassArgToNextFnct){
	    var body = '';
	    http.get(data2.toString().trimRight(), function(res){
	      res.on('data', function(chunk){
	        body += chunk.toString();
	      });

	      res.on('end', function(chunk){
	        callToPassArgToNextFnct(null, body);
	      });
	    }).on('error', function(e){
	      callToPassArgToNextFnct(e);
	    });
	  }
	], function done(err, result){
	  // if (err) {return console.error(err)};
	  console.log(result);
	});

} //gettingSomeWaterfall(); // WATERFALL Exercise 1 of 7



function makeSomeSeriesHappen () {
	async.series({
		requestOne: function(arvgToPassToNext){
			fetchSomeUrl(process.argv[2], arvgToPassToNext);
		},
		requestTwo: function(arvgToPassToNext){
			fetchSomeUrl(process.argv[3], arvgToPassToNext);
		}
	}, function(err, result) {
		if (err) {return console.error("ERROR: ", err);}
		console.log(result);
	});

	function fetchSomeUrl (url, arvgToPassToNext) {
		var body = '';
		http.get(url, function(res) {
				res.on('data', function(chunk) {
					body += chunk.toString();
				});
				res.on('end', function(chunk) {
					arvgToPassToNext(null, body);
				});
			}).on('error', function(err){
				arvgToPassToNext(err);
			});
	} 


} //makeSomeSeriesHappen(); // SERIES OBJECT Exercise 2 of 7


function gettingSomeOfEach() {
	var arrayToCheck = [process.argv[2], process.argv[3]];

	async.each(arrayToCheck, function(url, resolve) {
		var body = '';
		http.get(url, function(res) {
			res.on('data', function(chunk){
				body += chunk.toString();
			});
			res.on('end', function() {
				resolve(null, body);
			});
		}).on('error', function(err){
			resolve(err);
		});
	}, function (err) {
		if (err) {return console.log(err);}
	});


} //gettingSomeOfEach(); //EACH Exercise 3 of 7

function mapMeSomething () {
	var arrayToCheck = [process.argv[2], process.argv[3]];

	async.map(arrayToCheck, function(url, resolve) {
		var body = '';
		http.get(url, function(res) {
			res.on('data', function(chunk){
				body += chunk.toString();
			});
			res.on('end', function() {
				resolve(null, body);
			});
		}).on('error', function(err){
			resolve(err);
		});
	}, function (err, result) {
		if (err) {return console.error(err);}
		console.log(result);
	});


} //mapMeSomething(); // MAP Exercise 4 of 7

function timeMeSomething() {
	var url = process.argv[2];
	var port = process.argv[3];
	var optsPush = {
		hostname: url,
		path: '/users/create',
		method: 'POST',
		port: port
	};

	var optsGet = {
		hostname: url,
		path: '/users/',
		method: 'GET',
		port: port
	};

	// console.log(opts);

	async.times(5, function(nbr, callNext) {
		nbr ++;
		var body = '', item = '';
		var req = http.request(optsPush, function(res) {
			res.on('data', function(chunk) {body += chunk;});
			res.on('end', function(err) {
				return body;
			});
		});
		req.write(JSON.stringify({"user_id": nbr}));
		req.on('error', function(err) {
			console.log("error inside the POST!!!");
		});
		req.end(function(){callNext(null, nbr); });
	}, function(err, users){
		var body = '', item = '';
		var req = http.request(optsGet, function(res) {
			res.on('data', function(chunk) {body += chunk;});
			res.on('end', function(err) {
				console.log(body);
			});
		});
		req.write('GET');
		req.on('error', function(err) {
			console.log("Error inside the GET!!!", err);
		});
		req.end(function(){});
	});

} //timeMeSomething(); // TIMES Exercise 5 of 7

function reduceSomethingIfYouAreNice() {

// reduce(coll, memo, iteratee, [callback])

	var url = process.argv[2];
	// console.log(url);
	var arrayToFetch = ['one', 'two', 'three'];
	async.reduce(arrayToFetch, 0, function(lastState, item, sendNext){
		var body = '';
		http.get(url + "?number=" +item, function(res){
			res.on('data', function(chunk) {body += chunk; });
			res.on('end', function(chunk) {
				sendNext(null, lastState + parseFloat(body));
			});
			res.on('error', function(err) {console.log("FUCK THIS Err:", err); });
		}).on('error', function(err) {console.log("FUCK THIS Err:", err); });
	}, function(err, result) {
		if (err) {console.log(err);}
		console.log(result);
	});

} reduceSomethingIfYouAreNice(); //REDUCE Exercise 6 of 7

function lastOneIsNotAWish() {
	var url = process.argv[2];
	var target = 'meerkat';
	var currentStr = '';
	var iter = 1;


	var testFnct = function () {
		if (currentStr.indexOf(target) > -1) {
			return false;
		} else {
			return true;
		}
	};

	var operationFnct = function (callback) {
		var body = '';
		http.get(url, function(res) {
			res.on('data', function(chunk) {body += chunk.toString();});
			res.on('end', function() {
				iter ++;
				currentStr = body;
				callback(null, body);
			});
			res.on('error', function(err) {
			console.log("MOTHERFUCKER OF ERROR: ",err);
		});
		}).on('error', function(err) {
			callback(err);
		});
	};

	var logsIter = function(err, someData) {
		if (err) {console.error("TOTALErr: ",err);}
		console.log(iter);
	};

	async.whilst(testFnct, operationFnct, logsIter);

} //lastOneIsNotAWish();  //WHILST Exercise 7 of 7 --> Their soltion dosent work eather but whathever, the principle is there. 






