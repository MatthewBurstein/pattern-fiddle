;(function(module) {
  module.pipe = function pipe(initialValue, functionArray) {
    return functionArray.reduce(
      (previousReturnValue, fn) => fn(previousReturnValue),
      initialValue
    )
  }
})(this)
