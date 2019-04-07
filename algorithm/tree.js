const BLACK = 'black';
const RED = 'red';

/**
 * Tree class
 */
class Node {
  constructor(value) {
    this.left = null;
    this.value = value;
    this.right = null;
    return this;
  }

  add(value) {
    if (value < this.value) {
      if (!this.left) {
        this.left = new this.constructor(value);
        return this.left;
      }
      return this.left.add(value);
    }

    if (!this.right) {
      this.right = new this.constructor(value);
      return this.right;
    }
    return this.right.add(value);
  }

  find(value, finder) {
    if (value === this.value) {
      return this;
    }
    if (!this.left && !this.right) {
      return false;
    }

    if (this.left && !this.right) {
      return this.left.find(value, finder);
    }

    if (this.right && !this.left) {
      return this.right.find(value, finder);
    }

    return this.left.find(value, finder) || this.right.find(value, finder);
  }

  toString() {
    let result = '{';
    if (this.left) {
      result += `${this.left.toString()}, `;
    }
    result += `value: ${this.value}, color: "${this.color}", parent: ${this.parent ? this.parent.value : null}
    `;
    if (this.right) {
      result += `, ${this.right.toString()}`;
    }
    return `${result}}`;
  }

  walk(flattened = [], action = () => {}) {
    if (!this.left && !this.right) {
      flattened.push(this);
      action(this);
      return flattened;
    }

    if (this.left && !this.right) {
      this.left.walk(flattened, action);
      flattened.push(this);
      action(this);
      return flattened;
    }

    if (this.right && !this.left) {
      flattened.push(this);
      action(this);
      return this.right.walk(flattened, action);
    }
    this.left.walk(flattened, action);
    flattened.push(this);
    action(this);
    this.right.walk(flattened, action);
    return flattened;
  }

  walkBreadthFirst(flattened = [], action = () => {}) {
    flattened.push(this);
    action(this);

    if (!this.left && !this.right) {
      return flattened;
    }

    if (this.left && !this.right) {
      this.left.walk(flattened, action);
      return flattened;
    }

    if (this.right && !this.left) {
      return this.right.walk(flattened, action);
    }
    this.left.walk(flattened, action);
    this.right.walk(flattened, action);
    return flattened;
  }
}

class RedBlackNode extends Node {
  constructor(value) {
    super(value);
    this.parent = null;
    this.color = BLACK;
    return this;
  }

  add(value) {
    const result = super.add(value);
    console.log(`${value} add visiting ${this.value}`);
    if (!result.parent) {
      result.parent = this;
    }
    result.color = RED;

    if (!result.parent.parent) {
      console.log(`${result.value} has no grandparent`);
      return result;
    }
    // console.log(`result of ${value} is`, result);
    const aunt = result.parent.parent.left !== result ? result.parent.parent.left : result.parent.parent.right;
    if (!aunt) {
      console.log(`${result.value} has no aunt`, result.parent.color);
      return result;
    }
    // Color flip
    if (result.parent.color === RED && aunt.color === RED) {
      console.log(`${result.value} need a color flip`, result.parent.color, aunt.color);
      result.colorFlip();
    } else {
      console.log(`  not flipping at ${this.value}`);
    }

    if (result.parent.color === RED && aunt.color === BLACK && result.parent.parent.left === aunt) {
      console.log(`${result.value} need a left rotation`, result.parent.color, aunt.color);
      result.rotateLeft();
    } else {
      console.log(`  ${result.value} not rotating left `, result.parent.color, aunt.color);
    }

    if (result.parent.color === RED && aunt.color === BLACK && result.parent.parent.right === aunt) {
      console.log(`${result.value} need a left rotation`, result.parent.color, aunt.color);
      result.rotateRight();
    } else {
      console.log(`  ${result.value} not rotating right `, result.parent.color, aunt.color);
    }
    // console.log(`${result.value} dont need a color flip`, result.parent.color, aunt.color);
    console.log(`${value}  done ${result.value} \n`);
    return result;
  }

  colorFlip() {
    const grandparent = this.parent.parent;
    const aunt = (grandparent.left !== this.parent ? grandparent.left : grandparent.right) || {};

    console.log(`  ${this.value} ColorFlip  ${aunt.value} ${aunt.color} ${grandparent.value} ${grandparent.color} ${this.parent.value} ${this.parent.color}`);
    // Grandparent is RED (if its not root)
    if (grandparent.parent) {
      grandparent.color = RED;
    }
    // Parent is Black
    this.parent.color = BLACK;

    if (aunt && aunt.value) {
      // Aunt is Black
      aunt.color = BLACK;
    }
    console.log(` Flipped     ${aunt.value} ${aunt.color} ${grandparent.value} ${grandparent.color} ${this.parent.value} ${this.parent.color}`);
    return this;
  }

  /**
   * Rotate
   *
   * A
   *  \
   *   C
   *  /
   * B
   */
  rotateLeft() {
    console.log(`${this.value} rotate Left`);
    const a = this.parent.parent;
    const c = this.parent;
    const p = a.left;
    const q = c.right;

    this.parent = null;
    this.left = a;
    a.parent = this;
    this.right = c;
    c.parent = this;

    a.right = p;
    if (p) {
      p.parent = a;
    }
    c.left = q;
    if (q) {
      q.parent = c;
    }

    return this;
  }

  /**
   * Rotate
   *
   * A
   *  \
   *   B
   *    \
   *     C
   */
  rotateRight() {
    console.log(`${this.value} rotate right`);
    const grandparent = this.parent.parent;
    const p = this.parent.left;
    this.parent.left = grandparent;
    grandparent.right = p;
    grandparent.parent = this.parent;
    return this;
  }
}

module.exports = {
  BLACK,
  Node,
  RED,
  RedBlackNode,
};
