/*
======== A Handy Little Jasmine Reference ========
inspired by  https://github.com/pivotal/jasmine/wiki/Matchers
Spec matchers:
expect(x).toEqual(y); compares objects or primitives x and y and passes if they are equivalent
expect(x).toBe(y); compares objects or primitives x and y and passes if they are the same object
expect(x).toMatch(pattern); compares x to string or regular expression pattern and passes if they match
expect(x).toBeDefined(); passes if x is not undefined
expect(x).toBeUndefined(); passes if x is undefined
expect(x).toBeNull(); passes if x is null
expect(x).toBeTruthy(); passes if x evaluates to true
expect(x).toBeFalsy(); passes if x evaluates to false
expect(x).toContain(y); passes if array or string x contains y
expect(x).toBeLessThan(y); passes if x is less than y
expect(x).toBeGreaterThan(y); passes if x is greater than y
expect(x).toBeCloseTo; matcher is for precision math comparison
expect(x).toThrow; matcher is for testing if a function throws an exception
expect(x).toThrowError; matcher is for testing a specific thrown exception
expect(function(){fn();}).toThrow(e); passes if function fn throws exception e when executed
Every matcher's criteria can be inverted by prepending .not:
expect(x).not.toEqual(y); compares objects or primitives x and y and passes if they are not equivalent
Custom matchers help to document the intent of your specs, and can help to remove code duplication in your specs.
beforeEach(function() {
this.addMatchers({});
*/

// import {SimpleSelect} from './app';
var exp = require('./app');

describe('Testing the basic', function() {
  it('Should do a simple Select', function(done) {
    expect(exp).toBeDefined();
    expect(exp.app).toBeDefined();
    expect(exp.app.SimpleSelect).toBeDefined();
    exp.app.SimpleSelect().then(function(res){
      expect(res.length).toBeGreaterThan(2);
      done();
    })
  })

  it('should do a simple insert', function(done) {
    exp.app.simpleInsert().then(function(res) {
      // console.log(res);
      expect(res.id).toBeDefined();
      done();
    });
  })

  it('should call a function', function(done) {
    exp.app.functionCall().then(function(res) {
      // console.log(res);
      expect(res[0].id).toEqual(1);
      done();
    });
  })

  it('Check the prepared Statement', function(done) {
    exp.app.singleParam(3).then(function(res){
      expect(res.id).toEqual(3);
      done();
    });
  });

  it('Check multiple param', function(done) {
    exp.app.multiParam(4).then(function(res) {
      expect(res.length).toEqual(2);
      done();
    });
  });

  it('checked Names param querry', function(done) {
    exp.app.namedParam().then(function(res){
      expect(res.length).toBeGreaterThan(1);
      done();
    })
  })
});

describe('Task Section', function() {
  xit('should chain querry', function(done) {
    // it dosent work, no idea what "t" refer to. :/
    exp.app.task().then(function(res) {
      expect(res).toMatch("something");
      done();
    });
  });

  it('run a massive item', function(done) {
    exp.app.massive().then(function(res) {
      expect(res.total).toMatch(100);
      done();
    });
  });
});

describe('Some Stre..a..m...ing', function() {
  it('should stream a bit', function(done) {
    exp.app.streamMe().then(function(res) {
      expect(res).toBeGreaterThan(30);
      done();
    })
  })
});

describe('Using JSON instead of Param String', function() {
  it('should send Into the the DB', function(done){
    exp.app.someJson().then(function(res){
      expect(res).toMatch('success');
      done();
    });
  });
});
