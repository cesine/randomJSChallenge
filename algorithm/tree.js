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
        this.left = new Node(value);
        return this.left;
      }
      return this.left.add(value);
    }

    if (!this.right) {
      this.right = new Node(value);
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

module.exports = {
  Node,
};
