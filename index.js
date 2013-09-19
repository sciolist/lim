var t = require('traceur').require('./lib/index.js');


console.log(t.groupBy(0, 1, 2, 3) );
console.log(t.groupBy(function(x) { return x % 2 }, [0,1,2,3,4,5,6]));

