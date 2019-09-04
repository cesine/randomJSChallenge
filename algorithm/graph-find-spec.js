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
function adjacencyListBFS({ graph, root }) {
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
    row.forEach((index) => {
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

/**
 * Breadth first search from a root node to find the path of other nodes from that node
 * @param {*} param
 */
function adjacencyListFindPathsBFS({ graph, root }) {
  var paths = {};

  // N: initialize all lengths to infinity
  for (var i = 0; i < graph.length; i++) {
    paths[i] = [];
  }
  // the root node is 0 away from itself
  paths[root] = [root];

  var queue = [root];
  var current;

  while (queue.length != 0) {
    current = queue.shift();

    // N: For each vertex that the current node is connected to
    var row = graph[current];
    row.forEach((index) => {
      // If the distance isnt known yet, it will be current + 1
      // And other nodes connecting to it should be explored
      // so add it to the queue
      if (!paths[index].length) {
        paths[index] =  [ ...paths[current], index];
        queue.push(index);
      }
    });
  }
  return paths;
};

function calcManhattanDistance(a, b) {
  const xDistance = Math.abs(a.x - b.x);
  const yDistance = Math.abs(a.y - b.y);
  return xDistance + yDistance;
}

/**
 * Find shortest path from a root node to another node
 * using euclidean/manhattan distance
 *
 * each vertex should have an lat, long or x, y corrdinates, or some other measurement in space
 * https://www.youtube.com/watch?v=eSOJ3ARN5FM
 * @param {*} param
 */
function aStar({ graph, root, leaf }) {
  const manhattanDistance = calcManhattanDistance(root, leaf);
  debug('manhattanDistance', manhattanDistance);

  const open = [root];
  const closed = [];

  const resultingPath = [];

  // g()
  // h()
  function distanceFromLeaf(node) {
    if (node.distanceFromLeaf) {
      return node.distanceFromLeaf;
    }
    node.distanceFromLeaf = calcManhattanDistance(leaf, node);
    return node.distanceFromLeaf;
  }

  // f()
  function distanceFromRootAndLeaf(node) {
    if (node.distanceFromRootAndLeaf) {
      return node.distanceFromRootAndLeaf;
    }
    node.distanceFromRootAndLeaf = node.distanceFromRoot | distanceFromLeaf(node);
    return node.distanceFromRootAndLeaf;
  }

  let current;
  while (open.length) {
    if (!current) {
      current = open.shift();
      current.distanceFromRoot = 0;
    }
    debug('looking at', current);
    if (!current.neighbors || !current.neighbors.length) {
      closed.push(current);
      break;
    }

    if (current === leaf) {
      debug('found it', current);
      if (open.length) {
        open.splice(0, open.length);
      }
      break;
    }

    let nextProbable;
    current.neighbors.forEach((edge) => {
      const neighbor = graph[edge.node];
      if (!neighbor) {
        throw new Error(`this node ${edge.node} is not found in the graph`);
      }
      neighbor.distanceFromRoot = current.distanceFromRoot + edge.weight;
      if (neighbor === leaf) {
        nextProbable = neighbor;
        return;
      }
      if (closed.indexOf(neighbor) > -1) {
        return;
      }
      if (open.indexOf(neighbor) === -1) {
        open.push(neighbor);
      }
      if (!nextProbable || distanceFromRootAndLeaf(neighbor) < distanceFromRootAndLeaf(nextProbable)) {
        nextProbable = neighbor;
      }
    });
    debug('nextProbable', nextProbable);

    nextProbable.previous = current;
    closed.push(current);
    const currentInOpen = open.indexOf(current);
    if (currentInOpen > -1) {
      open.splice(currentInOpen, 1);
    }
    current = nextProbable;
  }

  while (current.previous) {
    resultingPath.unshift(current.label);
    current = current.previous;
  }
  resultingPath.unshift(root.label);

  return {
    graph,
    resultingPath,
    manhattanDistance,
  }
};

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

describe('sub Function check', () => {
  it('.calcManhattanDistance', () => {
    const root = { x: 0, y: 8 }
    const leaf = { x: 0, y: 10 }
    expect(calcManhattanDistance(root, leaf)).to.eql(2);
    expect(calcManhattanDistance(root, { x: 1, y: 10 })).to.eql(3);
    expect(calcManhattanDistance(root, { x: -1, y: -8 })).to.eql(17);
    expect(calcManhattanDistance({ x: -1, y: -8 }, root)).to.eql(17);
  })
});

describe('graph', () => {
  let graph = {};
  describe('as a weight graph, find shortest path', () => {
    beforeEach(() => {
      graph = {
        a: {
          label: 'a',
          x: 0,
          y: 8,
          neighbors: [{
            node: 'b',
            weight: 5
          }, {
            node: 'c',
            weight: 5,
          }],
        },
        b: {
          label: 'b',
          x: 2,
          y: 11,
          neighbors: [{
            node: 'd',
            weight: 3,
          }, {
            node: 'c',
            weight: 4,
          }],
        },
        c: {
          label: 'c',
          x: 3,
          y: 8,
          neighbors: [{
            node: 'd',
            weight: 7,
          }, {
            node: 'h',
            weight: 8,
          }, {
            node: 'e',
            weight: 7,
          }],
        },
        d: {
          label: 'd',
          x: 4,
          y: 12,
          neighbors: [{
            node: 'm',
            weight: 14,
          }, {
            node: 'l',
            weight: 13,
          }, {
            node: 'k',
            weight: 16,
          }, {
            node: 'h',
            weight: 11,
          }],
        },
        h: {
          label: 'h',
          x: 7,
          y: 6,
          neighbors: [{
            node: 'd',
            weight: 11,
          }, {
            node: 'i',
            weight: 3,
          }, {
            node: 'e',
            weight: 5,
          }],
        },
        
        i: {
          label: 'i',
          x: 9,
          y: 5,
          neighbors: [{
            node: 'h',
            weight: 3,
          }, {
            node: 'j',
            weight: 4,
          }],
        },
        
        j: {
          label: 'j',
          x: 12,
          y: 4,
          neighbors: [{
            node: 'i',
            weight: 4,
          }, {
            node: 'n',
            weight: 3,
          }, {
            node: 'p',
            weight: 8,
          }],
        },
        e: {
          label: 'e',
          x: 4,
          y: 4,
          neighbors: [{
            node: 'h',
            weight: 5,
          }, {
            node: 'c',
            weight: 7,
          }, {
            node: 'f',
            weight: 4,
          }],
        },
        f: {
          label: 'f',
          x: 1,
          y: 3,
          neighbors: [{
            node: 'e',
            weight: 4,
          }, {
            node: 'g',
            weight: 9,
          }],
        },
        g: {
          label: 'g',
          x: 6,
          y: 1,
          neighbors: [{
            node: 'f',
            weight: 9,
          }, {
            node: 'n',
            weight: 12,
          }],
        },
        m: {
          label: 'm',
          x: 12,
          y: 14,
          neighbors: [{
            node: 'd',
            weight: 14,
          }, {
            node: 'l',
            weight: 9,
          }, {
            node: 'o',
            weight: 5,
          }],
        },
        l: {
          label: 'l',
          x: 12,
          y: 11,
          neighbors: [{
            node: 'd',
            weight: 14,
          }, {
            node: 'm',
            weight: 9,
          }, {
            node: 'o',
            weight: 4,
          }, {
            node: 'k',
            weight: 5,
          }],
        },
        k: {
          label: 'k',
          x: 12,
          y: 8,
          neighbors: [{
            node: 'd',
            weight: 16,
          }, {
            node: 'l',
            weight: 5,
          }, {
            node: 'p',
            weight: 4,
          }, {
            node: 'n',
            weight: 7,
          }],
        },
        n: {
          label: 'n',
          x: 14,
          y: 3,
          neighbors: [{
            node: 'k',
            weight: 7,
          }, {
            node: 'j',
            weight: 3,
          }, {
            node: 'p',
            weight: 7,
          }],
        },
        p: {
          label: 'p',
          x: 16,
          y: 8,
          neighbors: [{
            node: 'k',
            weight: 4,
          }, {
            node: 'j',
            weight: 8,
          }, {
            node: 'n',
            weight: 7,
          }],
        },
      };
    })

    it('should find the shortest distance to H', () => {
      const distanceToH = aStar({
        graph,
        root: graph.a,
        leaf: graph.h,
      });
      expect(distanceToH.resultingPath).to.eql([
        'a',
        'c',
        'h',
      ]);
      expect(graph.h.distanceFromRoot).to.eql(13)
    });

    it('should find the shortest distance to P', () => {
      const distanceToP = aStar({
        graph,
        root: graph.a,
        leaf: graph.p,
      });
      
      expect(distanceToP.resultingPath).to.eql([
        'a',
        'c',
        'h',
        'i',
        'j',
        'p',
      ]);
      expect(graph.p.distanceFromRoot).to.eql(28)
    });

  });

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

  describe('as adjacency list, find all distances', () => {
    it('should handle interconnected graphs', () => {
      const adjacencyList = [
        [1, 2, 3],
        [2],
        [0, 1],
        [3],
        [1]
      ];
      const distancesFromVertexZero = adjacencyListBFS({ graph: adjacencyList, root: 0 });
      expect(distancesFromVertexZero).to.eql({
        0: 0,
        1: 1,
        2: 1,
        3: 1,
        4: Infinity
      });
      const distancesFromVertexOne = adjacencyListBFS({ graph: adjacencyList, root: 1 });
      expect(distancesFromVertexOne).to.eql({
        0: 2,
        1: 0,
        2: 1,
        3: 3,
        4: Infinity
      });
    });
  });

  describe('as adjacency list, find all paths', () => {
    it('should handle interconnected graphs', () => {
      const adjacencyList = [
        [1, 2, 3],
        [2],
        [0, 1],
        [3],
        [1]
      ];
      const pathsFromVertexZero = adjacencyListFindPathsBFS({ graph: adjacencyList, root: 0 });
      expect(pathsFromVertexZero).to.eql({
        0: [0],
        1: [0, 1],
        2: [0, 2],
        3: [0, 3],
        4: []
      });
      const pathsFromVertexOne = adjacencyListFindPathsBFS({ graph: adjacencyList, root: 1 });
      expect(pathsFromVertexOne).to.eql({
        0: [1, 2, 0],
        1: [1],
        2: [1, 2],
        3: [1, 2, 0, 3],
        4: []
      });
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

    it('should find distances', () => {
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
