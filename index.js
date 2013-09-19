var hasOwnProperty = Object.hasOwnProperty;
var slice = Array.prototype.slice;

// autocurry
function ac(fn, opts) {
  if(!opts) {
    opts = {};
    opts.prefix = [for (i of Array(fn.length)) _];
    opts.remain = opts.prefix.length;
  }

  function isPending(value, placeholders) {
    if(placeholders) return value && value.name === 'autocurry' && value.placeholders > 0;
    return value && value.name === 'autocurry' && value.remain > 0;
  }

  function chain(context, container, args) {
    args.push(context.__source);
    // if (ac.remain > args.length) throw new Error('insufficent arguments to ' + fn.name);
    var result = container.complete(args.splice(0, fn.length));
    if (isPending(result)) return _(result.complete(args));
    if (result && isIterator(result)) return _(result);
    return result;
  }

  var autocurry = function autocurry() {
    var args = slice.call(arguments);
    if (this.__source) return chain(this, autocurry, args);
    return autocurry.complete(args);
  }
  autocurry.opts = opts;
  autocurry.placeholders = opts.placeholders || 0;
  autocurry.remain = opts.remain;
  autocurry.toString = function () { return '[object Seam]'; }
  autocurry.complete = function (values) {
    var sliced = slice.call(opts.prefix), remain = opts.remain, placeholders = 0;
    for(var i=0; i<sliced.length; ++i) {
      if (isPending(sliced[i], true)) {
        sliced[i] = sliced[i].complete(values.splice(0, sliced[i].placeholders));
        if(!isPending(sliced[i], true)) remain--;
        else placeholders += sliced[i].placeholders;
        continue;
      }
      if (sliced[i] !== _) continue;
      if (!values.length) break;
      sliced[i] = values.shift();
      if (isPending(sliced[i], true)) {
        placeholders += sliced[i].placeholders;
        continue;
      }
      if (sliced[i] !== _) remain --;
      else placeholders ++;
    }
    var rest = ac(fn, { prefix: sliced, remain: remain, placeholders: placeholders, bonus: values });
    if(rest.remain > 0 || rest.placeholders > 0) return rest;
    return rest.invoke(this);
  }

  autocurry.invoke = function (self) {
    var result = fn.apply(self, opts.prefix);
    if(result && result.name === 'autocurry' && result.remainder > 0) {
      return result.complete(bonus);
    }
    return result;
  }
  return autocurry;
}

// todo - something less sucky for this
function isIterator(v) { return v.next instanceof Function }
function isIterable(v) {
  return v.iterator instanceof Function ||
         v.next instanceof Function ||
         Array.isArray(v);
}

var _ = function (source) {
  var obj = { __source: source };
  obj.__proto__ = _;
  return obj;
}

_.inspect = function() { return '( PLACEHOLDER )'; }

_.autocurry = _.ac = ac;

_.toString = function() { return '[object Lim]'; }

_.self = _.identity = v => v;

_.toArray = ac(function toArray(source) {
  return [for (v of source) v];
})

_.collect = _.toArray;

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

_.debug = _.tap;

_.filter = ac(function* filter(fn, source) {
  for(var v of source) if(fn(v)) yield v;
});

_.takeUntil = ac(function* takeUntil(fn, source) {
  for(var v of source) {
    yield v;
    if(fn(v)) break;
  }
});

_.reduce = ac(function reduce(seed, fn, source) {
  for(var v of source) {
    seed = fn(seed, v);
  }
  return seed;
});

_.compose = function () {
  var fns = arguments;
  return function composed() {
    var args = arguments;
    for (var i = fns.length-1; i >= 0; --i) {
      args = [fns[i].apply(this, args)];
    }
    return args[0];
  }
}

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

