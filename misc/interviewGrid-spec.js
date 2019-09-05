const expect = require('expect.js');

// There is a Table with Red/Back dot and I need to find the number of red dot.
// Each group of black dot is restricted by Red dot or the edge of the Grid. 

// ex: R = Red (false), B = Black (True) X = Starting point. 0 = undefined node.
// [0,0,R,B,R]
// [0,R,B,X,B]
// [R,0,R,B,R]
// [B,R,0,R,0]

// expect: Find the number of R around the X
// startingPoint = {x: 3, Y: 1};

// Loop solution: 
const numberOfRedAround = (table, sp) => {
  const itemLeftTocheck = [sp];
  const knownList = {};
  let totalRed = '';
  while (itemLeftTocheck.length !== 0) {
    console.log('itemLeftToCheck', itemLeftToCheck.length);
    const itemToCheck = itemLeftTocheck.pop();
    const [ red, black ] = findAllEdge(table, itemToCheck, knownList);
    red.map((item)=> addToVisited(knownList, item));
    totalRed += red.length;
    itemLeftTocheck = [...itemLeftTocheck, ...black];
  }
  return totalRed;
};

const givePointAroundMiddle = (point) => {
  return pointToInspect = [
    {x: point.x +1, y: point.y},
    {x: point.x -1, y: point.y},
    {x: point.x, y: point.y +1},
    {x: point.x, y: point.y -1},
  ];
};

const addToVisited = (list, pt) => {
  list[`${pt.x}${pt.y}`] = true;
  return list;
}

const isAlreadyVisited = (list, pt) => {
  return list[`${pt.x}${pt.y}`] === true;
};

const findAllEdge = (table, point, visted) => {
  const pointToInspect = givePointAroundMiddle(point);
  
  return pointToInspect.reduce((prev, item) => {
    if(!table[item.x] || table[item.x][item.y] === undefined) return prev;
    // Point exist.
    const value = table[item.x][item.y];
    if (isAlreadyVisited(visted, item)) return prev;
    if(value === false) {
      return  {
        red: [...prev.red, item],
        black: prev.black,
      }
    }

    if(value === true) {
      return  {
        red: prev.red,
        black: [...prev.black, item],
      }
    }
  }, {red: [], black: []});
}


describe.only('.numberOfRedAround', () => {
  let table = [];
  const R = false;
  const B = true;
  const O = undefined
  
  beforeEach(() => {
    let table = [
      [O,O,R,B,R],
      [O,R,B,B,B],
      [R,O,R,B,R],
      [B,R,O,R,O],
    ];
  });

  describe('.givePointAroundMiddle', () => {
    it('largetable', () => {
      const result = givePointAroundMiddle({x:1, y:1});
      expect(result.length).to.eql(4);
    })
  });

  describe('.addToVisited', () => {
    it('empty', () => {
      expect(addToVisited({}, {x:1, y:1})).to.eql({'11': true});
    })

    it('new one', () => {
      const list = addToVisited({'12': true}, {x:1, y:1});
      expect(list).to.eql({'11': true, '12': true});
      expect(isAlreadyVisited(list, {x:1, y:1})).to.eql(true);
      expect(isAlreadyVisited(list, {x:1, y:4})).to.eql(false);
    })
  });

  describe('.findAllEdge', () => {
    it('all Red', () => {
      const base = [
        [R,R,R],
        [R,B,R],
        [R,R,R]
      ];
      const st = {x:1, y:1};
      const result = findAllEdge(base, st, {});
      expect(result.red.length).to.eql(4);
      expect(result.black.length).to.eql(0);
    });

    it('Some Red Edge', () => {
      const base = [
        [R,R,R],
        [B,B,B],
        [R,B,R]
      ];
      const st = {x:1, y:1};
      const result = findAllEdge(base, st, {});
      expect(result.red.length).to.eql(1);
      expect(result.black.length).to.eql(3);
    });

    it('At the edge of the table', () => {
      const base = [
        [R,R,R],
        [B,B,B],
        [B,B,R]
      ];
      const st = {x:1, y:2};
      const result = findAllEdge(base, st, {});
      expect(result.red.length).to.eql(2);
      expect(result.black.length).to.eql(1);
    });

    it('with already visited point', () => {
      const base = [
        [R,R,R],
        [B,B,B],
        [R,B,R]
      ];
      const alreadyVisited = {
        '02': true,
        '11': true,
      }
      const st = {x:1, y:2};
      const result = findAllEdge(base, st, alreadyVisited);
      expect(result.red.length).to.eql(1);
      expect(result.black.length).to.eql(0);
    });
  });

  it.skip('test Simple table', () => {
    sp = {x: 1, Y: 4};
    expect(numberOfRedAround(table, sp)).to.eql(6);
  });
});