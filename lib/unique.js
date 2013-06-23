
var unique1 = function(a){
  var x = {};
  var ret = [];
  for(var i = 0; i < a.length; i++){
    x[a[i]] = true;
  }
  for(var i in x){
    ret.push(i);
  }
  return ret;
}

var unique2 = function(b){
  var ret = [];
  var a = b.slice(0);
  a.sort();
  var j = -1;
  for(var i = 0; i < a.length; i++){
    if(a[i] !== a[j]){
      ret.push(a[i]);
      j = i;
    }
  }
  return ret;
}

var unique3 = function(a){
  var ret = [];
  var g = {word: false, tree: {}};

  function insert(g, x){
    for(var i = 0; i < x.length; i++){
      if(!(x[i] in g.tree)){
        g.tree[x[i]] = {word: false, tree: {}};
      }
      g = g.tree[x[i]];
    }
    g.word = true;
  }
  for(var i = 0; i < a.length; i++){
    insert(g, a[i]);
  }
  function print(g, cur){
    if(g.word){
      ret.push(cur);
    }
    for(var i in g.tree){
      print(g.tree[i], cur + i);
    }
  }
  print(g, '');
  return ret;
}

var a = ['ala', 'ma', 'ala', 'kota', 'kotara', 'alaska', 'mam', 'mam', 'kota', ''];
console.log(unique1(a));
console.log(unique2(a));
console.log(unique3(a));
