// This will be a Node app that will help me learn PG-Promise
// https://github.com/vitaly-t/pg-promise/wiki/Learn-by-Example
// https://github.com/vitaly-t/pg-promise

var pgp = require('pg-promise')();
var connectionConfig = {
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    database: 'pg_promise_test'
};

var db = pgp(connectionConfig);
var exportable = {};

exportable.SimpleSelect = function() {
  return db.any("select * from users where active=$1", [true])
  .then(function (data) {
    // console.log(data);
    return data;
  })
  .catch(function (error) {
    // console.error(error);
    return error;
  });
}

exportable.simpleInsert = function() {
  return db.one("insert into users(name, active) values($1, $2) returning id", ['John', true])
    .then(function (data) {
        console.log(data.id); // print new user id;
        return data;
    })
    .catch(function (error) {
        console.log("ERROR:", error.message || error); // print error;
        return error;
    });
}


exports.app = exportable;
