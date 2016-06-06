// npm install -g promise-it-wont-hurt@latest
// https://github.com/stevekane/promise-it-wont-hurt
// ES6 promesses tutorial
// 'use strict';

// var qio = require('q-io');
var qhttp = require("q-io/http");
// var http = require('http');


function warmup() {
	setTimeout(function() {
		console.log("TIMED OUT!");
	}, 300);
} // warmup();  Exercise 1 of 13

function fulfillPromise() {
	var fulfillAfterTimeout = new Promise(function(fulfill, reject) {
		setTimeout(function() {
			fulfill("FULFILLED!");
		}, 300);
	});

	fulfillAfterTimeout.then(function(dataReceived) {
		console.log(dataReceived);
	});
} // fulfillPromise(); // Fulfill a promise Exercise 2 of 13


function rejectingIt() {
	var rejectMyPromesses = new Promise(function(fulfill, reject) {
		setTimeout(function() {
			reject(new Error('REJECTED!'));
		}, 300);
	});

	function onReject(error) {
		console.log(error.message);
	}

	rejectMyPromesses.then(function(data) {
		console.log(data);
	}, function(error) {
		onReject(error);
	});
} // rejectingIt(); //Reject a promise Exercise 3 of 13


function fireOrNoFire() {

	var multipleCall = new Promise(function(fulfill, reject) {
		fulfill('I FIRED');
		reject(new Error('I DID NOT FIRE'));
	});

	function onError(err) {
		console.log(err.message);
	}

	multipleCall.then(function(data) {
		console.log(data);
	}, function(err) {
		onError(err);
	});
} // fireOrNoFire(); //To reject or not to reject Exercise 4 of 13

function asynchMeThis() {
	callMeManyTime = new Promise(function(fulfill, reject) {
		fulfill('PROMISE VALUE');
	});

	callMeManyTime.then(console.log);
	console.log('MAIN PROGRAM');
} // asynchMeThis(); //Always asynchronous Exercise 5 of 13

function someShortcut() {
	var canIhaveAbanana = Promise.resolve("Only if it is Yellow");
	var willThePizzaGetHereSoon = Promise.reject(new Error("Keep dreaming"));

	willThePizzaGetHereSoon.then(function(data){
		console.log(data);
	}).catch(function(err){
		console.log(err.message);
	});

	canIhaveAbanana.then(function(data){
		console.log(data);
	}).catch(function(err){
		console.log(err.message);
	});
} // someShortcut(); // Shortcuts Exercise 6 of 13


function misteryChainPromises() {
	// var firstPromise = first();
	first().then(function (val) {
	  	return second(val);
	}).then(console.log);
} //misteryChainPromises(); //Promise after promise Exercise 7 of 13


function promessAndValue () {
	fetchName = new Promise(function(fulfill, reject){
		fulfill('MANHATTAN');
	});

	function attachTitle(name) {
		return 'DR. ' + name;
	}

	fetchName.then(attachTitle).then(console.log);

} //promessAndValue();// Values and promises Exercise 8 of 13


function someErrorInTheBasket() {
	var invalidJson = process.argv[2];
		function parsePromised(someJson) {
			return new Promise(function(fulfill, reject) {
				try	{
					fulfill(JSON.parse(process.argv[2]));
				} catch (e) {
					reject(e);
				}
			});
		}

		parsePromised(invalidJson).then(function(data){
			console.log(data);
		}, function(err) {
			console.log(err);
		});

} //someErrorInTheBasket() // Throw an error Exercise 9 of 13

function thereIsAlwaysACatch () {
	function alwaysThrows () {
		throw new Error("OH NOES");
	}

	function iterate (someNbr) {
			console.log(someNbr);
			return ++someNbr;
	}

	function logTheData(data) {
		console.log(data);
	}

	Promise.resolve(iterate(1))
		.then(iterate)
		.then(iterate)
		.then(iterate)
		.then(iterate)
		.then(alwaysThrows)
		.then(iterate)
		.then(iterate)
		.then(iterate)
		.then(iterate)
		.then(iterate)
		.then(null, console.log);
		
		
} //thereIsAlwaysACatch();
// An important rule Exercise 10 of 13

function multiPromInSequence() {

	function all (prom1, prom2) {
		var counter = 0;
		// return only when both are completed
		return new Promise(function(fulfill, reject) {
			var allValue = [];

			function incremAndSend() {
				counter ++;
				// console.log(counter);
				if (counter == 2) {
					fulfill(allValue);
				}
			}

			prom1.then(function(data1) {
				allValue[0] = data1;
				// console.log(data1);
				incremAndSend();
			});

			prom2.then(function(data2){
				// console.log("Data2");
				allValue[1] = data2;
				incremAndSend();
			});
		});
	}

	all(getPromise1(), getPromise2()).then(function(data) {
		console.log(data);
	});
} //multiPromInSequence(); // Multiple promises Exercise 11 of 13



function makeItReal () {
	var urlToFetch = 'http://localhost:1337';

	http.read(urlToFetch).then(function(data) {
		console.log(JSON.parse(data));
	}).then(null, console.error)
    .done();
} //makeItReal(); //Fetch JSON Exercise 12 of 13


function getSomeWorkDone() {
	var urlToFetch = 'http://localhost:';
	var getString = urlToFetch + 7000;
	var DBPort = urlToFetch + 7001;

	http.read(getString)
		.then(function(userID) {
			return http.read(DBPort + '/' + userID);
		}).then(function(data){
			console.log(JSON.parse(data));
		})
		.done();

} getSomeWorkDone(); //Do some work Exercise 13 of 13







