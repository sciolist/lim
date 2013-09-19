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
var ac = require('./utils/courier')(_);
module.exports = exports = _;
var $ = _;
function _(source) {
  var obj = {__source: source};
  obj.__proto__ = _;
  return obj;
}
function isIterator(v) {
  return v.next instanceof Function;
}
function isIterable(v) {
  return v.iterator instanceof Function || v.next instanceof Function || Array.isArray(v);
}
_.autocurry = _.ac = ac;
_.self = _.identity = (function(v) {
  return v;
});
_.range = ac(function(start, stop) {
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
_.exists = ac(function(source) {
  for (var $__2 = $traceurRuntime.getIterator(source), $__3; !($__3 = $__2.next()).done;) {
    var v = $__3.value;
    return true;
  }
  return false;
});
_.collect = ac(function toArray(source) {
  return (function() {
    var $__0 = 0, $__1 = [];
    for (var $__3 = $traceurRuntime.getIterator(source), $__2; !($__2 = $__3.next()).done;) {
      var v = $__2.value;
      $__1[$__0++] = v;
    }
    return $__1;
  }());
});
_.tap = ac(function tap(fn, source) {
  var $that = this;
  var $arguments = arguments;
  var $state = 8;
  var $storedException;
  var $finallyFallThrough;
  var $__2;
  var $__3;
  var v;
  var $G = {
    GState: 0,
    current: undefined,
    yieldReturn: undefined,
    innerFunction: function($yieldSent, $yieldAction) {
      while (true) switch ($state) {
        case 8:
          $__2 = $traceurRuntime.getIterator(source);
          $state = 3;
          break;
        case 3:
          if (!($__3 = $__2.next()).done) {
            $state = 6;
            break;
          } else {
            $state = 9;
            break;
          }
        case 6:
          v = $__3.value;
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
  for (var $__3 = $traceurRuntime.getIterator(source), $__2; !($__2 = $__3.next()).done;) {
    var v = $__2.value;
    cb(v);
  }
});
_.head = ac(function head(source) {
  for (var $__2 = $traceurRuntime.getIterator(source), $__3; !($__3 = $__2.next()).done;) {
    var v = $__3.value;
    return v;
  }
});
_.iterate = ac(function iterate(source) {
  var $that = this;
  var $arguments = arguments;
  var $state = 6;
  var $storedException;
  var $finallyFallThrough;
  var $__2;
  var $__3;
  var v;
  var $G = {
    GState: 0,
    current: undefined,
    yieldReturn: undefined,
    innerFunction: function($yieldSent, $yieldAction) {
      while (true) switch ($state) {
        case 6:
          $__3 = $traceurRuntime.getIterator(source);
          $state = 3;
          break;
        case 3:
          if (!($__2 = $__3.next()).done) {
            $state = 4;
            break;
          } else {
            $state = 7;
            break;
          }
        case 4:
          v = $__2.value;
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
  var $__2;
  var $__3;
  var v;
  var $G = {
    GState: 0,
    current: undefined,
    yieldReturn: undefined,
    innerFunction: function($yieldSent, $yieldAction) {
      while (true) switch ($state) {
        case 6:
          $__2 = $traceurRuntime.getIterator(source);
          $state = 3;
          break;
        case 3:
          if (!($__3 = $__2.next()).done) {
            $state = 4;
            break;
          } else {
            $state = 7;
            break;
          }
        case 4:
          v = $__3.value;
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
  var $__2;
  var $__3;
  var v;
  var $G = {
    GState: 0,
    current: undefined,
    yieldReturn: undefined,
    innerFunction: function($yieldSent, $yieldAction) {
      while (true) switch ($state) {
        case 7:
          $__3 = $traceurRuntime.getIterator(source);
          $state = 3;
          break;
        case 3:
          if (!($__2 = $__3.next()).done) {
            $state = 5;
            break;
          } else {
            $state = 8;
            break;
          }
        case 5:
          v = $__2.value;
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
  for (var $__2 = $traceurRuntime.getIterator(source), $__3; !($__3 = $__2.next()).done;) {
    var $__6 = $__3.value, k = $__6[0], v = $__6[1];
    item[k] = v;
  }
  return item;
});
_.reduce = ac(function reduce(seed, fn, source) {
  for (var $__3 = $traceurRuntime.getIterator(source), $__2; !($__2 = $__3.next()).done;) {
    var v = $__2.value;
    {
      seed = fn(seed, v);
    }
  }
  return seed;
});
_.reverse = ac(function(source) {
  var $that = this;
  var $arguments = arguments;
  var $state = 5;
  var $storedException;
  var $finallyFallThrough;
  var $__2;
  var $__3;
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
          for ($__2 = $traceurRuntime.getIterator(source); !($__3 = $__2.next()).done;) {
            v = $__3.value;
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
  var $__2;
  var $__3;
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
          $__3 = $traceurRuntime.getIterator(source);
          $state = 9;
          break;
        case 9:
          if (!($__2 = $__3.next()).done) {
            $state = 10;
            break;
          } else {
            $state = 13;
            break;
          }
        case 10:
          v = $__2.value;
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
  var $__2;
  var $__3;
  var v;
  var $G = {
    GState: 0,
    current: undefined,
    yieldReturn: undefined,
    innerFunction: function($yieldSent, $yieldAction) {
      while (true) switch ($state) {
        case 9:
          $__2 = $traceurRuntime.getIterator(source);
          $state = 5;
          break;
        case 5:
          if (!($__3 = $__2.next()).done) {
            $state = 7;
            break;
          } else {
            $state = 10;
            break;
          }
        case 7:
          v = $__3.value;
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
_.takeUntilLast = ac(function takeUntil(fn, source) {
  var $that = this;
  var $arguments = arguments;
  var $state = 19;
  var $storedException;
  var $finallyFallThrough;
  var $__2;
  var $__3;
  var $__4;
  var $__5;
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
          $__4 = $traceurRuntime.getIterator(source);
          $state = 14;
          break;
        case 14:
          if (!($__5 = $__4.next()).done) {
            $state = 15;
            break;
          } else {
            $state = 18;
            break;
          }
        case 15:
          v = $__5.value;
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
          $__3 = $traceurRuntime.getIterator(arr);
          $state = 3;
          break;
        case 3:
          if (!($__2 = $__3.next()).done) {
            $state = 4;
            break;
          } else {
            $state = 7;
            break;
          }
        case 4:
          vv = $__2.value;
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
  var $__2;
  var $__3;
  var $__4;
  var $__5;
  var v;
  var vv;
  var $G = {
    GState: 0,
    current: undefined,
    yieldReturn: undefined,
    innerFunction: function($yieldSent, $yieldAction) {
      while (true) switch ($state) {
        case 15:
          $__2 = $traceurRuntime.getIterator(source);
          $state = 3;
          break;
        case 3:
          if (!($__3 = $__2.next()).done) {
            $state = 13;
            break;
          } else {
            $state = 16;
            break;
          }
        case 13:
          v = $__3.value;
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
          $__5 = $traceurRuntime.getIterator(v);
          $state = 7;
          break;
        case 7:
          if (!($__4 = $__5.next()).done) {
            $state = 8;
            break;
          } else {
            $state = 3;
            break;
          }
        case 8:
          vv = $__4.value;
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
_.comparer = ac(function(fn) {
  return function(item1, item2) {
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
  var $__2;
  var $__3;
  var $__6;
  var $__7;
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
          for ($__3 = $traceurRuntime.getIterator(source); !($__2 = $__3.next()).done;) {
            item = $__2.value;
            {
              arr.push(item);
              j = arr.length - 1;
              for (i = arr.length - 1;; i = j) {
                j = Math.ceil(i / 2) - 1;
                if (j < 0 || cmp(arr[j], arr[i]) <= 0) break;
                {
                  ($__6 = [arr[i], arr[j]], arr[j] = $__6[0], arr[i] = $__6[1], $__6);
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
              ($__7 = [arr[i], arr[lower]], arr[lower] = $__7[0], arr[i] = $__7[1], $__7);
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
_.withObject = _.reduce($, _.wrap((function(fn, $__7) {
  var x = $__7[0], v = $__7[1];
  return (fn(x, v), x);
}), $));
_.groupBy = ac(function groupBy(fn, source) {
  return _.withObject({}, (function(d, $__6) {
    var k = $__6[0], v = $__6[1];
    return (d[k] || (d[k] = [])).push(v);
  }), _.map((function(k) {
    return [fn(k), k];
  }), source));
});
_.zip = ac(function(source1, source2) {
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
  var $__2;
  var $__3;
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
          $__2 = $traceurRuntime.getIterator(source);
          $state = 6;
          break;
        case 6:
          if (!($__3 = $__2.next()).done) {
            $state = 7;
            break;
          } else {
            $state = 10;
            break;
          }
        case 7:
          k = $__3.value;
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
  var $__10;
  var $__11;
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
          $__8 = [];
          $state = 16;
          break;
        case 16:
          $__9 = item;
          $state = 18;
          break;
        case 18:
          for (var $__10 in $__9) $__8.push($__10);
          $state = 20;
          break;
        case 20:
          $__11 = 0;
          $state = 12;
          break;
        case 12:
          if ($__11 < $__8.length) {
            $state = 4;
            break;
          } else {
            $state = 14;
            break;
          }
        case 3:
          $__11++;
          $state = 12;
          break;
        case 4:
          key = $__8[$__11];
          $state = 5;
          break;
        case 5:
          if (!(key in $__9)) {
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
_.or = ac(function(fn1, fn2, value) {
  return fn1(value) || fn2(value);
});
_.and = ac(function(fn1, fn2, value) {
  return fn1(value) && fn2(value);
});
_.not = ac(function(v) {
  return !v;
});
_.yes = _.true = ac(function() {
  return true;
});
_.no = _.false = ac(function() {
  return true;
});
_.invert = ac(function(fn) {
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
_.defaults = ac(function(dest, item) {
  return _.setValues(_.filter((function($__6) {
    var k = $__6[0], v = $__6[1];
    return undefined === dest[k];
  }), _.pairs(item)), dest);
});
_.extend = ac((function(dest, item) {
  return _.setValues(_.pairs(item), dest);
}));

//@ sourceMappingURL=index.map