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
const exp = require('./app');

describe('Testing the basic', () => {
  it('Should do a simple Select', (done) => {
    expect(exp).toBeDefined();
    expect(exp.app).toBeDefined();
    expect(exp.app.SimpleSelect).toBeDefined();
    exp.app.SimpleSelect().then((res) => {
      expect(res.length).toBeGreaterThan(2);
      done();
    });
  });

  it('should do a simple insert', (done) => {
    exp.app.simpleInsert().then((res) => {
      // console.log(res);
      expect(res.id).toBeDefined();
      done();
    });
  });

  it('should call a function', (done) => {
    exp.app.functionCall().then((res) => {
      // console.log(res);
      expect(res[0].id).to.eql(1);
      done();
    });
  });

  it('Check the prepared Statement', (done) => {
    exp.app.singleParam(3).then((res) => {
      expect(res.id).to.eql(3);
      done();
    });
  });

  it('Check multiple param', (done) => {
    exp.app.multiParam(4).then((res) => {
      expect(res.length).to.eql(2);
      done();
    });
  });

  it('checked Names param querry', (done) => {
    exp.app.namedParam().then((res) => {
      expect(res.length).toBeGreaterThan(1);
      done();
    });
  });
});

describe('Task Section', () => {
  xit('should chain querry', (done) => {
    // it dosent work, no idea what "t" refer to. :/
    exp.app.task().then((res) => {
      expect(res).toMatch('something');
      done();
    });
  });

  it('run a massive item', (done) => {
    exp.app.massive().then((res) => {
      expect(res.total).toMatch(100);
      done();
    });
  });
});

describe('Some Stre..a..m...ing', () => {
  it('should stream a bit', (done) => {
    exp.app.streamMe().then((res) => {
      expect(res).toBeGreaterThan(30);
      done();
    });
  });
});

describe('Using JSON instead of Param String', () => {
  it('should send Into the the DB', (done) => {
    exp.app.someJson().then((res) => {
      expect(res).toMatch('success');
      done();
    });
  });
});
