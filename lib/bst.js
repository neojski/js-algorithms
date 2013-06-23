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
  var root = null;

  var insert = function(root, x){
    if(root === null){
      root = {el: x, left: null, right: null};
    }else{
      if(x < root.el){
        root.left = insert(root.left, x);
      }else{
        root.right = insert(root.right, x);
      }
    }
    return root;
  };

  var find = function(root, x){
    var p = null;
    var c = root;
    while(c !== null){
      if(c.el === x){
        return {parent: p, current: c};
      }
      p = c;
      if(c.el < x){
        c = c.right;
      }else{
        c = c.left;
      }
    }
    return null;
  };

  var remove = function(root, x){
    var x = find(root, x);
    if(x === null){
      return root;
    }
    var p = x.parent;
    var c = x.current;
    if(c.left === null){ // no left child
      if(p){
        if(p.left === c){
          p.left = c.right;
        }else{
          p.right = c.right;
        }
      }else{
        return c.right;
      }
    }else if(c.right === null){
      if(p){
        if(p.left === c){
          p.left = c.left;
        }else{
          p.right = c.left;
        }
      }else{
        return c.left;
      }
    }else{ // both children
      var y = c.right;
      var yp = c;
      if(y.left){
        while(y.left !== null){
          yp = y;
          y = y.left;
        }
        c.el = y.el;
        yp.left = remove(y, y.el);
      }else{
        c.el = y.el;
        yp.right = remove(y, y.el);
      }
    }
    return root;
  };

  return {
    insert: function(x){
      root = insert(root, x);
    },
    find: function(x){
      return find(root, x) !== null ? x : null;
    },
    remove: function(x){
      root = remove(root, x);
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
