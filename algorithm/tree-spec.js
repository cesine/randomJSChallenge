// eslint-disable-next-line import/no-extraneous-dependencies
const expect = require('expect.js');

const { Node } = require('./tree');

describe('Node', () => {
  it('should construct', () => {
    const tree = new Node('a');
    expect(tree).to.eql({
      left: null,
      value: 'a',
      right: null,
    });
  });

  describe('add', () => {
    it('should smaller values', () => {
      const tree = new Node('m');
      tree.add('b');
      expect(tree).to.eql({
        left: {
          left: null,
          value: 'b',
          right: null,
        },
        value: 'm',
        right: null,
      });
    });

    it('should larger values', () => {
      const tree = new Node('m');
      tree.add('w');
      expect(tree).to.eql({
        left: null,
        value: 'm',
        right: {
          left: null,
          value: 'w',
          right: null,
        },
      });
    });

    it('should add to the left', () => {
      const tree = new Node('m');
      tree.add('b');
      tree.add('a');
      expect(tree).to.eql({
        left: {
          left: {
            left: null,
            value: 'a',
            right: null,
          },
          value: 'b',
          right: null,
        },
        value: 'm',
        right: null,
      });
    });

    it('should add to the right', () => {
      const tree = new Node('m');
      tree.add('w');
      tree.add('z');
      expect(tree).to.eql({
        left: null,
        value: 'm',
        right: {
          left: null,
          value: 'w',
          right: {
            left: null,
            value: 'z',
            right: null,
          },
        },
      });
    });

    it('should add to middle', () => {
      const tree = new Node('m');
      tree.add('w');
      tree.add('u');
      expect(tree).to.eql({
        left: null,
        value: 'm',
        right: {
          left: {
            left: null,
            value: 'u',
            right: null,
          },
          value: 'w',
          right: null,
        },
      });
    });
  });

  describe('find', () => {
    it('should return false if empty', () => {
      const tree = new Node('a');
      expect(tree.find('b')).to.be(false);
    });

    it('should find root', () => {
      const tree = new Node('a');
      expect(tree.find('a')).to.be(tree);
    });

    it('should find left', () => {
      const tree = new Node('a');
      tree.left = new Node('b');
      expect(tree.find('b')).to.be(tree.left);
    });

    it('should find right', () => {
      const tree = new Node('a');
      tree.right = new Node('b');
      expect(tree.find('b')).to.be(tree.right);
    });

    it('should find left or right non unique', () => {
      const tree = new Node('a');
      tree.right = new Node('b');
      tree.left = new Node('b');
      expect(tree.find('b')).to.be(tree.left);
    });

    it('should find left or right', () => {
      const tree = new Node('a');
      tree.right = new Node('b');
      tree.left = new Node('c');
      expect(tree.find('b')).to.be(tree.right);
    });
  });

  describe('walk', () => {
    it('should walk empty trees', () => {
      const tree = new Node('a');
      expect(tree.walk().map(node => node.value)).to.eql(['a']);
    });

    it('should walk complex tree', () => {
      const tree = new Node('e');
      tree.add('b');
      tree.add('m');
      tree.add('o');
      tree.add('h');
      tree.add('a');
      expect(tree.walk(undefined, (node) => console.log(node.value)).map(node => node.value)).to.eql(['a', 'b', 'e', 'h', 'm', 'o']);
    });
  });

  describe('walkBreadthFirst', () => {
    it('should walk empty trees', () => {
      const tree = new Node('a');
      expect(tree.walkBreadthFirst().map(node => node.value)).to.eql(['a']);
    });

    it('should walk complex tree', () => {
      const tree = new Node('e');
      tree.add('b');
      tree.add('m');
      tree.add('o');
      tree.add('h');
      tree.add('a');
      expect(tree).to.eql({
        left: {
          left: {
            left: null, value: 'a', right: null,
          },
          value: 'b',
          right: null,
        },
        value: 'e',
        right: {
          left: {
            left: null, value: 'h', right: null,
          },
          value: 'm',
          right: {
            left: null, value: 'o', right: null,
          },
        },
      });
      expect(tree.walkBreadthFirst(undefined, (node) => console.log(node.value)).map(node => node.value)).to.eql(['e', 'a', 'b', 'h', 'm', 'o']);
    });
  });
});
