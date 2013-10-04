$ = _ = require("./");

console.log('create 1');
test1 = _.ac(function(a, b) { console.log("testy", a, b) });
console.log('create 2');
test2 = test1(test1, $);
console.log('create 3');
test3 = test1(test2($), test2);
console.log('created');
test1();

console.log('log 1');
console.log(test1.courier);
console.log('log 2');
console.log(test2.courier);
console.log('log 3');
console.log(test3.courier);


return;
invoker = _.ac(function(fn) { console.log('invoked!'); return 666; });
adder = _.ac(function(a, b) { return a + b; });
add4 = adder(adder($, $), adder($, $));
test = invoker(add4($, $, $, $));

var reject = _.filter(_.invert($), $);

console.log(test.courier);