_.exists = ac(function (source) {
  for(var v of source) return true;
  return false;
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

_.withObject = ac((obj, fn) => _.reduce(obj, (x, v) => (fn(x, v), obj)));

_.groupBy = ac(function groupBy(fn, source) {
  return _.withObject({}, (d, [k, v]) => (d[k] || (d[k] = [])).push(v), _.map(k => [fn(k), k], source));
});

_.groupBy = ac((fn) => _.withObject({}, (d, [k, v]) => (d[k]||(d[k]=[])).push(v), _.map(k => [fn(k), k])));

_.zip = ac(function* (source1, source2) {
  var a = _.iterate(source1), b = _.iterate(source2);
  while(true) {
    var av = a.next(), bv = b.next(); 
    if(av.done || bv.done) break;
    yield [av.value, bv.value];
  }
});


_.range = ac(function* (start, stop) {
  if(start < stop) for(var i=start; i<stop; ++i) yield i;
  else for(var i=start-1; i>=stop; --i) yield i;
});

// logical operators
_.or = ac(function(fn1, fn2, value) { return fn1(value) || fn2(value); });
_.and = ac(function(fn1, fn2, value) { return fn1(value) && fn2(value); });
_.not = ac(function (v) { return !v; })

_.invert = function (fn) { return () => !fn.apply(this, arguments) }

// alias
_.first = _.head;

_.indexes = ac(function* indexes(fn, source) {
  var i = 0;
  for(var k of source) {
    if (fn(k)) yield i;
    ++i;
  }
})



_.pluck = ac((propertyName, source) => source[propertyName]);
_.indexOf = ac((item, source) => _.findIndex((v) => item === v, source));
_.lastIndexOf = ac((item, source) => _.findLastIndex((v) => item === v, source));

_.reject = _.filter(_.invert(_));
_.reduceRight = _.reduce(_, _, _.reverse(_));


_.object = (v) => _.setValues(v, {});
_.count = _.reduce(0, (sum, i) => sum + 1);
_.sum = _.reduce(0, (sum, i) => sum + i);
_.max = _.reduce(0, Math.max);
_.min = _.reduce(0, Math.min);

_.compact = _.filter(v => !!v);
_.tail = _.slice(1, -1);
_.take = _.slice(0);
_.skip = _.slice(_, -1, _);
_.sortBy = _.sort(_.comparer(_));

// composed functions
_.flatmap = _.compose(_.flatten, _.map);
_.indexBy = _.compose(_.object, _.groupBy);
_.shuffle = _.sortBy(Math.random);
_.last = _.compose(_.head, _.slice(-1, 1));
_.find = _.compose(_.head, _.filter);
_.findLast = _.compose(_.tail, _.filter);
_.any = _.compose(_.exists, _.filter);
_.every = _.compose(_.not, _.exists, _.reject);
_.find = _.compose(_.head, _.filter);
_.findLast = _.compose(_.tail, _.filter);
_.findIndex = _.head(_.indexes(_)); //_.compose(_. _.takeUntil);
_.findLastIndex = _.compose(_.count, _.takeUntilLast);

_.contains = ac((item, source) => { return _.indexOf(item, source) > -1 });



// Object manipulation
_.pairs = ac(function* pairs(item) {
  for(var key in item) {
    if(!hasOwnProperty.call(item, key)) continue;
    yield [key, item[key]];
  }
})

_.pick = ac((names, item) => _.object(_.map(n => [n,item[n]], names)));

_.setValues = ac(function setValues(source, item) {
  for(var [k, v] of source) item[k] = v;
  return item;
})

_.clone = ac(function clone(item) {
  if(!_.isObject(item)) return item;
  return _.isArray(item) ? item.slice() : _.extend({}, item);
})


_.defaults = ac(function (dest, item) {
  return _.setValues(_.filter(([k,v]) => undefined === dest[k], _.pairs(item)), dest);
});

_.extend = ac((dest, item) => _.setValues(_.pairs(item), dest));
_.keys = _.compose(_.map(_.head), _.pairs);
_.values = _.compose(_.map(_.tail), _.pairs);

_.equal = ac(function(expected, value) { return value === expected; });

// tests
_.isObject = ac(v => v === Object(v));
_.isEmpty = _.compose(_.not, _.exists, _.pairs);
_.isBoolean = _.or(_.equal(true), _.equal(false));
_.has = ac((item, key) => hasOwnProperty.call(item, key));
_.isFinite = ac(isFinite);
_.isNaN = ac(isNaN);
_.isNull = _.equal(null);
_.isUndefined = _.equal(undefined);

for(var k of [Array, Function, String, Number, Date, RegExp]) {
  _['is' + k.name] = ((constructor) => ac((obj) => obj && obj.constructor === constructor))(k);
}

module.exports = exports = _;

