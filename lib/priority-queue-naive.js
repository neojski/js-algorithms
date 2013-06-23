// {priority: 2, el: 'test'}
var getQueue = function(){
  var q = {};
  var i = 0;

  var enque = function(x){
    var key = i;
    q[key] = x;
    var ret = {
      decreaseKey: function(newPriority){
        q[key].priority = newPriority;
      }
    };
    i++;
    return ret;
  };

  var getMinInd = function(){
    var m = Infinity;
    var ind;
    for(var i in q){
      if(q[i].priority < m){
        ind = i;
        m = q[i].priority;
      }
    }
    return ind;
  };

  var getMin = function(){
    return q[getMinInd()].el;
  };

  var delMin = function(){
    var m = getMin();
    delete q[getMinInd()];
    return m;
  };

  return {
    getMin: getMin,
    delMin: delMin,
    enque: enque
  };
};

var q = getQueue();
q.enque({priority: 4, el: 'ty'});
q.enque({priority: 3, el: 'moja'});
q.enque({priority: 5, el: 'jesteś'});
var el = q.enque({priority: 7, el: 'litwo'});
q.enque({priority: 2, el: 'ojczyzno'});

el.decreaseKey(1);

console.log(q.delMin());
console.log(q.delMin());
console.log(q.delMin());
console.log(q.delMin());
console.log(q.delMin());
