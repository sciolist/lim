
module.exports = function createCourier(pending) {
  if(arguments.length === 0) pending = {};
  return function Courier(fn, opts) {
    if(!opts) {
      opts = {};
      opts.prefix = [for (i of Array(fn.length)) placeholder];
      opts.remain = opts.prefix.length;
      opts.nestedRemain = 0;
    }

    function courier() {
      return courier.complete(slice.call(arguments));
    }

    courier.complete = function complete(input) {
      var rest = courier.fill(input);
      if(rest.remain || rest.nestedRemain) return rest;
      return rest.invoke();
    }

    courier.remain = opts.remain;
    courier.nestedRemain = opts.nestedRemain;

    courier.invoke = function invoke() {
      return fn.apply(this, opts.prefix);
    }

    courier.fill = function fill(input) {
      var prefix = opts.prefix.slice(), remain = 0, nestedRemain = 0;

      function getPending(i) {
        var value = prefix[i];
        if (value === placeholder || value === pending) return true;
        if (!value || value.name !== 'courier') return false;

        var rest = value.complete(input.splice(0, value.nestedRemain));
        if (rest && rest.name === 'courier') nestedRemain += rest.nestedRemain;
        prefix[i] = rest;
        return false;
      }

      for(var i=0; i<prefix.length; ++i) {
        remain += 1;
        var isPending = getPending(i);
        if (isPending) {
          if (input.length) prefix[i] = input.shift();
        }
        if(prefix[i] === pending) nestedRemain += 1;
        else if(!getPending(i)) remain -= 1;
      }

      return Courier(fn, { prefix: prefix, remain: remain, nestedRemain: nestedRemain });
    }

    return courier;
  }

}
