function compiles(str) { try { return !!Function(str); } catch(ex) { return false; } }

if(!Array.prototype.iterator) {

  Array.prototype.iterator = function iterator() {
    var arr = this, i = -1, done = false;
    return {
      iterator: function() { return this; },
      next: function() {
        if(done) throw new Error("Iteration has finished");
        i += 1;
        done = i >= arr.length;
        return { value: arr[i], done: done };
      }
    }
  }

}

if(!String.prototype.iterator) {
  String.prototype.iterator = Array.prototype.iterator;
}

// avoid traceur rewriting
if(compiles("(function*(){yield 0})")) {
  var fn = eval("(function*(){yield 0})")
  var GFP = fn.constructor.prototype;
  if(GFP && GFP.prototype && !GFP.prototype.iterator) {
    GFP.prototype.iterator = function iterator() {
      return this;
    }
  }
}


if(typeof $traceurRuntime === 'undefined') {
  $traceurRuntime = {
    addIterator: function(v) { v.iterator = function() { return v; }; return v; },
    getIterator: function(v) { return v.iterator(); }
  };
}

