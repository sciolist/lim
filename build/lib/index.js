var hasOwnProperty = Object.hasOwnProperty;
var slice = Array.prototype.slice;
var ac = require('./utils/courier')(_);
module.exports = exports = _;
var $ = _;
function _(source, pending) {
    function chain() {
        if (!pending)
            throw new Error('no pending function!');
        return pending.call(this, slice.call(arguments));
    }
    chain.source = source;
    chain.courierCall = function courierCall(wrap, wip, args) {
        return pending(args);
        function pending(args) {
            wip = wip.fill(args);
            if (wip.remain <= 1) {
                var result = wrap(wip.accept([source]));
                if (isIterator(result))
                    return _(result);
                return result;
            }
            return _(source, pending);
        }
    };
    chain.__proto__ = _;
    return chain;
}
function isIterator(v) {
    return v.next instanceof Function;
}
function isIterable(v) {
    return v.iterator instanceof Function || v.next instanceof Function || Array.isArray(v);
}
_.autocurry = _.ac = ac;
_.self = _.identity = function (v) {
    return v;
};
_.range = ac(function* range(start, stop) {
    if (start < stop)
        for (var i = start; i < stop; ++i)
            yield i;
    else
        for (var i = start - 1; i >= stop; --i)
            yield i;
});
_.exists = ac(function exists(source) {
    for (var $es6$it2 = source.iterator(), $es6$its3 = $es6$it2.next(), v;!$es6$its3.done;$es6$its3 = $es6$it2.next()) {
        v = $es6$its3.value;
        return true;
    }
    return false;
});
_.collect = ac(function collect(source) {
    var out = [];
    for (var $es6$it5 = source.iterator(), $es6$its6 = $es6$it5.next(), v;!$es6$its6.done;$es6$its6 = $es6$it5.next()) {
        v = $es6$its6.value;
        out.push(v);
    }
    return out;
});
_.tap = ac(function* tap(fn, source) {
    for (var $es6$it8 = source.iterator(), $es6$its9 = $es6$it8.next(), v;!$es6$its9.done;$es6$its9 = $es6$it8.next()) {
        v = $es6$its9.value;
        fn(v);
        yield v;
    }
});
_.each = ac(function each(cb, source) {
    for (var $es6$it11 = source.iterator(), $es6$its12 = $es6$it11.next(), v;!$es6$its12.done;$es6$its12 = $es6$it11.next()) {
        v = $es6$its12.value;
        cb(v);
    }
});
_.head = ac(function head(source) {
    for (var $es6$it14 = source.iterator(), $es6$its15 = $es6$it14.next(), v;!$es6$its15.done;$es6$its15 = $es6$it14.next()) {
        v = $es6$its15.value;
        return v;
    }
});
_.iterate = ac(function* iterate(source) {
    for (var $es6$it17 = source.iterator(), $es6$its18 = $es6$it17.next(), v;!$es6$its18.done;$es6$its18 = $es6$it17.next()) {
        v = $es6$its18.value;
        yield v;
    }
});
_.map = ac(function* map(fn, source) {
    for (var $es6$it20 = source.iterator(), $es6$its21 = $es6$it20.next(), v;!$es6$its21.done;$es6$its21 = $es6$it20.next()) {
        v = $es6$its21.value;
        yield fn(v);
    }
});
_.filter = ac(function* filter(fn, source) {
    for (var $es6$it23 = source.iterator(), $es6$its24 = $es6$it23.next(), v;!$es6$its24.done;$es6$its24 = $es6$it23.next()) {
        v = $es6$its24.value;
        if (fn(v))
            yield v;
    }
});
_.setValues = ac(function setValues(source, item) {
    for (var $es6$it26 = source.iterator(), $es6$its27 = $es6$it26.next(), kv;!$es6$its27.done;$es6$its27 = $es6$it26.next()) {
        kv = $es6$its27.value;
        item[kv[0]] = kv[1];
    }
    return item;
});
_.reduce = ac(function reduce(seed, fn, source) {
    for (var $es6$it29 = source.iterator(), $es6$its30 = $es6$it29.next(), v;!$es6$its30.done;$es6$its30 = $es6$it29.next()) {
        v = $es6$its30.value;
        seed = fn(seed, v);
    }
    return seed;
});
_.reverse = ac(function* reverse(source) {
    var arr = [];
    for (var $es6$it32 = source.iterator(), $es6$its33 = $es6$it32.next(), v;!$es6$its33.done;$es6$its33 = $es6$it32.next()) {
        v = $es6$its33.value;
        arr.push(v);
    }
    while (arr.length)
        yield arr.pop();
});
_.slice = ac(function* slice(start, length, source) {
    if (start < 0) {
        source = _.toArray(source);
        start = source.length + start;
    }
    var i = 0, end = length === -1 ? Number.MAX_VALUE : start + length;
    for (var $es6$it35 = source.iterator(), $es6$its36 = $es6$it35.next(), v;!$es6$its36.done;$es6$its36 = $es6$it35.next()) {
        v = $es6$its36.value;
        if (i >= start && i < end)
            yield v;
        if (i >= end)
            break;
        i += 1;
    }
});
_.takeUntil = ac(function* takeUntil(fn, source) {
    for (var $es6$it38 = source.iterator(), $es6$its39 = $es6$it38.next(), v;!$es6$its39.done;$es6$its39 = $es6$it38.next()) {
        v = $es6$its39.value;
        yield v;
        if (fn(v))
            break;
    }
});
_.takeUntilLast = ac(function* takeUntilLast(fn, source) {
    var arr = [];
    for (var $es6$it41 = source.iterator(), $es6$its42 = $es6$it41.next(), v;!$es6$its42.done;$es6$its42 = $es6$it41.next()) {
        v = $es6$its42.value;
        arr.push(v);
        if (!fn(v))
            continue;
        for (var $es6$it44 = arr.iterator(), $es6$its45 = $es6$it44.next(), vv;!$es6$its45.done;$es6$its45 = $es6$it44.next()) {
            vv = $es6$its45.value;
            yield vv;
        }
        arr.length = 0;
    }
});
_.flatten = ac(function* flatten(source) {
    for (var $es6$it47 = source.iterator(), $es6$its48 = $es6$it47.next(), v;!$es6$its48.done;$es6$its48 = $es6$it47.next()) {
        v = $es6$its48.value;
        if (!isIterable(v))
            yield v;
        else
            for (var $es6$it50 = v.iterator(), $es6$its51 = $es6$it50.next(), vv;!$es6$its51.done;$es6$its51 = $es6$it50.next()) {
                vv = $es6$its51.value;
                yield vv;
            }
    }
});
_.comparer = ac(function comparer(fn) {
    return function comparison(item1, item2) {
        var value1 = fn(item1), value2 = fn(item2);
        return value1 == value2 ? 0 : value1 < value2 ? -1 : 1;
    };
});
_.sort = ac(function* sort(cmp, source) {
    var arr = [];
    for (var $es6$it53 = source.iterator(), $es6$its54 = $es6$it53.next(), item;!$es6$its54.done;$es6$its54 = $es6$it53.next()) {
        item = $es6$its54.value;
        arr.push(item);
        var i, j = arr.length - 1;
        for (var i = arr.length - 1, j;; i = j) {
            j = Math.ceil(i / 2) - 1;
            if (j < 0 || cmp(arr[j], arr[i]) <= 0)
                break;
            [
                arr[j],
                arr[i]
            ] = [
                arr[i],
                arr[j]
            ];
        }
    }
    while (arr.length) {
        yield arr[0];
        if (arr.length === 1)
            break;
        arr[0] = arr.pop();
        for (var i = 0, lower = 0;; i = lower) {
            var left = 2 * i + 1, right = left + 1;
            if (left < arr.length && cmp(arr[left], arr[i]) < 0)
                lower = left;
            if (right < arr.length && cmp(arr[right], arr[lower]) < 0)
                lower = right;
            if (i === lower)
                break;
            [
                arr[lower],
                arr[i]
            ] = [
                arr[i],
                arr[lower]
            ];
        }
    }
});
_.wrap = ac(function (wrapper, fn) {
    return function () {
        return wrapper.apply(this, [
            fn,
            arguments
        ]);
    };
});
_.withObject = _.reduce($, _.wrap(function (fn, kv) {
    return fn(kv[0], kv[1]), kv[0];
}, $));
_.groupBy = ac(function groupBy(fn, source) {
    return _.withObject({}, function (d, kv) {
        (d[kv[0]] || (d[kv[0]] = [])).push(v);
    }, _.map(function (k) {
        return [
            fn(kv[0]),
            kv[0]
        ];
    }, source));
});
_.zip = ac(function* zip(source1, source2) {
    var a = _.iterate(source1), b = _.iterate(source2);
    while (true) {
        var av = a.next(), bv = b.next();
        if (av.done || bv.done)
            break;
        yield [
            av.value,
            bv.value
        ];
    }
});
_.indexes = ac(function* indexes(fn, source) {
    var i = 0;
    for (var $es6$it56 = source.iterator(), $es6$its57 = $es6$it56.next(), k;!$es6$its57.done;$es6$its57 = $es6$it56.next()) {
        k = $es6$its57.value;
        if (fn(k))
            yield i;
        ++i;
    }
});
_.pairs = ac(function* pairs(item) {
    for (var key in item) {
        if (!hasOwnProperty.call(item, key))
            continue;
        yield [
            key,
            item[key]
        ];
    }
});
_.or = ac(function or(fn1, fn2, value) {
    return fn1(value) || fn2(value);
});
_.and = ac(function and(fn1, fn2, value) {
    return fn1(value) && fn2(value);
});
_.not = ac(function not(v) {
    return !v;
});
_.yes = _.true = ac(function yes() {
    return true;
});
_.no = _.false = ac(function no() {
    return true;
});
_.invert = ac(function invert(fn) {
    return function () {
        return !fn.apply(this, arguments);
    };
});
_.equal = ac(function (expected, value) {
    return value === expected;
});
_.gt = ac(function (y, x) {
    return x > y;
});
_.reject = _.filter(_.invert($), $);
_.reduceRight = _.reduce($, $, _.reverse($));
_.object = ac(function (v) {
    return _.setValues(v, {});
});
_.count = _.reduce(0, function (sum, i) {
    return sum + 1;
});
_.sum = _.reduce(0, function (sum, i) {
    return sum + i;
});
_.max = _.reduce(0, Math.max);
_.min = _.reduce(0, Math.min);
_.compact = _.filter(function (v) {
    return !!v;
});
_.tail = _.slice(1, -1);
_.take = _.slice(0);
_.skip = _.slice($, -1, $);
_.sortBy = _.sort(_.comparer($));
_.debug = _.tap;
_.first = _.head;
_.toArray = _.collect;
_.flatmap = _.flatten(_.map($, $));
_.indexBy = _.object(_.groupBy($));
_.shuffle = _.sortBy(Math.random);
_.last = _.head(_.slice(-1, 1, $));
_.find = _.head(_.filter($, $));
_.findLast = _.tail(_.filter($, $));
_.any = _.exists(_.filter($, $));
_.every = _.not(_.exists(_.reject($, $)));
_.find = _.head(_.filter($, $));
_.findLast = _.tail(_.filter($, $));
_.findIndex = _.head(_.indexes($, $));
_.indexOf = _.findIndex(_.equal($), $);
_.contains = _.gt(-1, _.indexOf($, $));
_.findLastIndex = _.tail(_.indexes($, $));
_.lastIndexOf = _.findLastIndex(_.equal($), $);
_.keys = _.map(_.head(_.pairs($)));
_.values = _.map(_.tail(_.pairs($)));
_.isObject = ac(function (v) {
    return v === Object(v);
});
_.isEmpty = _.not(_.exists(_.pairs($)));
_.isBoolean = _.or(_.equal(true), _.equal(false));
_.has = ac(function (item, key) {
    return hasOwnProperty.call(item, key);
});
_.isFinite = ac(isFinite);
_.isNaN = ac(isNaN);
_.isNull = _.equal(null);
_.isUndefined = _.equal(undefined);
[
    Array,
    Function,
    String,
    Number,
    Date,
    RegExp
].forEach(function (constructor) {
    _['is' + constructor.name] = ac(function (obj) {
        return obj && obj.constructor === constructor;
    });
});
_.pick = ac(function (names, item) {
    return _.object(_.map(function (n) {
        return [
            n,
            item[n]
        ];
    }, names));
});
_.pluck = ac(function (propertyName, source) {
    return source[propertyName];
});
_.clone = ac(function clone(item) {
    if (!_.isObject(item))
        return item;
    return _.isArray(item) ? item.slice() : _.extend({}, item);
});
_.defaults = ac(function defaults(dest, item) {
    return _.setValues(_.filter(function () {
        return undefined === dest[k];
    }, _.pairs(item)), dest);
});
_.extend = ac(function (dest, item) {
    return _.setValues(_.pairs(item), dest);
});