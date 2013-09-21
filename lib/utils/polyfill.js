
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

var GeneratorFunctionPrototype = (function*(){yield 0}).constructor.prototype;
if(!GeneratorFunctionPrototype.prototype.iterator) {
  GeneratorFunctionPrototype.prototype.iterator = function iterator() {
    return this;
  }
}

