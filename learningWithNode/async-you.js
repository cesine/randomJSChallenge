// This is from: https://github.com/bulkan/async-you
// Design to try/play with the Async Library

let http = require('http'),
  async = require('async'),
  fs = require('fs');

function gettingSomeWaterfall() {
  // var fetchServer = "http://localhost:3131";
  const fileTORead = process.argv[2];
  const body = '';

  async.waterfall([
	  function (callToPassArgToNextFnct) {
	    fs.readFile(fileTORead, (err, data) => {
	      if (err) {
	      	return done(err, null);
	      }
	      callToPassArgToNextFnct(null, data);
	    });
	  },

	  function (data2, callToPassArgToNextFnct) {
	    let body = '';
	    http.get(data2.toString().trimRight(), (res) => {
	      res.on('data', (chunk) => {
	        body += chunk.toString();
	      });

	      res.on('end', (chunk) => {
	        callToPassArgToNextFnct(null, body);
	      });
	    }).on('error', (e) => {
	      callToPassArgToNextFnct(e);
	    });
	  },
  ], (err, result) => {
	  console.log(result);
  });
} // gettingSomeWaterfall(); // WATERFALL Exercise 1 of 7


function makeSomeSeriesHappen() {
  async.series({
    requestOne(arvgToPassToNext) {
      fetchSomeUrl(process.argv[2], arvgToPassToNext);
    },
    requestTwo(arvgToPassToNext) {
      fetchSomeUrl(process.argv[3], arvgToPassToNext);
    },
  }, (err, result) => {
    if (err) { return console.error('ERROR: ', err); }
  });

  function fetchSomeUrl(url, arvgToPassToNext) {
    let body = '';
    http.get(url, (res) => {
      res.on('data', (chunk) => {
        body += chunk.toString();
      });
      res.on('end', (chunk) => {
        arvgToPassToNext(null, body);
      });
    }).on('error', (err) => {
      arvgToPassToNext(err);
    });
  }
} // makeSomeSeriesHappen(); // SERIES OBJECT Exercise 2 of 7


function gettingSomeOfEach() {
  const arrayToCheck = [process.argv[2], process.argv[3]];

  async.each(arrayToCheck, (url, resolve) => {
    let body = '';
    http.get(url, (res) => {
      res.on('data', (chunk) => {
        body += chunk.toString();
      });
      res.on('end', () => {
        resolve(null, body);
      });
    }).on('error', (err) => {
      resolve(err);
    });
  }, (err) => {
    if (err) { return console.log(err); }
  });
} // gettingSomeOfEach(); //EACH Exercise 3 of 7

function mapMeSomething() {
  const arrayToCheck = [process.argv[2], process.argv[3]];

  async.map(arrayToCheck, (url, resolve) => {
    let body = '';
    http.get(url, (res) => {
      res.on('data', (chunk) => {
        body += chunk.toString();
      });
      res.on('end', () => {
        resolve(null, body);
      });
    }).on('error', (err) => {
      resolve(err);
    });
  }, (err, result) => {
    if (err) { return console.error(err); }
    console.log(result);
  });
} // mapMeSomething(); // MAP Exercise 4 of 7

function timeMeSomething() {
  const url = process.argv[2];
  const port = process.argv[3];
  const optsPush = {
    hostname: url,
    path: '/users/create',
    method: 'POST',
    port,
  };

  const optsGet = {
    hostname: url,
    path: '/users/',
    method: 'GET',
    port,
  };

  // console.log(opts);

  async.times(5, (nbr, callNext) => {
    nbr++;
    let body = '',
      item = '';
    const req = http.request(optsPush, (res) => {
      res.on('data', (chunk) => { body += chunk; });
      res.on('end', err => body);
    });
    req.write(JSON.stringify({ user_id: nbr }));
    req.on('error', (err) => {
      console.log('error inside the POST!!!');
    });
    req.end(() => { callNext(null, nbr); });
  }, (err, users) => {
    let body = '',
      item = '';
    const req = http.request(optsGet, (res) => {
      res.on('data', (chunk) => { body += chunk; });
      res.on('end', (err) => {
        console.log(body);
      });
    });
    req.write('GET');
    req.on('error', (err) => {
      console.log('Error inside the GET!!!', err);
    });
    req.end(() => {});
  });
} // timeMeSomething(); // TIMES Exercise 5 of 7

function reduceSomethingIfYouAreNice() {
// reduce(coll, memo, iteratee, [callback])

  const url = process.argv[2];
  // console.log(url);
  const arrayToFetch = ['one', 'two', 'three'];
  async.reduce(arrayToFetch, 0, (lastState, item, sendNext) => {
    let body = '';
    http.get(`${url}?number=${item}`, (res) => {
      res.on('data', (chunk) => { body += chunk; });
      res.on('end', (chunk) => {
        sendNext(null, lastState + parseFloat(body));
      });
      res.on('error', console.log);
    }).on('error', console.log);
  }, (err, result) => {
    if (err) { console.log(err); }
    console.log(result);
  });
} reduceSomethingIfYouAreNice(); // REDUCE Exercise 6 of 7

function lastOneIsNotAWish() {
  const url = process.argv[2];
  const target = 'meerkat';
  let currentStr = '';
  let iter = 1;


  const testFnct = function () {
    if (currentStr.indexOf(target) > -1) {
      return false;
    }
    return true;
  };

  const operationFnct = function (callback) {
    let body = '';
    http.get(url, (res) => {
      res.on('data', (chunk) => { body += chunk.toString(); });
      res.on('end', () => {
        iter++;
        currentStr = body;
        callback(null, body);
      });
      res.on('error', console.log);
    }).on('error', (err) => {
      callback(err);
    });
  };

  const logsIter = function (err, someData) {
    if (err) { console.error('TOTALErr: ', err); }
    console.log(iter);
  };

  async.whilst(testFnct, operationFnct, logsIter);
} // lastOneIsNotAWish();  //WHILST Exercise 7 of 7 --> Their soltion dosent work eather but whathever, the principle is there.
