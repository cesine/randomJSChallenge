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
    this.balance(result);
    return result;
  }

  balance(result) {
    if (!result.parent) {
      console.log(`${result.value} has no parent (its the root)`);
      return;
    }
    if (result.parent.color === BLACK) {
      return;
    }

    // console.log(`result of ${value} is`, result);
    const aunt = (result.parent.parent.left !== result ? result.parent.parent.left : result.parent.parent.right) || {};
    // Color flip

    if (result.parent.color === RED && aunt.color === RED) {
      console.log(`${result.value} need a color flip`, result.parent.color, aunt.color);
      result.colorFlip();

      this.balance(result.parent.parent);
      return;
    } else {
      console.log(`  not flipping at ${this.value}`);
    }


    return this.balance(result.parent);
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
    const p = this.parent.left;
    const formerGrandparent = this.parent.parent.parent

    this.parent.left = this.parent.parent;
    this.parent.left.parent = this.parent;
    this.parent.left.right = p;

    this.parent.parent.right = p;
    if (p) {
      p.parent = this.parent.parent;
    }

    this.parent.parent = formerGrandparent;
    if (formerGrandparent) {
      formerGrandparent.right = this.parent;
    }

    return this;
  }
}

module.exports = {
  BLACK,
  Node,
  RED,
  RedBlackNode,
};
