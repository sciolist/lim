var placeholder = {};
var toString = Object.prototype.toString;
var slice = Array.prototype.slice;
module.exports = function createCourier(pending) {
  if (arguments.length === 0) pending = {};
  function hasCourier(value) {
    return value && (value.courier instanceof Courier);
  }
  function Courier(fn, opts) {
    if (!opts) opts = {};
    this.wrapped = fn;
    this.name = opts.name || fn.name;
    this.surplus = opts.surplus || [];
    this.nestedRemain = opts.nestedRemain || 0;
    this.remain = opts.remain || 0;
    if (!opts.prefix) {
      this.prefix = Array(fn.length);
      for (var i = 0; i < fn.length; ++i) {
        this.prefix[i] = placeholder;
      }
      this.remain = this.prefix.length;
    } else {
      this.prefix = slice.call(opts.prefix);
    }
  }
  Courier.prototype.accept = function accept(input) {
    var rest = this.fill(input);
    if (rest.remain || rest.nestedRemain) {
      return rest;
    }
    var result = rest.invoke();
    if (result instanceof Courier) {
      return result.courier.accept(this.surplus);
    }
    return result;
  };
  Courier.prototype.invoke = function invoke() {
    return this.wrapped.apply(null, this.prefix);
  };
  Courier.prototype.fill = function fill(input) {
    var prefix = this.prefix.slice(), remain = 0, nestedRemain = 0;
    for (var i = 0; i < prefix.length; ++i) {
      if (!input.length) break;
      if (prefix[i] === placeholder) prefix[i] = input.shift(); else if (prefix[i] === pending) prefix[i] = input.shift(); else if (hasCourier(prefix[i])) {
        var inner = prefix[i].courier;
        prefix[i] = wrap(inner.accept(input.splice(0, inner.nestedRemain)));
      }
    }
    for (var i = 0; i < prefix.length; ++i) {
      if (prefix[i] === placeholder) {
        remain += 1;
      } else if (prefix[i] === pending) {
        remain += 1;
        nestedRemain += 1;
      } else if (hasCourier(prefix[i])) {
        nestedRemain += prefix[i].courier.nestedRemain;
      }
    }
    return new Courier(this.wrapped, {
      name: this.name,
      prefix: prefix,
      remain: remain,
      nestedRemain: nestedRemain,
      surplus: input
    });
  };
  function debug(nowrap) {
    var out = [];
    var courier = this.courier;
    for (var i = 0; i < courier.prefix.length; ++i) {
      var value = courier.prefix[i];
      if (value === pending) out.push('$');
      if (value === placeholder) out.push('$'); else if (hasCourier(value)) out.push(debug.call(value, true)); else if (value instanceof Function) out.push('fn'); else out.push(JSON.stringify(value));
    }
    var params = '(' + out.join(',') + ')';
    if (nowrap === true) return params;
    return '[Courier ' + params + ']';
  }
  function wrap(courier) {
    if (!(courier instanceof Courier)) return courier;
    function result() {
      if (this && this.courierCall) {
        return this.courierCall(wrap, courier, slice.call(arguments));
      }
      return wrap(courier.accept(slice.call(arguments)));
    }
    result.inspect = debug;
    result.courier = courier;
    return result;
  }
  function courier(fn) {
    return wrap.call(this, new Courier(fn, {}));
  }
  courier.hasCourier = hasCourier;
  return courier;
};

//@ sourceMappingURL=courier.map