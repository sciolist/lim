var $__generatorWrap = function(generator) {
  return $traceurRuntime.addIterator({
    next: function(x) {
      switch (generator.GState) {
        case 1:
          throw new Error('"next" on executing generator');
        case 3:
          throw new Error('"next" on closed generator');
        case 0:
          if (x !== undefined) {
            throw new TypeError('Sent value to newborn generator');
          }
        case 2:
          generator.GState = 1;
          if (generator.moveNext(x, 0)) {
            generator.GState = 2;
            return {
              value: generator.current,
              done: false
            };
          }
          generator.GState = 3;
          return {
            value: generator.yieldReturn,
            done: true
          };
      }
    },
    'throw': function(x) {
      switch (generator.GState) {
        case 1:
          throw new Error('"throw" on executing generator');
        case 3:
          throw new Error('"throw" on closed generator');
        case 0:
          generator.GState = 3;
          throw x;
        case 2:
          generator.GState = 1;
          if (generator.moveNext(x, 1)) {
            generator.GState = 2;
            return {
              value: generator.current,
              done: false
            };
          }
          generator.GState = 3;
          return {
            value: generator.yieldReturn,
            done: true
          };
      }
    }
  });
};
var hasOwnProperty = Object.hasOwnProperty;
var slice = Array.prototype.slice;
var ac = require('./utils/courier')(_);
module.exports = exports = _;
var $ = _;
function _(source, pending) {
  function chain() {
    if (!pending) throw new Error("no pending function!");
    return pending.call(this, slice.call(arguments));
  }
  chain.source = source;
  chain.courierCall = function courierCall(wrap, wip, args) {
    return pending(args);
    function pending(args) {
      wip = wip.fill(args);
      if (wip.remain <= 1) {
        var result = wrap(wip.accept([source]));
        if (isIterator(result)) return _(result);
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
return;
_.self = _.identity = (function(v) {
  return v;
});
_.range = ac(function range(start, stop) {
  var $that = this;
  var $arguments = arguments;
  var $state = 14;
  var $storedException;
  var $finallyFallThrough;
  var i;
  var $G = {
    GState: 0,
    current: undefined,
    yieldReturn: undefined,
    innerFunction: function($yieldSent, $yieldAction) {
      while (true) switch ($state) {
        case 14:
          if (start < stop) {
            $state = 5;
            break;
          } else {
            $state = 12;
            break;
          }
        case 5:
          i = start;
          $state = 4;
          break;
        case 4:
          if (i < stop) {
            $state = 0;
            break;
          } else {
            $state = 6;
            break;
          }
        case 3:
          ++i;
          $state = 4;
          break;
        case 0:
          this.current = i;
          $state = 1;
          return true;
        case 1:
          if ($yieldAction == 1) {
            $yieldAction = 0;
            throw $yieldSent;
          }
          $state = 3;
          break;
        case 12:
          i = start - 1;
          $state = 11;
          break;
        case 11:
          if (i >= stop) {
            $state = 7;
            break;
          } else {
            $state = 6;
            break;
          }
        case 10:
          --i;
          $state = 11;
          break;
        case 7:
          this.current = i;
          $state = 8;
          return true;
        case 8:
          if ($yieldAction == 1) {
            $yieldAction = 0;
            throw $yieldSent;
          }
          $state = 10;
          break;
        case 6:
          $state = -2;
        case -2:
          return false;
        case -3:
          throw $storedException;
        default:
          throw "traceur compiler bug: invalid state in state machine" + $state;
      }
    },
    moveNext: function($yieldSent, $yieldAction) {
      while (true) try {
        return this.innerFunction($yieldSent, $yieldAction);
      } catch ($caughtException) {
        $storedException = $caughtException;
        switch ($state) {
          default:
            this.GState = 3;
            $state = -2;
            throw $storedException;
        }
      }
    }
  };
  return $__generatorWrap($G);
});
_.exists = ac(function exists(source) {
  for (var $__0 = $traceurRuntime.getIterator(source), $__1; !($__1 = $__0.next()).done;) {
    var v = $__1.value;
    return true;
  }
  return false;
});
_.collect = ac(function collect(source) {
  var out = [];
  for (var $__1 = $traceurRuntime.getIterator(source), $__0; !($__0 = $__1.next()).done;) {
    var v = $__0.value;
    out.push(v);
  }
  return out;
});
_.tap = ac(function tap(fn, source) {
  var $that = this;
  var $arguments = arguments;
  var $state = 8;
  var $storedException;
  var $finallyFallThrough;
  var $__0;
  var $__1;
  var v;
  var $G = {
    GState: 0,
    current: undefined,
    yieldReturn: undefined,
    innerFunction: function($yieldSent, $yieldAction) {
      while (true) switch ($state) {
        case 8:
          $__0 = $traceurRuntime.getIterator(source);
          $state = 3;
          break;
        case 3:
          if (!($__1 = $__0.next()).done) {
            $state = 6;
            break;
          } else {
            $state = 9;
            break;
          }
        case 6:
          v = $__1.value;
          $state = 7;
          break;
        case 7:
          fn(v);
          $state = 5;
          break;
        case 5:
          this.current = v;
          $state = 1;
          return true;
        case 1:
          if ($yieldAction == 1) {
            $yieldAction = 0;
            throw $yieldSent;
          }
          $state = 3;
          break;
        case 9:
          $state = -2;
        case -2:
          return false;
        case -3:
          throw $storedException;
        default:
          throw "traceur compiler bug: invalid state in state machine" + $state;
      }
    },
    moveNext: function($yieldSent, $yieldAction) {
      while (true) try {
        return this.innerFunction($yieldSent, $yieldAction);
      } catch ($caughtException) {
        $storedException = $caughtException;
        switch ($state) {
          default:
            this.GState = 3;
            $state = -2;
            throw $storedException;
        }
      }
    }
  };
  return $__generatorWrap($G);
});
_.each = ac(function each(cb, source) {
  for (var $__1 = $traceurRuntime.getIterator(source), $__0; !($__0 = $__1.next()).done;) {
    var v = $__0.value;
    cb(v);
  }
});
_.head = ac(function head(source) {
  for (var $__0 = $traceurRuntime.getIterator(source), $__1; !($__1 = $__0.next()).done;) {
    var v = $__1.value;
    return v;
  }
});
_.iterate = ac(function iterate(source) {
  var $that = this;
  var $arguments = arguments;
  var $state = 6;
  var $storedException;
  var $finallyFallThrough;
  var $__0;
  var $__1;
  var v;
  var $G = {
    GState: 0,
    current: undefined,
    yieldReturn: undefined,
    innerFunction: function($yieldSent, $yieldAction) {
      while (true) switch ($state) {
        case 6:
          $__1 = $traceurRuntime.getIterator(source);
          $state = 3;
          break;
        case 3:
          if (!($__0 = $__1.next()).done) {
            $state = 4;
            break;
          } else {
            $state = 7;
            break;
          }
        case 4:
          v = $__0.value;
          $state = 5;
          break;
        case 5:
          this.current = v;
          $state = 1;
          return true;
        case 1:
          if ($yieldAction == 1) {
            $yieldAction = 0;
            throw $yieldSent;
          }
          $state = 3;
          break;
        case 7:
          $state = -2;
        case -2:
          return false;
        case -3:
          throw $storedException;
        default:
          throw "traceur compiler bug: invalid state in state machine" + $state;
      }
    },
    moveNext: function($yieldSent, $yieldAction) {
      while (true) try {
        return this.innerFunction($yieldSent, $yieldAction);
      } catch ($caughtException) {
        $storedException = $caughtException;
        switch ($state) {
          default:
            this.GState = 3;
            $state = -2;
            throw $storedException;
        }
      }
    }
  };
  return $__generatorWrap($G);
});
_.map = ac(function map(fn, source) {
  var $that = this;
  var $arguments = arguments;
  var $state = 6;
  var $storedException;
  var $finallyFallThrough;
  var $__0;
  var $__1;
  var v;
  var $G = {
    GState: 0,
    current: undefined,
    yieldReturn: undefined,
    innerFunction: function($yieldSent, $yieldAction) {
      while (true) switch ($state) {
        case 6:
          $__0 = $traceurRuntime.getIterator(source);
          $state = 3;
          break;
        case 3:
          if (!($__1 = $__0.next()).done) {
            $state = 4;
            break;
          } else {
            $state = 7;
            break;
          }
        case 4:
          v = $__1.value;
          $state = 5;
          break;
        case 5:
          this.current = fn(v);
          $state = 1;
          return true;
        case 1:
          if ($yieldAction == 1) {
            $yieldAction = 0;
            throw $yieldSent;
          }
          $state = 3;
          break;
        case 7:
          $state = -2;
        case -2:
          return false;
        case -3:
          throw $storedException;
        default:
          throw "traceur compiler bug: invalid state in state machine" + $state;
      }
    },
    moveNext: function($yieldSent, $yieldAction) {
      while (true) try {
        return this.innerFunction($yieldSent, $yieldAction);
      } catch ($caughtException) {
        $storedException = $caughtException;
        switch ($state) {
          default:
            this.GState = 3;
            $state = -2;
            throw $storedException;
        }
      }
    }
  };
  return $__generatorWrap($G);
});
_.filter = ac(function filter(fn, source) {
  var $that = this;
  var $arguments = arguments;
  var $state = 7;
  var $storedException;
  var $finallyFallThrough;
  var $__0;
  var $__1;
  var v;
  var $G = {
    GState: 0,
    current: undefined,
    yieldReturn: undefined,
    innerFunction: function($yieldSent, $yieldAction) {
      while (true) switch ($state) {
        case 7:
          $__1 = $traceurRuntime.getIterator(source);
          $state = 3;
          break;
        case 3:
          if (!($__0 = $__1.next()).done) {
            $state = 5;
            break;
          } else {
            $state = 8;
            break;
          }
        case 5:
          v = $__0.value;
          $state = 6;
          break;
        case 6:
          if (fn(v)) {
            $state = 0;
            break;
          } else {
            $state = 3;
            break;
          }
        case 0:
          this.current = v;
          $state = 1;
          return true;
        case 1:
          if ($yieldAction == 1) {
            $yieldAction = 0;
            throw $yieldSent;
          }
          $state = 3;
          break;
        case 8:
          $state = -2;
        case -2:
          return false;
        case -3:
          throw $storedException;
        default:
          throw "traceur compiler bug: invalid state in state machine" + $state;
      }
    },
    moveNext: function($yieldSent, $yieldAction) {
      while (true) try {
        return this.innerFunction($yieldSent, $yieldAction);
      } catch ($caughtException) {
        $storedException = $caughtException;
        switch ($state) {
          default:
            this.GState = 3;
            $state = -2;
            throw $storedException;
        }
      }
    }
  };
  return $__generatorWrap($G);
});
_.setValues = ac(function setValues(source, item) {
  for (var $__0 = $traceurRuntime.getIterator(source), $__1; !($__1 = $__0.next()).done;) {
    var kv = $__1.value;
    item[kv[0]] = kv[1];
  }
  return item;
});
_.reduce = ac(function reduce(seed, fn, source) {
  for (var $__1 = $traceurRuntime.getIterator(source), $__0; !($__0 = $__1.next()).done;) {
    var v = $__0.value;
    {
      seed = fn(seed, v);
    }
  }
  return seed;
});
_.reverse = ac(function reverse(source) {
  var $that = this;
  var $arguments = arguments;
  var $state = 5;
  var $storedException;
  var $finallyFallThrough;
  var $__0;
  var $__1;
  var arr;
  var v;
  var $G = {
    GState: 0,
    current: undefined,
    yieldReturn: undefined,
    innerFunction: function($yieldSent, $yieldAction) {
      while (true) switch ($state) {
        case 5:
          arr = [];
          $state = 6;
          break;
        case 6:
          for ($__0 = $traceurRuntime.getIterator(source); !($__1 = $__0.next()).done;) {
            v = $__1.value;
            arr.push(v);
          }
          $state = 8;
          break;
        case 8:
          if (arr.length) {
            $state = 0;
            break;
          } else {
            $state = 4;
            break;
          }
        case 0:
          this.current = arr.pop();
          $state = 1;
          return true;
        case 1:
          if ($yieldAction == 1) {
            $yieldAction = 0;
            throw $yieldSent;
          }
          $state = 8;
          break;
        case 4:
          $state = -2;
        case -2:
          return false;
        case -3:
          throw $storedException;
        default:
          throw "traceur compiler bug: invalid state in state machine" + $state;
      }
    },
    moveNext: function($yieldSent, $yieldAction) {
      while (true) try {
        return this.innerFunction($yieldSent, $yieldAction);
      } catch ($caughtException) {
        $storedException = $caughtException;
        switch ($state) {
          default:
            this.GState = 3;
            $state = -2;
            throw $storedException;
        }
      }
    }
  };
  return $__generatorWrap($G);
});
_.slice = ac(function slice(start, length, source) {
  var $that = this;
  var $arguments = arguments;
  var $state = 14;
  var $storedException;
  var $finallyFallThrough;
  var $__0;
  var $__1;
  var end;
  var i;
  var v;
  var $G = {
    GState: 0,
    current: undefined,
    yieldReturn: undefined,
    innerFunction: function($yieldSent, $yieldAction) {
      while (true) switch ($state) {
        case 14:
          if (start < 0) {
            source = _.toArray(source);
            start = source.length + start;
          }
          $state = 15;
          break;
        case 15:
          i = 0, end = length === - 1 ? Number.MAX_VALUE: start + length;
          $state = 17;
          break;
        case 17:
          $__1 = $traceurRuntime.getIterator(source);
          $state = 9;
          break;
        case 9:
          if (!($__0 = $__1.next()).done) {
            $state = 10;
            break;
          } else {
            $state = 13;
            break;
          }
        case 10:
          v = $__0.value;
          $state = 11;
          break;
        case 11:
          if (i >= start && i < end) {
            $state = 0;
            break;
          } else {
            $state = 3;
            break;
          }
        case 0:
          this.current = v;
          $state = 1;
          return true;
        case 1:
          if ($yieldAction == 1) {
            $yieldAction = 0;
            throw $yieldSent;
          }
          $state = 3;
          break;
        case 3:
          if (i >= end) {
            $state = 13;
            break;
          } else {
            $state = 6;
            break;
          }
        case 6:
          i += 1;
          $state = 9;
          break;
        case 13:
          $state = -2;
        case -2:
          return false;
        case -3:
          throw $storedException;
        default:
          throw "traceur compiler bug: invalid state in state machine" + $state;
      }
    },
    moveNext: function($yieldSent, $yieldAction) {
      while (true) try {
        return this.innerFunction($yieldSent, $yieldAction);
      } catch ($caughtException) {
        $storedException = $caughtException;
        switch ($state) {
          default:
            this.GState = 3;
            $state = -2;
            throw $storedException;
        }
      }
    }
  };
  return $__generatorWrap($G);
});
_.takeUntil = ac(function takeUntil(fn, source) {
  var $that = this;
  var $arguments = arguments;
  var $state = 9;
  var $storedException;
  var $finallyFallThrough;
  var $__0;
  var $__1;
  var v;
  var $G = {
    GState: 0,
    current: undefined,
    yieldReturn: undefined,
    innerFunction: function($yieldSent, $yieldAction) {
      while (true) switch ($state) {
        case 9:
          $__0 = $traceurRuntime.getIterator(source);
          $state = 5;
          break;
        case 5:
          if (!($__1 = $__0.next()).done) {
            $state = 7;
            break;
          } else {
            $state = 10;
            break;
          }
        case 7:
          v = $__1.value;
          $state = 8;
          break;
        case 8:
          this.current = v;
          $state = 1;
          return true;
        case 1:
          if ($yieldAction == 1) {
            $yieldAction = 0;
            throw $yieldSent;
          }
          $state = 3;
          break;
        case 3:
          if (fn(v)) {
            $state = 10;
            break;
          } else {
            $state = 5;
            break;
          }
        case 10:
          $state = -2;
        case -2:
          return false;
        case -3:
          throw $storedException;
        default:
          throw "traceur compiler bug: invalid state in state machine" + $state;
      }
    },
    moveNext: function($yieldSent, $yieldAction) {
      while (true) try {
        return this.innerFunction($yieldSent, $yieldAction);
      } catch ($caughtException) {
        $storedException = $caughtException;
        switch ($state) {
          default:
            this.GState = 3;
            $state = -2;
            throw $storedException;
        }
      }
    }
  };
  return $__generatorWrap($G);
});
_.takeUntilLast = ac(function takeUntilLast(fn, source) {
  var $that = this;
  var $arguments = arguments;
  var $state = 19;
  var $storedException;
  var $finallyFallThrough;
  var $__0;
  var $__1;
  var $__2;
  var $__3;
  var arr;
  var v;
  var vv;
  var $G = {
    GState: 0,
    current: undefined,
    yieldReturn: undefined,
    innerFunction: function($yieldSent, $yieldAction) {
      while (true) switch ($state) {
        case 19:
          arr = [];
          $state = 20;
          break;
        case 20:
          $__2 = $traceurRuntime.getIterator(source);
          $state = 14;
          break;
        case 14:
          if (!($__3 = $__2.next()).done) {
            $state = 15;
            break;
          } else {
            $state = 18;
            break;
          }
        case 15:
          v = $__3.value;
          $state = 16;
          break;
        case 16:
          arr.push(v);
          $state = 9;
          break;
        case 9:
          if (!fn(v)) {
            $state = 14;
            break;
          } else {
            $state = 11;
            break;
          }
        case 11:
          $__1 = $traceurRuntime.getIterator(arr);
          $state = 3;
          break;
        case 3:
          if (!($__0 = $__1.next()).done) {
            $state = 4;
            break;
          } else {
            $state = 7;
            break;
          }
        case 4:
          vv = $__0.value;
          $state = 5;
          break;
        case 5:
          this.current = vv;
          $state = 1;
          return true;
        case 1:
          if ($yieldAction == 1) {
            $yieldAction = 0;
            throw $yieldSent;
          }
          $state = 3;
          break;
        case 7:
          arr.length = 0;
          $state = 14;
          break;
        case 18:
          $state = -2;
        case -2:
          return false;
        case -3:
          throw $storedException;
        default:
          throw "traceur compiler bug: invalid state in state machine" + $state;
      }
    },
    moveNext: function($yieldSent, $yieldAction) {
      while (true) try {
        return this.innerFunction($yieldSent, $yieldAction);
      } catch ($caughtException) {
        $storedException = $caughtException;
        switch ($state) {
          default:
            this.GState = 3;
            $state = -2;
            throw $storedException;
        }
      }
    }
  };
  return $__generatorWrap($G);
});
_.flatten = ac(function flatten(source) {
  var $that = this;
  var $arguments = arguments;
  var $state = 15;
  var $storedException;
  var $finallyFallThrough;
  var $__0;
  var $__1;
  var $__2;
  var $__3;
  var v;
  var vv;
  var $G = {
    GState: 0,
    current: undefined,
    yieldReturn: undefined,
    innerFunction: function($yieldSent, $yieldAction) {
      while (true) switch ($state) {
        case 15:
          $__0 = $traceurRuntime.getIterator(source);
          $state = 3;
          break;
        case 3:
          if (!($__1 = $__0.next()).done) {
            $state = 13;
            break;
          } else {
            $state = 16;
            break;
          }
        case 13:
          v = $__1.value;
          $state = 14;
          break;
        case 14:
          if (!isIterable(v)) {
            $state = 0;
            break;
          } else {
            $state = 10;
            break;
          }
        case 0:
          this.current = v;
          $state = 1;
          return true;
        case 1:
          if ($yieldAction == 1) {
            $yieldAction = 0;
            throw $yieldSent;
          }
          $state = 3;
          break;
        case 10:
          $__3 = $traceurRuntime.getIterator(v);
          $state = 7;
          break;
        case 7:
          if (!($__2 = $__3.next()).done) {
            $state = 8;
            break;
          } else {
            $state = 3;
            break;
          }
        case 8:
          vv = $__2.value;
          $state = 9;
          break;
        case 9:
          this.current = vv;
          $state = 5;
          return true;
        case 5:
          if ($yieldAction == 1) {
            $yieldAction = 0;
            throw $yieldSent;
          }
          $state = 7;
          break;
        case 16:
          $state = -2;
        case -2:
          return false;
        case -3:
          throw $storedException;
        default:
          throw "traceur compiler bug: invalid state in state machine" + $state;
      }
    },
    moveNext: function($yieldSent, $yieldAction) {
      while (true) try {
        return this.innerFunction($yieldSent, $yieldAction);
      } catch ($caughtException) {
        $storedException = $caughtException;
        switch ($state) {
          default:
            this.GState = 3;
            $state = -2;
            throw $storedException;
        }
      }
    }
  };
  return $__generatorWrap($G);
});
_.comparer = ac(function comparer(fn) {
  return function comparison(item1, item2) {
    var value1 = fn(item1), value2 = fn(item2);
    return value1 == value2 ? 0: (value1 < value2 ? - 1: 1);
  };
});
_.sort = ac(function sort(cmp, source) {
  var $that = this;
  var $arguments = arguments;
  var $state = 12;
  var $storedException;
  var $finallyFallThrough;
  var $__0;
  var $__1;
  var $__4;
  var $__5;
  var arr;
  var i;
  var item;
  var j;
  var left;
  var lower;
  var right;
  var $G = {
    GState: 0,
    current: undefined,
    yieldReturn: undefined,
    innerFunction: function($yieldSent, $yieldAction) {
      while (true) switch ($state) {
        case 12:
          ;
          $state = 13;
          break;
        case 13:
          arr = [];
          $state = 15;
          break;
        case 15:
          for ($__1 = $traceurRuntime.getIterator(source); !($__0 = $__1.next()).done;) {
            item = $__0.value;
            {
              arr.push(item);
              j = arr.length - 1;
              for (i = arr.length - 1;; i = j) {
                j = Math.ceil(i / 2) - 1;
                if (j < 0 || cmp(arr[j], arr[i]) <= 0) break;
                {
                  ($__4 = [arr[i], arr[j]], arr[j] = $__4[0], arr[i] = $__4[1], $__4);
                  if ($yieldAction == 1) {
                    $yieldAction = 0;
                    throw $yieldSent;
                  }
                }
              }
            }
          }
          $state = 17;
          break;
        case 17:
          if (arr.length) {
            $state = 0;
            break;
          } else {
            $state = 11;
            break;
          }
        case 0:
          this.current = arr[0];
          $state = 1;
          return true;
        case 1:
          if ($yieldAction == 1) {
            $yieldAction = 0;
            throw $yieldSent;
          }
          $state = 3;
          break;
        case 3:
          if (arr.length === 1) {
            $state = 11;
            break;
          } else {
            $state = 5;
            break;
          }
        case 5:
          arr[0] = arr.pop();
          $state = 8;
          break;
        case 8:
          for (i = 0, lower = 0;; i = lower) {
            left = 2 * i + 1, right = left + 1;
            if (left < arr.length && cmp(arr[left], arr[i]) < 0) lower = left;
            if (right < arr.length && cmp(arr[right], arr[lower]) < 0) lower = right;
            if (i === lower) break;
            {
              ($__5 = [arr[i], arr[lower]], arr[lower] = $__5[0], arr[i] = $__5[1], $__5);
              if ($yieldAction == 1) {
                $yieldAction = 0;
                throw $yieldSent;
              }
            }
          }
          $state = 17;
          break;
        case 11:
          $state = -2;
        case -2:
          return false;
        case -3:
          throw $storedException;
        default:
          throw "traceur compiler bug: invalid state in state machine" + $state;
      }
    },
    moveNext: function($yieldSent, $yieldAction) {
      while (true) try {
        return this.innerFunction($yieldSent, $yieldAction);
      } catch ($caughtException) {
        $storedException = $caughtException;
        switch ($state) {
          default:
            this.GState = 3;
            $state = -2;
            throw $storedException;
        }
      }
    }
  };
  return $__generatorWrap($G);
});
_.wrap = ac((function(wrapper, fn) {
  return (function() {
    return wrapper.apply(this, [fn, arguments]);
  }).bind(this);
}).bind(this));
_.withObject = _.reduce($, _.wrap((function(fn, kv) {
  return (fn(kv[0], kv[1]), kv[0]);
}), $));
_.groupBy = ac(function groupBy(fn, source) {
  return _.withObject({}, (function(d, kv) {
    (d[kv[0]] || (d[kv[0]] = [])).push(v);
  }), _.map((function(k) {
    return [fn(kv[0]), kv[0]];
  }), source));
});
_.zip = ac(function zip(source1, source2) {
  var $that = this;
  var $arguments = arguments;
  var $state = 10;
  var $storedException;
  var $finallyFallThrough;
  var a;
  var av;
  var b;
  var bv;
  var $G = {
    GState: 0,
    current: undefined,
    yieldReturn: undefined,
    innerFunction: function($yieldSent, $yieldAction) {
      while (true) switch ($state) {
        case 10:
          a = _.iterate(source1), b = _.iterate(source2);
          $state = 11;
          break;
        case 11:
          if (true) {
            $state = 4;
            break;
          } else {
            $state = 9;
            break;
          }
        case 4:
          av = a.next(), bv = b.next();
          $state = 5;
          break;
        case 5:
          if (av.done || bv.done) {
            $state = 9;
            break;
          } else {
            $state = 7;
            break;
          }
        case 7:
          this.current = [av.value, bv.value];
          $state = 1;
          return true;
        case 1:
          if ($yieldAction == 1) {
            $yieldAction = 0;
            throw $yieldSent;
          }
          $state = 11;
          break;
        case 9:
          $state = -2;
        case -2:
          return false;
        case -3:
          throw $storedException;
        default:
          throw "traceur compiler bug: invalid state in state machine" + $state;
      }
    },
    moveNext: function($yieldSent, $yieldAction) {
      while (true) try {
        return this.innerFunction($yieldSent, $yieldAction);
      } catch ($caughtException) {
        $storedException = $caughtException;
        switch ($state) {
          default:
            this.GState = 3;
            $state = -2;
            throw $storedException;
        }
      }
    }
  };
  return $__generatorWrap($G);
});
_.indexes = ac(function indexes(fn, source) {
  var $that = this;
  var $arguments = arguments;
  var $state = 11;
  var $storedException;
  var $finallyFallThrough;
  var $__0;
  var $__1;
  var i;
  var k;
  var $G = {
    GState: 0,
    current: undefined,
    yieldReturn: undefined,
    innerFunction: function($yieldSent, $yieldAction) {
      while (true) switch ($state) {
        case 11:
          i = 0;
          $state = 12;
          break;
        case 12:
          $__0 = $traceurRuntime.getIterator(source);
          $state = 6;
          break;
        case 6:
          if (!($__1 = $__0.next()).done) {
            $state = 7;
            break;
          } else {
            $state = 10;
            break;
          }
        case 7:
          k = $__1.value;
          $state = 8;
          break;
        case 8:
          if (fn(k)) {
            $state = 0;
            break;
          } else {
            $state = 3;
            break;
          }
        case 0:
          this.current = i;
          $state = 1;
          return true;
        case 1:
          if ($yieldAction == 1) {
            $yieldAction = 0;
            throw $yieldSent;
          }
          $state = 3;
          break;
        case 3:
          ++i;
          $state = 6;
          break;
        case 10:
          $state = -2;
        case -2:
          return false;
        case -3:
          throw $storedException;
        default:
          throw "traceur compiler bug: invalid state in state machine" + $state;
      }
    },
    moveNext: function($yieldSent, $yieldAction) {
      while (true) try {
        return this.innerFunction($yieldSent, $yieldAction);
      } catch ($caughtException) {
        $storedException = $caughtException;
        switch ($state) {
          default:
            this.GState = 3;
            $state = -2;
            throw $storedException;
        }
      }
    }
  };
  return $__generatorWrap($G);
});
_.pairs = ac(function pairs(item) {
  var $that = this;
  var $arguments = arguments;
  var $state = 15;
  var $storedException;
  var $finallyFallThrough;
  var $__6;
  var $__7;
  var $__8;
  var $__9;
  var key;
  var $G = {
    GState: 0,
    current: undefined,
    yieldReturn: undefined,
    innerFunction: function($yieldSent, $yieldAction) {
      while (true) switch ($state) {
        case 15:
          $__6 = [];
          $state = 16;
          break;
        case 16:
          $__7 = item;
          $state = 18;
          break;
        case 18:
          for (var $__8 in $__7) $__6.push($__8);
          $state = 20;
          break;
        case 20:
          $__9 = 0;
          $state = 12;
          break;
        case 12:
          if ($__9 < $__6.length) {
            $state = 4;
            break;
          } else {
            $state = 14;
            break;
          }
        case 3:
          $__9++;
          $state = 12;
          break;
        case 4:
          key = $__6[$__9];
          $state = 5;
          break;
        case 5:
          if (!(key in $__7)) {
            $state = 3;
            break;
          } else {
            $state = 7;
            break;
          }
        case 7:
          if (!hasOwnProperty.call(item, key)) {
            $state = 3;
            break;
          } else {
            $state = 10;
            break;
          }
        case 10:
          this.current = [key, item[key]];
          $state = 1;
          return true;
        case 1:
          if ($yieldAction == 1) {
            $yieldAction = 0;
            throw $yieldSent;
          }
          $state = 3;
          break;
        case 14:
          $state = -2;
        case -2:
          return false;
        case -3:
          throw $storedException;
        default:
          throw "traceur compiler bug: invalid state in state machine" + $state;
      }
    },
    moveNext: function($yieldSent, $yieldAction) {
      while (true) try {
        return this.innerFunction($yieldSent, $yieldAction);
      } catch ($caughtException) {
        $storedException = $caughtException;
        switch ($state) {
          default:
            this.GState = 3;
            $state = -2;
            throw $storedException;
        }
      }
    }
  };
  return $__generatorWrap($G);
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
  return (function() {
    return !fn.apply(this, arguments);
  }).bind(this);
});
_.equal = ac((function(expected, value) {
  return value === expected;
}));
_.gt = ac((function(y, x) {
  return x > y;
}));
_.reject = _.filter(_.invert($), $);
_.reduceRight = _.reduce($, $, _.reverse($));
_.object = ac((function(v) {
  return _.setValues(v, {});
}));
_.count = _.reduce(0, (function(sum, i) {
  return sum + 1;
}));
_.sum = _.reduce(0, (function(sum, i) {
  return sum + i;
}));
_.max = _.reduce(0, Math.max);
_.min = _.reduce(0, Math.min);
_.compact = _.filter((function(v) {
  return !!v;
}));
_.tail = _.slice(1, - 1);
_.take = _.slice(0);
_.skip = _.slice($, - 1, $);
_.sortBy = _.sort(_.comparer($));
_.debug = _.tap;
_.first = _.head;
_.toArray = _.collect;
_.flatmap = _.flatten(_.map($, $));
_.indexBy = _.object(_.groupBy($));
_.shuffle = _.sortBy(Math.random);
_.last = _.head(_.slice(- 1, 1, $));
_.find = _.head(_.filter($, $));
_.findLast = _.tail(_.filter($, $));
_.any = _.exists(_.filter($, $));
_.every = _.not(_.exists(_.reject($, $)));
_.find = _.head(_.filter($, $));
_.findLast = _.tail(_.filter($, $));
_.findIndex = _.head(_.indexes($, $));
_.indexOf = _.findIndex(_.equal($), $);
_.contains = _.gt(- 1, _.indexOf($, $));
_.findLastIndex = _.tail(_.indexes($, $));
_.lastIndexOf = _.findLastIndex(_.equal($), $);
_.keys = _.map(_.head(_.pairs($)));
_.values = _.map(_.tail(_.pairs($)));
_.isObject = ac((function(v) {
  return v === Object(v);
}));
_.isEmpty = _.not(_.exists(_.pairs($)));
_.isBoolean = _.or(_.equal(true), _.equal(false));
_.has = ac((function(item, key) {
  return hasOwnProperty.call(item, key);
}));
_.isFinite = ac(isFinite);
_.isNaN = ac(isNaN);
_.isNull = _.equal(null);
_.isUndefined = _.equal(undefined);
[Array, Function, String, Number, Date, RegExp].forEach(function(constructor) {
  _['is' + constructor.name] = ac((function(obj) {
    return obj && obj.constructor === constructor;
  }));
});
_.pick = ac((function(names, item) {
  return _.object(_.map((function(n) {
    return [n, item[n]];
  }), names));
}));
_.pluck = ac((function(propertyName, source) {
  return source[propertyName];
}));
_.clone = ac(function clone(item) {
  if (!_.isObject(item)) return item;
  return _.isArray(item) ? item.slice(): _.extend({}, item);
});
_.defaults = ac(function defaults(dest, item) {
  return _.setValues(_.filter((function($__5) {
    var k = $__5[0], v = $__5[1];
    return undefined === dest[k];
  }), _.pairs(item)), dest);
});
_.extend = ac((function(dest, item) {
  return _.setValues(_.pairs(item), dest);
}));

//@ sourceMappingURL=index.map