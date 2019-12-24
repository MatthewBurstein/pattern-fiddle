;(function(module) {
  state = {
    state: {
      offset: 0,
      squares: getInitialSquares()
    },
    getState: function() {
      return this.state
    },
    getSquares: function() {
      return this.state.squares
    },
    updateOffset: function(offset) {
      this.state.offset = offset
      return this
    },
    updateSquares: function(newSquares) {
      this.state.squares = newSquares
      return this
    }
  }

  function getInitialSquares() {
    const numberOfRows = Math.ceil(canvas.height / dimension + 2)
    return Array(numberOfColumns)
      .fill()
      .map((_, xIdx) => {
        return Array(numberOfRows)
          .fill()
          .map((_, yIdx) => {
            return {
              intrinsicX: xIdx,
              intrinsicY: yIdx,
              colorIndex: getColorIndex(xIdx, yIdx),
              // one of ['light', 'dark', 'transitionToDark', 'transitionToLight' ]
              state: LIGHT
            }
          })
      })
  }

  function getColorIndex(xIdx, yIdx) {
    if (xIdx % 2 === 0) {
      return yIdx % 2 === 0 ? 0 : 1
    } else {
      return yIdx % 2 === 0 ? 2 : 3
    }
  }

  module.state = state
})(this)
