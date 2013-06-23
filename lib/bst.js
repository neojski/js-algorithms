var assert = require('assert');

// pretty tricky implementation of bst
// should probably clean it before sending to the public
// trick:
// every node is not node but object with property node
// why:
// this is because in js you don't have reference working as
// in c++ and so we have to watch out what is passed by ref
// and what's passed by value. In particular creating a method
// like insert(root, x) you pass root by reference but when you
// modify it (the root variable) obiously nothing happens
var getBst = function(){
  var root = {node: null};

  var insert = function(root, x){
    if(root.node === null){
      root.node = {el: x, left: {node: null}, right: {node: null}};
    }else{
      if(x < root.el){
        insert(root.node.left, x);
      }else{
        insert(root.node.right, x);
      }
    }
  };

  var find = function(root, x){
    var p = {node: {left: root, right: root}}; // this is fake parent of root
    var c = root;
    while(c.node !== null){
      if(c.node.el === x){
        return {parent: p, el: c};
      }
      p = c;
      if(c.el < x){
        c = c.node.left;
      }else{
        c = c.node.right;
      }
    }
    return null;
  };

  var remove = function(root, x){
    var x = find(root, x);
    if(x === null){
      return;
    }
    var p = x.parent;
    var c = x.el;
    if(c.node.left.node === null){ // no left child
      if(p.node.left.node === c.node){
        p.node.left.node = c.node.right.node;
      }else{
        p.node.right.node = c.node.right.node;
      }
    }else if(c.node.right.node === null){
      if(p.node.left.node === c.node){
        p.node.left = c.node.left;
      }else{
        p.node.right = c.node.left;
      }
    }else{ // both children
      var y = c.node.right;
      while(y.node.left.node !== null){
        y = y.node.left;
      }
      c.node.el = y.node.el;
      remove(y, y.node.el);
    }
  };

  return {
    insert: function(x){
      insert(root, x);
    },
    find: function(x){
      return find(root, x) !== null ? x : null;
    },
    remove: function(x){
      remove(root, x);
    }
  };
};

// tests
// root test
var bst = getBst();
bst.insert(1);
bst.remove(1);
assert.strictEqual(bst.find(1), null);

// random test
var ref = {}; // reference implementation
var rand = function(a, b){
  return a + Math.floor(Math.random() * (b-a));
};

for(var i = 0; i < 1000; i++){
  console.log('operation', i);
  var el = rand(0, 10);
  if(i % 2 === 0){
    bst.remove(el);
    if(el in ref){
      ref[el]--;
      if(ref[el] <= 0){
        delete ref[el];
      }
    }
  }else{
    bst.insert(el);
    if(el in ref){
      ref[el]++;
    }else{
      ref[el] = 1;
    }
  }
  // check equality
  for(var j = 0; j < 1000; j++){
    var x = j in ref;
    var y = bst.find(j) !== null;
    assert.strictEqual(y, x, 'same value for ' + j);
  }
}
