const expect = require('expect.js');
const { isChainSymetrical } = require('../codility/winterLights');

describe.only('testing the winterLights challenge', () => {
  it('test the isChainSymetrical', () => {
    expect(isChainSymetrical([6])).to.be(true);
    expect(isChainSymetrical([0])).to.be(true);
    expect(isChainSymetrical([1, 3, 1])).to.be(true);
    expect(isChainSymetrical([0, 3, 1])).to.be(false);
    expect(isChainSymetrical([0, 0, 0, 2])).to.be(false);
    expect(isChainSymetrical([0, 0, 0, 2, 2])).to.be(true);
  });
});
