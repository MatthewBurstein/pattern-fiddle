;(function(module) {
  module.LIGHT = "light"
  module.DARK = "dark"
  module.TRANSITION_TO_DARK = "transitionToDark"
  module.TRANSITION_TO_LIGHT = "transitionToLight"
  module.TRANSITION_FROM_DARK = "transitionToDark"
  module.TRANSITION_FROM_LIGHT = "transitionToLight"
  module.squareStates = [
    LIGHT,
    TRANSITION_FROM_LIGHT,
    TRANSITION_TO_DARK,
    DARK,
    TRANSITION_FROM_DARK,
    TRANSITION_TO_LIGHT
  ]
  module.colors = ["#EAE0CC", "#C9ADA1", "#ADA7C9", "#FFF3BB"]

  module.canvas = document.getElementById("canvas")
  module.width = window.innerWidth
  module.height = window.innerHeight
  canvas.height = height
  canvas.width = width
  module.numberOfColumns = 12
  module.dimension = width / numberOfColumns
})(this)
