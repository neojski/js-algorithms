// first version
var kmp = function(A){
  var p = [];
  var n = A.length;
  A = ' ' + A;
  p[1] = 0;
  for(var i = 2; i <= n; i++){
    var j = p[i-1];
    while(A[j+1] != A[i] && j >= 1){
      j = p[j];
    }
    p[i] = j;
    if(A[j+1] == A[i]){
      p[i]++;
    }
  }
  return p;
};

// one if less
// rationale:
// treat first character of the string as matching
// everyting (so when we are done with while we know
// that either A[j+1] == A[i] or j == -1. But j == -1
// means that we A[j+1] matches A[i]. So always just
// say p[i] = j+1
var kmp2 = function(A){
  var p = [];
  var n = A.length;
  A = '*' + A;
  p[0] = -1;
  for(var i = 1; i <= n; i++){
    var j = p[i-1];
    while(A[j+1] != A[i] && j >= 0){
      j = p[j];
    }
    p[i] = j+1;
  }
  return p;
};

console.log(kmp('aabaabaaabab'));
console.log(kmp2('aabaabaaabab'));
