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
if (!Array.prototype.iterator) {
  Array.prototype.iterator = function iterator() {
    var arr = this, i = - 1, done = false;
    return {
      iterator: function() {
        return this;
      },
      next: function() {
        if (done) throw new Error("Iteration has finished");
        i += 1;
        done = i >= arr.length;
        return {
          value: arr[i],
          done: done
        };
      }
    };
  };
}
if (!String.prototype.iterator) {
  String.prototype.iterator = Array.prototype.iterator;
}
var GeneratorFunctionPrototype = (function() {
  var $that = this;
  var $arguments = arguments;
  var $state = 0;
  var $storedException;
  var $finallyFallThrough;
  var $G = {
    GState: 0,
    current: undefined,
    yieldReturn: undefined,
    innerFunction: function($yieldSent, $yieldAction) {
      while (true) switch ($state) {
        case 0:
          this.current = 0;
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
}).constructor.prototype;
if (GeneratorFunctionPrototype && !GeneratorFunctionPrototype.prototype.iterator) {
  GeneratorFunctionPrototype.prototype.iterator = function iterator() {
    return this;
  };
}
if (typeof $traceurRuntime === 'undefined') {
  $traceurRuntime = {
    addIterator: function(v) {
      v.iterator = function() {
        return v;
      };
      return v;
    },
    getIterator: function(v) {
      return v.iterator();
    }
  };
}

//@ sourceMappingURL=polyfill.map