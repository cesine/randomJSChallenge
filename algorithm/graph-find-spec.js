const expect = require('expect.js');

function findPaths (input) {
  const paths = [];
  if (input.length < 2) {
    return paths;
  }

  console.log('findPaths', input);

  function findPath (index, acc) {
    console.log(`${index} so far`, acc);

    // no more outgoing edges, add the path
    if (input[index].length === 0) {
      console.log(`${index} no outgoing edges\n`);
      paths.push([ ...acc, index ]);
      return;
    }

    // for each edge
    input[index].forEach((dest) => {
      console.log(`${index} outgoing edges ${dest}`);
      if (input[dest]) {
        console.log(`  exploring ${dest}`);
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
  var nodesLen = {};

  // initialize all lengths to infinity
  for (var i = 0; i < graph.length; i++) {
    nodesLen[i] = Infinity;
  }
  // the root node is 0 away from itself
  nodesLen[root] = 0;

  var queue = [root];
  var current;

  while (queue.length != 0) {
    current = queue.shift();

    // row for this vertex
    var row = graph[current];
    var neighborIdx = [];
    // find a connected vertex
    var idx = row.indexOf(1);
    while (idx != -1) {
      neighborIdx.push(idx);
      // find the next cell that is connected from that index
      // refactor to make more clear
      idx = row.indexOf(1, idx + 1);
    }

    for (var j = 0; j < neighborIdx.length; j++) {
      if (nodesLen[neighborIdx[j]] == Infinity) {
        nodesLen[neighborIdx[j]] = nodesLen[current] + 1;
        queue.push(neighborIdx[j]);
      }
    }
  }
  return nodesLen;
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
      expect(adjacencyMatrixBFS({ graph: adjacencyMatrix, root: 1 })).to.eql({
        0: 2,
        1: 0,
        2: 1,
        3: 3,
        4: Infinity
      });
    });
  });
});
