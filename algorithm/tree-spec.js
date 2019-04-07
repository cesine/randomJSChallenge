// eslint-disable-next-line import/no-extraneous-dependencies
const expect = require('expect.js');

const {BLACK, Node, RED, RedBlackNode} = require('./tree');

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

  describe('RedBlackNode', () => {
    it('should construct', () => {
      const tree = new RedBlackNode('a');
      expect(tree).to.eql({
        left: null,
        value: 'a',
        right: null,
        parent: null,
      });
    });

    describe('add', () => {
      it('should flip color', () => {
        const tree = new RedBlackNode(4);
        tree.add(3);
        tree.add(7);

        expect(tree).to.eql({
          left: {
            left: null,
            value: 3,
            color: RED,
            right: null,
            parent: tree,
          },
          value: 4,
          color: BLACK,
          right: {
            left: null,
            value: 7,
            color: RED,
            right: null,
            parent: tree,
          },
          parent: null,
        });

        tree.add(10);

        expect(tree).to.eql({
          left: {
            left: null,
            value: 3,
            color: BLACK,
            right: null,
            parent: tree,
          },
          value: 4,
          color: BLACK,
          right: {
            left: null,
            value: 7,
            color: BLACK,
            right: {
              left: null,
              value: 10,
              color: RED,
              right: null,
              parent: tree.right,
            },
            parent: tree,
          },
          parent: null,
        });
      });

      it('should flip color up the tree', () => {
        const tree = new RedBlackNode(10);
        tree.add(6);
        tree.add(13);
        tree.add(4);
        tree.add(8);
        tree.add(12);
        tree.add(16);
        tree.add(15);
        tree.add(17);

        expect(tree.value).to.eql(10);
        expect(tree.left.value).to.eql(6);
        expect(tree.left.left.value).to.eql(4);
        expect(tree.left.right.value).to.eql(8);

        expect(tree.left.color).to.eql(BLACK);
        expect(tree.left.left.color).to.eql(RED);
        expect(tree.left.right.color).to.eql(RED);

        expect(tree.right.value).to.eql(13);
        expect(tree.right.left.value).to.eql(12);
        expect(tree.right.right.value).to.eql(16);

        expect(tree.right.color).to.eql(RED);
        expect(tree.right.left.color).to.eql(BLACK);
        expect(tree.right.right.color).to.eql(BLACK);

        expect(tree.right.right.value).to.eql(16);
        expect(tree.right.right.left.value).to.eql(15);
        expect(tree.right.right.right.value).to.eql(17);

        expect(tree.right.right.color).to.eql(BLACK);
        expect(tree.right.right.left.color).to.eql(RED);
        expect(tree.right.right.right.color).to.eql(RED);

        tree.add(3);
        expect(tree.left.color).to.eql(RED);
        expect(tree.left.left.color).to.eql(BLACK);
        expect(tree.left.right.color).to.eql(BLACK);

        // Cause a chained color flip
        tree.add(18);

        expect(tree.color).to.eql(BLACK);

        expect(tree.left.value).to.eql(6);
        expect(tree.left.color).to.eql(RED);
        expect(tree.left.left.color).to.eql(BLACK);
        expect(tree.left.right.color).to.eql(BLACK);

        expect(tree.right.right.value).to.eql(16);
        expect(tree.right.right.color).to.eql(RED);
        expect(tree.right.right.left.color).to.eql(BLACK);
        expect(tree.right.right.right.color).to.eql(BLACK);
      });


      it('should rotate left', () => {
        const tree = new RedBlackNode(10);
        tree.add(6);
        tree.add(13);
        tree.add(4);
        tree.add(8);
        tree.add(12);
        tree.add(16);
        tree.add(15);
        tree.add(17);

        expect(tree.right.right.value).to.eql(16);
        expect(tree.right.right.color).to.eql(BLACK);
        expect(tree.right.right.left.color).to.eql(RED);
        expect(tree.right.right.right.color).to.eql(RED);

        // Cause a rotation
        const eighteen = tree.add(18);

        expect(eighteen.parent.color).to.eql(BLACK);
        expect(eighteen.parent.parent.color).to.eql(RED);
        expect(eighteen.parent.parent.parent.value).to.eql(13);
        expect(eighteen.parent.parent.parent.color).to.eql(BLACK);

        console.log(eighteen.parent.parent.parent.parent);
        const newRoot = tree.parent;
        // expect(newRoot.color).to.eql(BLACK);
        // expect(newRoot.value).to.eql(13);
      });
    });

    describe('rotateLeft', () => {
      it('should rotate left', () => {
        const tree = new RedBlackNode('a');
        tree.add('c');
        const b = tree.add('b')

        expect(tree.value).to.eql('a');
        expect(tree.right.value).to.eql('c');
        expect(tree.right.left.value).to.eql('b');

        b.rotateLeft();
        expect(b.parent).to.eql(null);
        expect(b.left.value).to.eql('a');
        expect(b.left.parent).to.eql(b);

        expect(b.right.value).to.eql('c');
        expect(b.right.parent).to.eql(b);

        expect(tree.parent.value).to.eql('b');
      });
    });

    describe('rotateRight', () => {
      it('should rotate left', () => {
        const tree = new RedBlackNode('a');
        tree.add('b');
        const c = tree.add('c');

        expect(tree.value).to.eql('a');
        expect(tree.right.value).to.eql('b');
        expect(tree.right.right.value).to.eql('c');

        c.rotateRight();
        console.log('tree', tree);
        const updatedRoot = tree.parent;
        expect(updatedRoot.value).to.eql('b');
        expect(updatedRoot.left.value).to.eql('a');
        expect(updatedRoot.right.value).to.eql('c');
      });
    });
  });
});
