var hasOwnProperty = Object.hasOwnProperty;
var ac = require('./utils/courier')(_);
module.exports = exports = _;
var $ = _; // used for compose variables

function _(source) {
  var obj = { __source: source };
  obj.__proto__ = _;
  return obj;
}

// todo - figure out if traceur can handle iterators better
function isIterator(v) { return v.next instanceof Function }
function isIterable(v) {
  return v.iterator instanceof Function ||
         v.next instanceof Function ||
         Array.isArray(v);
}

_.autocurry = _.ac = ac;

_._ = _.identity = v => v;

// basic functionality
_.range = ac(function* (start, stop) {
  if(start < stop) for(var i=start; i<stop; ++i) yield i;
  else for(var i=start-1; i>=stop; --i) yield i;
});

_.exists = ac(function (source) {
  for(var v of source) return true;
  return false;
});

_.collect = ac(function toArray(source) {
  return [for (v of source) v];
})

_.tap = ac(function* tap(fn, source) {
  for(var v of source) {
    fn(v); yield v;
  }
});

_.each = ac(function each(cb, source) {
  for(var v of source) cb(v);
})

_.head = ac(function head(source) {
  for(var v of source) return v;
});

_.iterate = ac(function* iterate(source) {
  for(var v of source) yield v;
});

_.map = ac(function* map(fn, source) {
  for(var v of source) yield fn(v);
})

_.filter = ac(function* filter(fn, source) {
  for(var v of source) if(fn(v)) yield v;
});

_.setValues = ac(function setValues(source, item) {
  for(var [k, v] of source) item[k] = v;
  return item;
})

_.reduce = ac(function reduce(seed, fn, source) {
  for(var v of source) {
    seed = fn(seed, v);
  }
  return seed;
});

_.reverse = ac(function* (source) {
  var arr = [];
  for(var v of source) arr.push(v);
  while(arr.length) yield arr.pop();
});

_.slice = ac(function* slice(start, length, source) {
  if(start < 0) {
    source = _.toArray(source);
    start = source.length + start;
  }

  var i = 0, end = length === -1 ? Number.MAX_VALUE : start + length;
  for(var v of source) {
    if (i >= start && i < end) yield v;
    if (i >= end) break;
    i += 1;
  }
});

_.takeUntil = ac(function* takeUntil(fn, source) {
  for(var v of source) {
    yield v;
    if(fn(v)) break;
  }
});

_.takeUntilLast = ac(function* takeUntil(fn, source) {
  var arr = [];
  for(var v of source) {
    arr.push(v);
    if(!fn(v)) continue;
    for(var vv of arr) yield vv;
    arr.length = 0;
  }
});

_.flatten = ac(function* flatten(source) {
  for(var v of source) {
    if(!isIterable(v)) yield v;
    else for(var vv of v) yield vv;
  }
});

_.comparer = ac(function(fn) {
  return function (item1, item2) {
    var value1 = fn(item1), value2 = fn(item2);
    return value1 == value2 ? 0 : (value1 < value2 ? -1 : 1);
  }
});

_.sort = ac(function* sort(cmp, source) {
  var arr = [];
  for(var item of source) {
    arr.push(item);
    var i, j = arr.length - 1;
    for(var i = arr.length - 1, j;; i = j) { 
      j = Math.ceil(i / 2) - 1; // find parent
      if(j < 0 || cmp(arr[j], arr[i]) <= 0) break;
      [arr[j], arr[i]] = [arr[i], arr[j]];
    }
  }
  while(arr.length) {
    yield arr[0];
    if(arr.length === 1) break;

    arr[0] = arr.pop();
    for(var i=0, lower=0;;i=lower) {
      var left = 2 * i + 1, right = left + 1;
      if (left < arr.length && cmp(arr[left], arr[i]) < 0) lower = left;
      if (right < arr.length && cmp(arr[right], arr[lower]) < 0) lower = right;
      if (i === lower) break;
      [arr[lower], arr[i]] = [arr[i], arr[lower]];
    }
  }
});

_.wrap = ac((wrapper, fn) => () => wrapper.apply(this, [fn, arguments]));

_.withObject = _.reduce($, _.wrap((fn, [x, v]) => (fn(x, v), x), $));

