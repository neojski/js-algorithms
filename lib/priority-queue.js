var assert = require('assert');

// min queue
var getQueue = function(){
  var q = [0];
  var n = 0; // number of elements
  var insert = function(x, p){
    n++;
    q[n] = {el: x, priority: p};
    heapifyUp(n);
  };
  var swap = function(i, j){
    var tmp = q[i];
    q[i] = q[j];
    q[j] = tmp;
  };
  //var heapifyUp = function(i){
  //  if(i === 1) return;
  //  var p = Math.floor(i/2);
  //  if(q[p].priority > q[i].priority){
  //    swap(p, i);
  //    heapifyUp(p);
  //  }
  //};
  var heapifyUp = function(i){
    while(i > 1){
      var p = Math.floor(i/2);
      if(q[p].priority > q[i].priority){
        swap(p, i);
        i = p;
      }else{
        return;
      }
    }
  };
  //var heapifyDown = function(i){
  //  if(2 * i > n) return;
  //  var j = 2 * i;
  //  if(j+1 <= n && q[j+1].priority < q[j].priority) j++;
  //  if(q[i].priority > q[j].priority){
  //    swap(i, j);
  //    heapifyDown(j);
  //  }
  //};
  var heapifyDown = function(i){
    while(2 * i <= n){
      var j = 2 * i;
      if(j+1 <= n && q[j+1].priority < q[j].priority) j++;
      if(q[i].priority > q[j].priority){
        swap(i, j);
        i = j;
      }else{
        return;
      }
    }
  };
  var remove = function(){
    var el = q[1].el;
    q[1] = q[n];
    n--;
    heapifyDown(1);
    return el;
  };
  return {
    insert: insert,
    remove: remove,
    log: function(){
      console.log(q);
    }
  };
};

for(var n = 1; n < 10000000; n *= 10){
  console.log('checking for ' + n);
  var q = getQueue();

  var arr = [];
  for(var i = 0; i < n; i++){
    arr.push(i);
  }
  arr.sort(function(){return Math.random()-.5;});

  for(var i = 0; i < n; i++){
    q.insert(arr[i], arr[i]);
  }

  for(var i = 0; i < n; i++){
    assert.equal(q.remove(), i);
  }
  console.log('ok');
}
