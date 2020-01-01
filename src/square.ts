;(function(module) {
  function isTransitionState(square) {
    return [
      TRANSITION_FROM_DARK,
      TRANSITION_FROM_LIGHT,
      TRANSITION_TO_LIGHT,
      TRANSITION_TO_DARK
    ].includes(square.squareState)
  }

  function isTransitionFromState(square) {
    return [TRANSITION_FROM_DARK, TRANSITION_FROM_LIGHT].includes(
      square.squareState
    )
  }
  function isTransitionToState(square) {
    return [TRANSITION_TO_LIGHT, TRANSITION_TO_DARK].includes(
      square.squareState
    )
  }

  module.isTransitionState = isTransitionState
  module.isTransitionFromState = isTransitionFromState
  module.isTransitionToState = isTransitionToState
})(this)
