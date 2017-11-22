const expect = require('expect.js');
const {
  one,
  Graph,
  Square,
  B,
  Lion,
} = require('../prototypeMyProtoClass/app');

describe.only('For all those class lover', () => {
  it('test one', () => {
    expect(one.m()).to.be(3);
  });
  it('create over one', () => {
    const p = Object.create(one);
    p.a = 4;
    expect(p.m()).to.be(5);
    expect(p.hasOwnProperty).to.not.be(undefined);
    expect(Object.prototype.hasOwnProperty.call(p, 'a')).to.be(true); // Super readable right?
    expect({}.propertyIsEnumerable.call(p, 'a')).to.be(true); // Super readable right?
  });
  it('test prototype adding', () => {
    const g = new Graph();
    g.addVertex(4);
    expect(g.vertices).to.not.be(undefined);
    expect(g.vertices).to.eql([4]);
    expect(g.edges).to.not.be(undefined);
    expect(Object.getPrototypeOf(g).hasOwnProperty).to.not.be(undefined);
    expect(Object.getPrototypeOf(g).hasOwnProperty('addVertex')).to.be(true);
  });

  it('Es5 class stuff', () => {
    const square = new Square(5);
    expect(square.area).to.be(25);
    expect(Square.notRelatedToAnything('Bob')).to.be('Bob');
    expect(square.notRelatedToAnything).to.be(undefined); // Why? And Why not create a unique isolated function instead?
    square.sideLength = 2;
    expect(square.area).to.be(4);
  });

  it('inherit B from A', () => {
    const b = new B();
    b.doSomething(55);
    expect(b.varA).to.be(55);
  });

  it('Extend proprety of string', () => {
    // Interview question, Make a string Split proprety because it make sense to change global value no??????
    // Even eslint SCREAM of despair, but according to them it was normal Best practice.
    String.prototype.splitMe = function() { return this.split(' '); }
    expect('BOB is my Hero'.splitMe()).to.eql(['BOB', 'is', 'my', 'Hero']);
  });

  it('test the extend and build over too much abstraction', () => {
    const l = new Lion('Fuzzy');
    expect(l.speak()).to.be('Fuzzy is speaking, but now Roaring');
  });
});
