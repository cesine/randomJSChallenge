// This will be a Node app that will help me learn PG-Promise
// https://github.com/vitaly-t/pg-promise/wiki/Learn-by-Example
// https://github.com/vitaly-t/pg-promise

const pgp = require('pg-promise')();

const connectionConfig = {
  host: 'localhost',
  port: 5432,
  user: 'postgres',
  database: 'pg_promise_test',
};

const db = pgp(connectionConfig);
const exportable = {};

exportable.SimpleSelect = function () {
  return db.any('select * from users where active=$1', [true])
    .then(data =>
    // console.log(data);
      data)
    .catch(error =>
    // console.error(error);
      error);
};

exportable.simpleInsert = function () {
  return db.one('insert into users(name, active) values($1, $2) returning id', ['John', true])
    .then(data =>
      // console.log(data.id); // print new user id;
      data)
    .catch(error =>
      // console.log("ERROR:", error.message || error); // print error;
      error);
};

exportable.functionCall = function () {
  return db.func('finduser', [1])
    .then(data =>
      // console.log("DATA:", data); // print data;
      data)
    .catch((error) => {
      console.log('ERROR:', error.message || error); // print the error;
      return error;
    });
};

exportable.singleParam = function (nbr) {
  return db.one('select * from users where id=$1', nbr)
    .then(user => user)
    .catch(error => error);
};

exportable.multiParam = function (id) {
  return db.any('select * from users where id < $1 and active = $2', [id, true])
    .then(data =>
      // console.log("DATA:", data); // print data;
      data)
    .catch(error =>
      // console.log("ERROR:", error.message || error); // print the error;
      error);
};

exportable.namedParam = function () {
  return db.any(
    'select * from users where name = ${name} and active = $/active/ and id < $(maxid)',
    {
      name: 'John',
      active: true,
      maxid: 10,
    },
  )
    .then(data =>
      // console.log("DATA:", data); // print data;
      data)
    .catch(error =>
      // console.log("ERROR:", error.message || error); // print the error;
      error);
};

exportable.paramFnct = function () {
  const account = {
    balance: 123.45,
    expenses: 2.7,
    margin: 0.1,
    total() {
      const t = this.balance + this.expenses;
      return this.margin ? (t + t * this.margin / 10) : t;
    },
  };

  return db.none('insert into activity values(${balance}, ${total})', account)
    .then(() => {
      // success;
    })
    .catch((error) => {
      // error;
    });
};

exportable.task = function () {
  return db.task(t =>
    // this = t = task protocol context;
    // this.ctx = task config + state context;
    t.one('select * from users where id=$1', 3)
      .then(user =>
        // console.log("USER:",user);
        t.any('select * from events where login=$1', user.name)))
    .then(events =>
      // success;
      events)
    .catch(error =>
      // console.log("ERROR:", error.message || error);
      error);
};

exportable.massive = function () {
  function source(index) {
    // create and return a promise object dynamically,
    // based on the index passed;
    if (index < 100) {
      return this.any('insert into test(name) values($1)', `name-${index}`);
    }
    // returning or resolving with undefined ends the sequence;
    // throwing an error will result in a reject;
  }

  return db.tx(function (t) {
    // t = this;
    return this.sequence(source);
  })
    .then(data =>
      // console.log("DATA Back:", data);
      data,
      // success;
    )
    .catch(error =>
      // console.log("ERROR:", error.message || error);
      error);
};

const QueryStream = require('pg-query-stream');
const JSONStream = require('JSONStream');

exportable.streamMe = function () {
  // you can also use pgp.as.format(query, values, options)
  // to format queries properly, via pg-promise;
  const qs = new QueryStream('select * from users');
  return db.stream(qs, (s) => {
    // initiate streaming into the console:
    s.pipe(JSONStream.stringify()).pipe(process.stdout);
  })
    .then((data) => {
      console.log(
        'Total rows processed:', data.processed,
        'Duration in milliseconds:', data.duration,
      );
      return data.processed;
    })
    .catch((error) => {
      console.log('ERROR:', error.message || error);
      return error;
    });
};

exportable.someJson = function () {
  const user = {
    name: 'John',
    login: 'jojoJohn',
    active: true,
  };
  // 'info' column is of type json;
  return db.none('insert into users(info) values($1)', [user])
    .then(() => 'success')
    .catch((error) => {
      console.log('ERROR:', error.message || error);
      return error;
    });
};


exports.app = exportable;
