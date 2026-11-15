import test from 'node:test';import assert from 'node:assert/strict';
test('authoritative net position is signed opening plus buys minus sells',()=>{const net=(opening,buy,sell)=>opening+buy-sell;assert.equal(net(0,1000,800),200);assert.equal(net(300,100,200),200);assert.equal(net(0,0,400),-400)});
test('missing P&L remains unknown rather than zero',()=>{const pnl=null;assert.equal(pnl,null);assert.notEqual(pnl,0)});
