// Following the example of https://developer.mozilla.org/en-US/docs/Web/JavaScript/Inheritance_and_the_prototype_chain

// EsOld
const one = {
  a: 2,
  m() { return this.a + 1; },
};

function Graph() {
  this.vertices = [];
  this.edges = [];
}

Graph.prototype = {
  addVertex(v) { this.vertices.push(v); },
};

// Es5  class, constructor, static, extends, and super.
class Polygon {
  constructor(height, width) {
    this.height = height;
    this.width = width;
  }
  static notRelatedToAnything(a) {
    return a;
  }
}

class Square extends Polygon {
  constructor(measure) {
    super(measure, measure);
  }
  get area() {
    return this.height * this.width;
  }
  set sideLength(newLength) {
    this.height = newLength;
    this.width = newLength;
  }
}

// B shall inherit from A: SOOOO not debugging friendly.
function A(a) { this.varA = a; }
A.prototype = {
  varA: null,
  doSomething(arg) {
    this.varA = arg;
  },
};

function B(a, b) {
  A.call(this, a);
  this.varB = b;
}
B.prototype = Object.create(A.prototype, {
  varB: {
    value: null,
    enumerable: true,
    configurable: true,
    writable: true,
  },
  doSomething: {
    value() { // override
      // arguments just come out of nowhere, This is what I am talking about. Why not pass it properly??????
      A.prototype.doSomething.apply(this, arguments); // call super, Super intuitine right????????
    },
    enumerable: true,
    configurable: true,
    writable: true,
  },
});
B.prototype.constructor = B;
// End of B shall inherit from A, wet dream of Class lover. Code should be easy to read and debug, and class extension are not.

class Cat {
  constructor(name) {
    this.name = name;
    this.power = 'stealth';
  }
  speak() {
    return `${this.name} is speaking`;
  }
}

class Lion extends Cat {
  constructor(name) {
    super('Dumest cat ever');
    this.name = name;
  }
  speak() {
    const initially = super.speak();
    return `${initially}, but now Roaring`;
  }
}

module.exports = {
  one,
  Graph,
  Square,
  B,
  Lion,
};
