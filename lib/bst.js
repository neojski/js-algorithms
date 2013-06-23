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
    var p = {node: {left: root, right: root}};
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
    if(x === null) return;
    var p = x.parent;
    var c = x.el;
    if(c.node.left.node === null){ // no left child
      if(p.node.left.node === c.node){
        p.node.left = c.node.right;
      }else{
        p.node.right = c.node.right;
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

var bst = getBst();
var n = 100;
var a = [];
for(var i = 0; i < n; i++){
  a.push(i);
}
a.sort(function(){return Math.random()-.5});
for(var i = 0; i < n; i++){
  bst.insert(2*a[i]);
}
for(var i = 0; i < 2*n; i++){
  console.log(bst.find(i));
}
for(var i = 0; i < n/2; i++){
  bst.remove(4*i);
  console.log('remove', 4*i);
}
for(var i = 0; i < 2*n; i++){
  console.log(bst.find(i));
}
