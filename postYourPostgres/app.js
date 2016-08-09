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
        // console.log(data.id); // print new user id;
        return data;
    })
    .catch(function (error) {
        // console.log("ERROR:", error.message || error); // print error;
        return error;
    });
};

exportable.functionCall = function() {
  return db.func('finduser', [1])
    .then(function (data) {
        // console.log("DATA:", data); // print data;
        return data;
    })
    .catch(function (error) {
        console.log("ERROR:", error.message || error); // print the error;
        return error;
    });
};

exportable.singleParam = function(nbr) {
  return db.one("select * from users where id=$1", nbr)
    .then(function (user) {
        return user;
    })
    .catch(function (error) {
        return error;
    });
}

exportable.multiParam = function(id) {
  return db.any("select * from users where id < $1 and active = $2", [id, true])
    .then(function (data) {
        // console.log("DATA:", data); // print data;
        return data;
    })
    .catch(function (error) {
        // console.log("ERROR:", error.message || error); // print the error;
        return error;
    });
}

exportable.namedParam = function() {
  return db.any("select * from users where name = ${name} and active = $/active/ and id < $(maxid)",
    {
        name: 'John',
        active: true,
        maxid: 10
    })
    .then(function (data) {
        // console.log("DATA:", data); // print data;
        return data;
    })
    .catch(function (error) {
        // console.log("ERROR:", error.message || error); // print the error;
        return error;
    });
}

exportable.paramFnct = function() {
  var account = {
    balance: 123.45,
    expenses: 2.7,
    margin: 0.1,
    total: function () {
        var t = this.balance + this.expenses;
        return this.margin ? (t + t * this.margin / 10) : t;
    }
  };

  return db.none("insert into activity values(${balance}, ${total})", account)
    .then(function () {
        // success;
    })
    .catch(function (error) {
        // error;
    });
}

exportable.task = function () {
  return db.task(function (t) {
        // this = t = task protocol context;
        // this.ctx = task config + state context;
        return t.one("select * from users where id=$1", 3)
            .then(function (user) {
              // console.log("USER:",user);
                return t.any("select * from events where login=$1", user.name);
            });
    })
    .then(function (events) {
        // success;
        return events;
    })
    .catch(function (error) {
        // console.log("ERROR:", error.message || error);
        return error;
    });
}

exportable.massive = function() {
  function source(index) {
    // create and return a promise object dynamically,
    // based on the index passed;
    if (index < 100) {
        return this.any('insert into test(name) values($1)', 'name-' + index);
    }
    // returning or resolving with undefined ends the sequence;
    // throwing an error will result in a reject;
  }

  return db.tx(function (t) {
      // t = this;
      return this.sequence(source);
    })
    .then(function (data) {
      // console.log("DATA Back:", data);
      return data;
        // success;
    })
    .catch(function (error) {
        // console.log("ERROR:", error.message || error);
        return error;
    });
}

var QueryStream = require('pg-query-stream');
var JSONStream = require('JSONStream');
exportable.streamMe = function() {
  // you can also use pgp.as.format(query, values, options)
  // to format queries properly, via pg-promise;
  var qs = new QueryStream('select * from users');
    return db.stream(qs, function (s) {
        // initiate streaming into the console:
        s.pipe(JSONStream.stringify()).pipe(process.stdout);
      })
      .then(function (data) {
          console.log("Total rows processed:", data.processed,
              "Duration in milliseconds:", data.duration);
              return data.processed;
      })
      .catch(function (error) {
          console.log("ERROR:", error.message || error);
          return error;
      });
}

exportable.someJson = function() {
  var user = {
    name: 'John',
    login: 'jojoJohn',
    active: true
  };
  // 'info' column is of type json;
  return db.none("insert into users(info) values($1)", [user])
    .then(function () {
        return "success";
    })
    .catch(function (error) {
        console.log("ERROR:", error.message || error);
        return error;
    });

}


exports.app = exportable;
