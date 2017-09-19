// planetproto Tutorial from https://github.com/sporto/planetproto

function Q6() {
  // -> Let's create an object called 'machine'
  const machine = {};

  // -> Use Object.create to create another object called 'robot' with 'machine'
  //    set as the prototype
  const robot = Object.create(machine);

  // -> Use Object.create to create another object called 'robby' with 'robot'
  //    as the prototype
  const robby = Object.create(robot);

  // -> What is the result of `machine.isPrototypeOf(robby)`?
  claim(machine.isPrototypeOf(robby), true);

  // -> What is the result of `robot.isPrototypeOf(robby)`?
  claim(robot.isPrototypeOf(robby), true);

  // -> Which object is the direct prototype of robby?
  claim.same(Object.getPrototypeOf(robby), robot);


  // ------------------------------------------------
  // Common JS exports for verification, don't modify
  module.exports = {
    machine,
    robot,
    robby,
  };
}

function Q7() {
  // -> Define an object called 'Robot'
  // -> Define a method called 'new' in Robot
  // -> When Robot.new is called it should return a new object with Robot as its prototype
  //    e.g. var robby = Robot.new();
  //    Robot should be the prototype of robby

  const Robot = {
    new() {
      return Object.create(this);
    },
  };

  robby = Robot.new();

  // ------------------------------------------------
  // Common JS exports for verification, don't modify
  module.exports = {
    Robot,
  };
}

function Q8() {
  // -> Define a 'Robot' constructor function
  // -> Inside the Robot constructor assign a property 'motors' on 'this',
  //    set motors to 2
  // -> Create an instance of Robot called 'robby'

  function Robot() {
    this.motors = 2;
  }
  robby = new Robot();

  // -> What is the result of `(robby instanceof Robot)`?
  claim((robby instanceof Robot), true);

  // -> What is `robby.motors`?
  claim(robby.motors, 2);


  // ------------------------------------------------
  // Common JS exports for verification, don't modify
  module.exports = {
    Robot,
    robby,
  };
}

function Q9() {
  // -> Define two constructor functions: 'Robot' and 'Vehicle'
  // -> When called with 'new', the Robot constructor function should return
  //    the implicit 'this'
  // -> When called with 'new', the Vehicle constructor function should return
  //    an object of your own making, not the implicit 'this'.

  function Robot() {
  }

  function Vehicle() {
    return {
      banana: 'miam',
    };
  }

  // ------------------------------------------------
  // Common JS exports for verification, don't modify
  module.exports = {
    Robot,
    Vehicle,
  };
}
// Q10:
function Q10() {
  // -> Define a 'Robot' function constructor
  // -> Create two instances of Robot: 'robby' and 'cranky'
  // -> Both robby and cranky should respond to 'parts' and 'capabilities', these
  //    should be empty arrays at first

  function Robot() {
    this.parts = [];
    return this;
  }
  Robot.prototype.capabilities = [];

  const robby = new Robot();
  const cranky = new Robot();

  // -> Claim the result of robby.parts
  claim(robby.parts, []);
  // -> Claim the result of cranky.parts
  claim(cranky.parts, []);
  // -> Claim the result of robby.capabilities
  claim(robby.capabilities, []);
  // -> Claim the result of cranky.capabilities
  claim(cranky.capabilities, []);

  // -> Add 'core' to robby.parts, cranky.parts should still be empty
  // -> Add 'fly' to robby.capabilities, after doing that cranky.capabilities must
  //    also have 'fly' without adding to it directly, so this property has to be
  //    shared
  robby.parts.push('core');
  robby.capabilities.push('fly');
  // console.log(robby);
  // console.log(cranky);

  // -> Claim the result of robby.parts
  claim(robby.parts, ['core']);
  // -> Claim the result of cranky.parts
  claim(cranky.parts, []);
  // -> Claim the result of robby.capabilities
  claim(robby.capabilities, ['fly']);
  // -> Claim the result of cranky.capabilities
  claim(cranky.capabilities, ['fly']);


  // ------------------------------------------------
  // Common JS exports for verification, don't modify
  module.exports = {
    Robot,
    robby,
    cranky,
  };
}