_.groupBy = ac(function groupBy(fn, source) {
  return _.withObject({}, (d, [k, v]) => (d[k] || (d[k] = [])).push(v), _.map(k => [fn(k), k], source));
});

_.zip = ac(function* (source1, source2) {
  var a = _.iterate(source1), b = _.iterate(source2);
  while(true) {
    var av = a.next(), bv = b.next(); 
    if(av.done || bv.done) break;
    yield [av.value, bv.value];
  }
});

_.indexes = ac(function* indexes(fn, source) {
  var i = 0;
  for(var k of source) {
    if (fn(k)) yield i;
    ++i;
  }
})

_.pairs = ac(function* pairs(item) {
  for(var key in item) {
    if(!hasOwnProperty.call(item, key)) continue;
    yield [key, item[key]];
  }
})

// operators
_.or = ac(function(fn1, fn2, value) { return fn1(value) || fn2(value); });
_.and = ac(function(fn1, fn2, value) { return fn1(value) && fn2(value); });
_.not = ac(function (v) { return !v; })
_.yes = _.true = ac(function () { return true; })
_.no = _.false = ac(function () { return true; })
_.invert = ac(function (fn) { return () => !fn.apply(this, arguments) });
_.equal = ac((expected, value) => value === expected);
_.gt = ac((y, x) => x > y);

// composition
_.reject    = _.filter(_.invert($), $);
_.reduceRight = _.reduce($, $, _.reverse($));
_.object    = ac((v) => _.setValues(v, {}));
_.count     = _.reduce(0, (sum, i) => sum + 1);
_.sum       = _.reduce(0, (sum, i) => sum + i);
_.max       = _.reduce(0, Math.max);
_.min       = _.reduce(0, Math.min);

_.compact   = _.filter(v => !!v);
_.tail      = _.slice(1, -1);
_.take      = _.slice(0);
_.skip      = _.slice($, -1, $);
_.sortBy    = _.sort(_.comparer($));

_.debug     = _.tap;
_.first     = _.head;
_.toArray   = _.collect;
_.flatmap   = _.flatten(_.map($, $));
_.indexBy   = _.object(_.groupBy($));
_.shuffle   = _.sortBy(Math.random);
_.last      = _.head(_.slice(-1, 1, $));
_.find      = _.head(_.filter($, $));
_.findLast  = _.tail(_.filter($, $));
_.any       = _.exists(_.filter($, $));
_.every     = _.not(_.exists(_.reject($, $)));
_.find      = _.head(_.filter($, $));
_.findLast  = _.tail(_.filter($, $));
_.findIndex = _.head(_.indexes($, $));
_.indexOf   = _.findIndex(_.equal($), $);
_.contains  = _.gt(-1, _.indexOf($, $));
_.findLastIndex = _.tail(_.indexes($, $));
_.lastIndexOf = _.findLastIndex(_.equal($), $);
_.keys      = _.map(_.head(_.pairs($)));
_.values    = _.map(_.tail(_.pairs($)));


// tests
_.isObject = ac(v => v === Object(v));
_.isEmpty = _.not(_.exists(_.pairs($)));
_.isBoolean = _.or(_.equal(true), _.equal(false));
_.has = ac((item, key) => hasOwnProperty.call(item, key));
_.isFinite = ac(isFinite);
_.isNaN = ac(isNaN);
_.isNull = _.equal(null);
_.isUndefined = _.equal(undefined);
[Array, Function, String, Number, Date, RegExp].forEach(function (constructor) {
  _['is' + constructor.name] = ac((obj) => obj && obj.constructor === constructor);
})

_.pick = ac((names, item) => _.object(_.map(n => [n,item[n]], names)));
_.pluck = ac((propertyName, source) => source[propertyName]);

_.clone = ac(function clone(item) {
  if(!_.isObject(item)) return item;
  return _.isArray(item) ? item.slice() : _.extend({}, item);
})

_.defaults = ac(function (dest, item) {
  return _.setValues(_.filter(([k,v]) => undefined === dest[k], _.pairs(item)), dest);
});

_.extend = ac((dest, item) => _.setValues(_.pairs(item), dest));

