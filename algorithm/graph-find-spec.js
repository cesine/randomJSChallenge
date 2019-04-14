const expect = require('expect.js');

function findPaths(input) {
  const paths = [];
  if (input.length < 2) {
    return paths;
  }

  console.log('findPaths', input);

  function findPath(index, acc) {
    console.log(`${index} so far`, acc);

    // no more outgoing edges, add the path
    if (input[index].length === 0) {
      console.log(`${index} no outgoing edges\n`);
      paths.push([...acc, index]);
      return;
    }

    // for each edge
    input[index].forEach((dest) => {
      console.log(`${index} outgoing edges ${dest}`);
      if (input[dest]) {
        console.log(`  exploring ${dest}`);
        findPath(dest, [...acc, index]);
      }
    });
  }

  findPath(0, []);
  return paths;
}

describe('graph', () => {
  describe('as array of arrays, find all paths', () => {
    it('should exit early if there is no outgoing edges', () => {
      expect(findPaths([[]])).to.eql([]);
    });

    it('should find one path', () => {
      expect(findPaths([[1], []])).to.eql([[0, 1]]);
    });

    it('should find multiple paths', () => {
      expect(findPaths([[1, 2], [3], [3], []])).to.eql([[0, 1, 3], [0, 2, 3]]);
    });

    it('should handle interconnected graphs', () => {
      expect(findPaths([[1, 2, 3], [2, 3], [3], []])).to.eql([[0, 1, 2, 3], [0, 1, 3], [0, 2, 3], [0, 3]]);
    });
  });
});
