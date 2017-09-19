// npm install -g promise-it-wont-hurt@latest
// https://github.com/stevekane/promise-it-wont-hurt
// ES6 promesses tutorial
// 'use strict';

// var qio = require('q-io');
const qhttp = require('q-io/http');
// var http = require('http');


function warmup() {
  setTimeout(() => {
    console.log('TIMED OUT!');
  }, 300);
} // warmup();  Exercise 1 of 13

function fulfillPromise() {
  const fulfillAfterTimeout = new Promise(((fulfill, reject) => {
    setTimeout(() => {
      fulfill('FULFILLED!');
    }, 300);
  }));

  fulfillAfterTimeout.then((dataReceived) => {
    console.log(dataReceived);
  });
} // fulfillPromise(); // Fulfill a promise Exercise 2 of 13


function rejectingIt() {
  const rejectMyPromesses = new Promise(((fulfill, reject) => {
    setTimeout(() => {
      reject(new Error('REJECTED!'));
    }, 300);
  }));

  function onReject(error) {
    console.log(error.message);
  }

  rejectMyPromesses.then((data) => {
    console.log(data);
  }, (error) => {
    onReject(error);
  });
} // rejectingIt(); //Reject a promise Exercise 3 of 13


function fireOrNoFire() {
  const multipleCall = new Promise(((fulfill, reject) => {
    fulfill('I FIRED');
    reject(new Error('I DID NOT FIRE'));
  }));

  function onError(err) {
    console.log(err.message);
  }

  multipleCall.then((data) => {
    console.log(data);
  }, (err) => {
    onError(err);
  });
} // fireOrNoFire(); //To reject or not to reject Exercise 4 of 13

function asynchMeThis() {
  callMeManyTime = new Promise(((fulfill, reject) => {
    fulfill('PROMISE VALUE');
  }));

  callMeManyTime.then(console.log);
  console.log('MAIN PROGRAM');
} // asynchMeThis(); //Always asynchronous Exercise 5 of 13

function someShortcut() {
  const canIhaveAbanana = Promise.resolve('Only if it is Yellow');
  const willThePizzaGetHereSoon = Promise.reject(new Error('Keep dreaming'));

  willThePizzaGetHereSoon.then((data) => {
    console.log(data);
  }).catch((err) => {
    console.log(err.message);
  });

  canIhaveAbanana.then((data) => {
    console.log(data);
  }).catch((err) => {
    console.log(err.message);
  });
} // someShortcut(); // Shortcuts Exercise 6 of 13


function misteryChainPromises() {
  // var firstPromise = first();
  first().then(val => second(val)).then(console.log);
} // misteryChainPromises(); //Promise after promise Exercise 7 of 13


function promessAndValue() {
  fetchName = new Promise(((fulfill, reject) => {
    fulfill('MANHATTAN');
  }));

  function attachTitle(name) {
    return `DR. ${name}`;
  }

  fetchName.then(attachTitle).then(console.log);
} // promessAndValue();// Values and promises Exercise 8 of 13


function someErrorInTheBasket() {
  const invalidJson = process.argv[2];
  function parsePromised(someJson) {
    return new Promise(((fulfill, reject) => {
      try	{
        fulfill(JSON.parse(process.argv[2]));
      } catch (e) {
        reject(e);
      }
    }));
  }

  parsePromised(invalidJson).then((data) => {
    console.log(data);
  }, (err) => {
    console.log(err);
  });
} // someErrorInTheBasket() // Throw an error Exercise 9 of 13

function thereIsAlwaysACatch() {
  function alwaysThrows() {
    throw new Error('OH NOES');
  }

  function iterate(someNbr) {
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
} // thereIsAlwaysACatch();
// An important rule Exercise 10 of 13

function multiPromInSequence() {
  function all(prom1, prom2) {
    let counter = 0;
    // return only when both are completed
    return new Promise(((fulfill, reject) => {
      const allValue = [];

      function incremAndSend() {
        counter++;
        // console.log(counter);
        if (counter == 2) {
          fulfill(allValue);
        }
      }

      prom1.then((data1) => {
        allValue[0] = data1;
        // console.log(data1);
        incremAndSend();
      });

      prom2.then((data2) => {
        // console.log("Data2");
        allValue[1] = data2;
        incremAndSend();
      });
    }));
  }

  all(getPromise1(), getPromise2()).then((data) => {
    console.log(data);
  });
} // multiPromInSequence(); // Multiple promises Exercise 11 of 13


function makeItReal() {
  const urlToFetch = 'http://localhost:1337';

  http.read(urlToFetch).then((data) => {
    console.log(JSON.parse(data));
  }).then(null, console.error)
    .done();
} // makeItReal(); //Fetch JSON Exercise 12 of 13


function getSomeWorkDone() {
  const urlToFetch = 'http://localhost:';
  const getString = urlToFetch + 7000;
  const DBPort = urlToFetch + 7001;

  http.read(getString)
    .then(userID => http.read(`${DBPort}/${userID}`)).then((data) => {
      console.log(JSON.parse(data));
    })
    .done();
} getSomeWorkDone(); // Do some work Exercise 13 of 13

