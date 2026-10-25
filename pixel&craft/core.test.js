const { test } = require('node:test');
const assert = require('node:assert/strict');
const { Project, History, CLEAR, blend, counts, letters, palette } = require('./core.js');

test('bucket uses active layer, four-way connectivity and one undoable action', () => {
  const p = new Project(5, 5), h = new History(p);
  for (let y = 0; y < 5; y++) p.set(2, y, '#FF112233');
  p.Layers[0].hex.fill('#FF998877');
  h.begin(p); p.fill(0, 0, '#FFABCDEF'); h.end(p);
  assert.equal(p.active.hex[0], '#FFABCDEF');
  assert.equal(p.active.hex[4], CLEAR);
  assert.equal(p.Layers[0].hex[0], '#FF998877');
  const undone = h.undo(p);
  assert.equal(undone.active.hex[0], CLEAR);
  assert.equal(undone.active.hex[2], '#FF112233');
  assert.equal(h.redo(undone).active.hex[0], '#FFABCDEF');
});
test('movement survives off-canvas save/load, mask switches and return movement', () => {
  const p = new Project(4, 4);
  p.set(0, 0, '#FF010203'); p.move(-8, -3); p.Shape = 'Circle';
  const loaded = Project.load(p.serialize());
  assert.equal(loaded.active.outsidePixels.length, 1);
  loaded.move(8, 3);
  assert.equal(loaded.get(0, 0), CLEAR);
  loaded.Shape = 'Square';
  assert.equal(loaded.get(0, 0), '#FF010203');
  assert.equal(loaded.active.outsidePixels.length, 0);
});
test('keyboard movement shifts the selected layer in all directions and preserves pixels for return', () => {
  let p=new Project(7,5);const history=new History(p);
  p.set(0,0,'#FFFF0000');p.set(3,2,'#FF00FF00');p.set(6,4,'#FF0000FF');
  history.reset(p);
  for(const [dx,dy] of [[1,0],[0,1],[-1,0],[0,-1]]) {
    history.begin(p);p.move(dx,dy);history.end(p);
  }
  assert.equal(p.get(0,0),'#FFFF0000');assert.equal(p.get(3,2),'#FF00FF00');assert.equal(p.get(6,4),'#FF0000FF');
  assert.equal(history.past.length,4);
  for(let i=0;i<4;i++)p=history.undo(p);
  assert.equal(p.get(0,0),'#FFFF0000');assert.equal(p.get(3,2),'#FF00FF00');assert.equal(p.get(6,4),'#FF0000FF');
  for(let i=0;i<4;i++)p=history.redo(p);
  assert.equal(p.get(0,0),'#FFFF0000');assert.equal(p.get(3,2),'#FF00FF00');assert.equal(p.get(6,4),'#FF0000FF');
});
test('movement uses the active layer and retains its off-canvas pixels under the circle mask',()=>{
  let p=new Project(5,5);p.set(0,2,'#FFFF0000');p.addLayer();p.set(2,2,'#FF00FF00');p.Shape='Circle';
  const h=new History(p);h.begin(p);p.move(1,0);h.end(p);
  assert.equal(p.Layers[1].hex[2*5+0],'#FFFF0000');assert.equal(p.get(3,2),'#FF00FF00');
  p=h.undo(p);assert.equal(p.get(2,2),'#FF00FF00');assert.equal(p.get(0,2),'#FFFF0000');
  p=h.redo(p);p.move(-1,0);assert.equal(p.get(2,2),'#FF00FF00');
});
test('document dimensions and content survive repeated directional key-style movement with undo/redo',()=>{
  let p=new Project(96,32);const h=new History(p);p.set(0,0,'#FFFF0000');p.set(95,31,'#FF0000FF');h.reset(p);
  h.begin(p);p.move(-1,0);h.end(p);assert.ok(p.active.outsidePixels.some(q=>q.x===-1&&q.y===0));
  h.begin(p);p.move(0,1);h.end(p);h.begin(p);p.move(1,0);h.end(p);h.begin(p);p.move(0,-1);h.end(p);
  assert.equal(p.Width,96);assert.equal(p.Height,32);assert.equal(p.get(0,0),'#FFFF0000');assert.equal(p.get(95,31),'#FF0000FF');
  p=h.undo(p);assert.equal(p.get(95,31),CLEAR);p=h.redo(p);assert.equal(p.get(95,31),'#FF0000FF');
  assert.equal(p.Width,96);assert.equal(p.Height,32);
});
test('desktop schema round trips layers, ARGB, reference, saved names and marks', () => {
  const fixture = { Width:2, Height:2, Shape:'Circle', ActiveLayer:1, Cells:[],
    Layers:[{name:'Fondo',hex:['#00000000','#00FFFFFF','#00FFFFFF','#00FFFFFF'],visible:false,opacity:.5,defaultNameNumber:0},
      {name:'Custom',hex:['#80445566','#00FFFFFF','#FFABCDEF','#FF445566'],visible:true,opacity:.8,defaultNameNumber:null,outsidePixels:[{x:-1,y:0,hex:'#FF000001'}]}],
    Recent:['#FFABCDEF'], Saved:[{name:'Hilo lila',hex:'#FFABCDEF'}], Marks:[[0,0],[1,1]],
    ReferenceImage:{data:'aGVsbG8=',x:-.5,y:1.25,width:3,height:4} };
  const p = Project.load(fixture), data = JSON.parse(p.serialize());
  assert.deepEqual(data.Saved,fixture.Saved); assert.deepEqual(data.ReferenceImage,fixture.ReferenceImage);
  assert.deepEqual(data.Marks,fixture.Marks); assert.deepEqual(data.Layers[1],fixture.Layers[1]);
  assert.equal(data.Layers[0].hex[0],CLEAR); assert.equal(data.ActiveLayer,1);
  const legacy = Project.load({ Width:1,Height:1,Cells:['#336699'],Saved:['#123456'],Recent:[],Marks:[] });
  assert.equal(legacy.get(0,0),'#FF336699');assert.deepEqual(legacy.Saved,[{name:'',hex:'#FF123456'}]);
});
test('composite respects layer order, visibility and fractional opacity', () => {
  const p = new Project(1,1);p.Layers[0].hex[0]='#FFFF0000';p.active.hex[0]='#FF0000FF';p.active.opacity=.5;
  assert.equal(p.get(0,0),'#FF800080');
  p.addLayer();p.set(0,0,'#FF00FF00');assert.equal(p.get(0,0),'#FF00FF00');
  p.reorder(2,1);assert.equal(p.get(0,0),'#FF008080');
  p.Layers[2].visible=false;assert.equal(p.get(0,0),'#FF00FF00');
  assert.equal(blend(CLEAR,'#80445566'), '#80445566');
});
test('rectangular mode uses all width x height cells while circle masks corners', () => {
  const p = new Project(6,4);
  assert.equal(p.contains(0,0),true);assert.equal(p.contains(5,0),true);assert.equal(p.contains(0,3),true);assert.equal(p.contains(5,3),true);
  assert.equal(p.contains(-1,0),false);assert.equal(p.contains(6,0),false);
  p.set(0,0,'#FF111111');p.Shape='Circle';assert.equal(p.contains(0,1),true);assert.equal(p.contains(0,0),false);
  assert.equal(p.get(0,0),CLEAR);p.Shape='Square';assert.equal(p.get(0,0),'#FF111111');
});
test('resizing to 96 x 32 exposes all requested rectangular rows and columns', () => {
  const p=new Project(32,32);p.resize(96,32);
  assert.equal(p.Width,96);assert.equal(p.Height,32);
  assert.ok(p.contains(0,0)&&p.contains(95,0)&&p.contains(0,31)&&p.contains(95,31));
  p.set(95,31,'#FF123456');assert.equal(p.get(95,31),'#FF123456');
  p.Shape='Circle';assert.equal(p.contains(0,0),false);assert.equal(p.contains(48,16),true);
  p.Shape='Square';assert.equal(p.contains(0,0),true);assert.equal(p.get(95,31),'#FF123456');
});
test('strokes interpolate fast drags and large brushes stay within contour', () => {
  const p = new Project(8,8);p.stroke(0,0,7,7,1,'#FF123456');
  for(let i=0;i<8;i++)assert.equal(p.get(i,i),'#FF123456');
  p.Shape='Circle';p.stroke(4,4,4,4,1000,'#FFABCDEF');
  assert.equal(p.active.hex[0],'#FF123456');assert.equal(p.get(0,0),CLEAR);assert.equal(p.get(4,4),'#FFABCDEF');
});
test('row/column runs reset at color changes and transparent gaps', () => {
  const a='#FF112233',b='#FF445566',cells=[a,a,CLEAR,a,a,b];
  assert.deepEqual(counts(cells,3,2,'row'),[1,2,0,1,2,1]);
  assert.deepEqual(counts(cells,3,2,'column'),[1,1,0,2,2,1]);
  assert.deepEqual([...letters(cells)],[[a,'A'],[b,'B']]);
});
test('resize and history keep background fixed and undo palette changes', () => {
  const p = new Project(4,4),h=new History(p);p.set(3,3,'#FF112233');p.mark(3,3,false);
  h.begin(p);p.resize(2,2);p.Saved.push({name:'A',hex:'#FF112233'});h.end(p);
  assert.equal(p.Marks.length,0);const q=h.undo(p);assert.equal(q.Width,4);assert.equal(q.get(3,3),'#FF112233');assert.equal(q.Saved.length,0);
  q.removeLayer(0);assert.equal(q.Layers[0].defaultNameNumber,0);
  assert.deepEqual(palette({Saved:['#FF112233',{name:'duplicate',hex:'#FF112233'},'#00000000']}),[{name:'',hex:'#FF112233'}]);
  assert.throws(()=>Project.load({Width:500,Height:2}));
});

test('redo commits an in-progress edit and cannot replay the discarded branch', () => {
  let p = new Project(4,4);const h=new History(p);
  h.begin(p);p.set(1,1,'#FF112233');h.end(p);
  p=h.undo(p);assert.equal(h.future.length,1);
  h.begin(p);p.set(2,2,'#FF445566');
  p=h.redo(p);
  assert.equal(p.get(1,1),CLEAR);assert.equal(p.get(2,2),'#FF445566');assert.equal(h.future.length,0);
  p=h.undo(p);assert.equal(p.get(2,2),CLEAR);
  p=h.redo(p);assert.equal(p.get(2,2),'#FF445566');
});
