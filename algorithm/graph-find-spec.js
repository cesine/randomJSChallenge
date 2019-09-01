const expect = require('expect.js');
const debug = () => {};

function findPaths (input) {
  const paths = [];
  if (input.length < 2) {
    return paths;
  }

  function findPath (index, acc) {
    debug(`${index} so far`, acc);

    // no more outgoing edges, add the path
    if (input[index].length === 0) {
      debug(`${index} no outgoing edges\n`);
      paths.push([ ...acc, index ]);
      return;
    }

    // for each edge
    input[index].forEach((dest) => {
      debug(`${index} outgoing edges ${dest}`);
      if (input[dest]) {
        debug(`  exploring ${dest}`);
        findPath(dest, [ ...acc, index ]);
      }
    });
  }

  findPath(0, []);
  return paths;
}
/**
 * Breadth first search from a root node to find the distance of other nodes from that node
 * @param {*} param
 */
function adjacencyMatrixBFS({ graph, root }) {
  var distances = {};

  // N: initialize all lengths to infinity
  for (var i = 0; i < graph.length; i++) {
    distances[i] = Infinity;
  }
  // the root node is 0 away from itself
  distances[root] = 0;

  var queue = [root];
  var current;

  while (queue.length != 0) {
    current = queue.shift();

    // N: For each vertex that the current node is connected to
    var row = graph[current];
    row.forEach((value, index) => {
      if (!value) {
        return;
      }

      // If the distance isnt known yet, it will be current + 1
      // And other nodes connecting to it should be explored
      // so add it to the queue
      if (distances[index] === Infinity) {
        distances[index] = distances[current] + 1;
        queue.push(index);
      }
    });
  }
  return distances;
};


describe('graph', () => {
  describe('as array of arrays, find all paths', () => {
    it('should exit early if there is no outgoing edges', () => {
      expect(findPaths([ [] ])).to.eql([]);
    });

    it('should find one path', () => {
      expect(findPaths([ [ 1 ], [] ])).to.eql([ [ 0, 1 ] ]);
    });

    it('should find multiple paths', () => {
      expect(findPaths([ [ 1, 2 ], [ 3 ], [ 3 ], [] ])).to.eql([ [ 0, 1, 3 ], [ 0, 2, 3 ] ]);
    });

    it('should handle interconnected graphs', () => {
      const adjacencyList = [
       /* 0 */ [ 1, 2, 3 ],
       /* 1 */ [ 2, 3 ],
       /* 2 */ [ 3 ],
       /* 3 */ []
      ];
      expect(findPaths(adjacencyList)).to.eql([ [ 0, 1, 2, 3 ], [ 0, 1, 3 ], [ 0, 2, 3 ], [ 0, 3 ] ]);
    });
  });

  describe('as adjacency matrix, find all paths', () => {
    it('should handle interconnected graphs', () => {
      const adjacencyMatrix = [
        [0, 1, 1, 1],
        [0, 0, 1, 1],
        [0, 0, 0, 1],
        [0, 0, 0, 0],
      ];
      expect(adjacencyMatrixBFS({ graph: adjacencyMatrix, root: 1 })).to.eql({
        0: Infinity,
        1: 0,
        2: 1,
        3: 1,
      });
    });

    it('should handle interconnected graphs', () => {
      const adjacencyMatrix = [
        [0, 1, 1, 1, 0],
        [0, 0, 1, 0, 0],
        [1, 1, 0, 0, 0],
        [0, 0, 0, 1, 0],
        [0, 1, 0, 0, 0]
      ];
      const distancesFromVertexZero = adjacencyMatrixBFS({ graph: adjacencyMatrix, root: 0 });
      expect(distancesFromVertexZero).to.eql({
        0: 0,
        1: 1,
        2: 1,
        3: 1,
        4: Infinity
      });
      const distancesFromVertexOne = adjacencyMatrixBFS({ graph: adjacencyMatrix, root: 1 });
      expect(distancesFromVertexOne).to.eql({
        0: 2,
        1: 0,
        2: 1,
        3: 3,
        4: Infinity
      });
    });
  });
});
