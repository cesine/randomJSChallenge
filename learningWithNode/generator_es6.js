// Tutorial From: https://github.com/isRuslan/learn-generators


function q1() {
  function* range(from, to) {
    while (from <= to) {
      const stop = yield from++;
    }
  }

  for (const r of range(5, 10)) {
    console.log(r);
  }
  // should print: 5, 6, 7, 8, 9, 10
}

function q1v2() {
  function* range(from, to) {
    for (let i = from; i <= to; i++) {
      yield i;
    }
  }

  for (const r of range(5, 10)) {
    console.log(r);
  }
}
// RUN STOP RUN Exercise 1 of 6
// q1();
// q1v2();


function q2() {
  function* factorial(n) {
    lastsum = 1;
    for (let i = 1; i <= n; i++) {
      lastsum = i * lastsum;
      yield lastsum;
    }
  }

  const lastValue = 0;
  // Meaning FOR each itteration OF the Constructor until it is Done. --> Array or Map????, not object.
  // Itterator constructor ======= >>> [...Spread];
  // So: for (var lastValue of factorial(5)) === var lastValue of [1,2,3,4,5,6]
  // Can be Inifinite or Finite
  // Represent the [Symbol.iterator] proprety of the object(arr,map, not object)
  for (const iterr of factorial(5)) {
    console.log(iterr);
  }
  // 1, 2, 6, 24, 120
} // GENERATOR ITERATOR Exercise 2 of 6
function q2v2() {
  function* factorial(n) {
    let last = 1;
    let i = 1;
    while (true) {
      last *= i;
      yield last;
      i++;
    }
  }
  const arrOfFactorial = factorial(5);
  for (let i = 1; i <= 5; i++) {
    // console.log(arrOfFactorial[i]);
    console.log(arrOfFactorial.next().value);
  }
}
// q2();
// q2v2();


function q3() {
  function* flat(arr) {
    // what I want: [1,2,3,4,5,6] from var A = [1, [2, [3, 4], 5], 6];
    for (let item = 0; item < arr.length; item++) {
      if (Array.isArray(arr[item])) {
        yield* flat(arr[item]);
      } else {
        yield arr[item];
      }
    }
  }

  const A = [1, [2, [3, 4], 5], 6];
  for (const f of flat(A)) {
    console.log(f);
  }
  // 1 2 3 4 5 6
} // DELEGATING GENERATORS Exercise 3 of 6
// q3();

function q4() {
  function* upper(items) {
    for (let i = 0; i < items.length; i++) {
      try {
        yield items[i].toUpperCase();
      } catch (e) {
        yield null;
      }
    }
  }

  const bad_items = ['a', 'B', 1, 'c'];

  for (const item of upper(bad_items)) {
    console.log(item);
  }
  // want to log: A, B, null, C
} // q4(); //CATCH ERROR! Exercise 4 of 6


// Making Callback really really hard to follow :/
function asyncExemple() {
  const fs = require('fs');

  function run(generator) {
  	console.log('Initial run function');
    const it = generator(go);

    // This go function is passed as the callback of the fr.readdir('path', go(err,data))
    // So it is like a normal Callback but fucktop.
    function go(err, result) {
    	console.log('It Next');
      it.next(result);
      console.log('It After next');
    }

    console.log('Before Go');
    go();
    console.log('after the Go() call');
  }

  run(function* (done) {
  	console.log('inside the Generator');
    // read `learn-generators` exercises folder
    const exercises = yield fs.readdir('../', done);
    console.log(exercises); // [ 'look_sync_do_async', ..., 'run_stop_run' ]
  });
} // asyncExemple();

function q5() {
  const fs = require('fs');

  function run(generator) {
    const it = generator(runTheNextYield);

    function runTheNextYield(err, result) {
    	if (err) return it.throw(err);
    	// console.log("result: ",err, result);
    	// keep going champion!
    	it.next(result);
    }

    runTheNextYield();
  }

  run(function* (done) {
    var firstFile;
    try {
    	const dirFiles = yield fs.readdir('NoNoNoNo', done); // No such dir
    	var firstFile = dirFiles[0]; // TypeError: Cannot read property '0' of undefined
    } catch (err) {
    	// Since I hit Error somewhere I will never hit the second callback "runTheNextYield"
    	firstFile = null;
    }

    console.log(firstFile);
  });
} // q5(); //LOOK SYNC. DO ASYNC. Exercise 5 of 6


function q6() {
  function askFoo() {
	      return new Promise(((resolve, reject) => {
	        resolve('foo');
	      }));
	    }

  function run(generator) {
  	const it = generator();
  	function go(result) {
  		if (result.done === true) { return result.value; }

  		return result.value.then(
        value =>
  					// Do recursion stop Loop until it is done.
  		       go(it.next(value))
  		    , error =>
  		    	// or stop on error
  		       go(it.throw(error)),
  		    );
  	}

  	go(it.next());
  }

  run(function* () {
    // improve: errors?
    let foo;
    try {
      foo = yield askFoo();
    } catch (e) {
    	foo = null;
    }
    console.log(foo);
  });
} q6(); // LOOK SYNC. MAKE PROMISE. Exercise 6 of 6

// Comment:
// The first few exemple are ok, and can sometime be usefull for large number to go step by step.
// But in my opinion doing Promess or Callback with generator are wayyyyy more mixing than simply a calback or promises.
