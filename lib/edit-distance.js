// http://en.wikipedia.org/wiki/Levenshtein_distance
var ed = function(x, y){
  var n = x.length;
  var m = y.length;
  var C = []; // C[n+1][m+1]
  for(var i = 0; i <= n; i++){
    C[i] = [];
  }
  for(var i = 0; i <= n; i++){
    C[i][0] = i;
  }
  for(var j = 0; j <= m; j++){
    C[0][j] = j;
  }
  for(var i = 1; i <= n; i++){
    for(var j = 1; j <= m; j++){
      C[i][j] = C[i-1][j] + 1;
      C[i][j] = Math.min(C[i][j], C[i][j-1] + 1);
      C[i][j] = Math.min(C[i][j], C[i-1][j-1] + (x[i-1] === y[j-1] ? 0 : 1));
    }
  }
  return C[n][m];
};

console.log(ed('ala', 'ma'));
console.log(ed('ala', 'ala'));
console.log(ed('bla', 'ala'));
console.log(ed('dudu', 'ddua'));
