;(function(module) {
  state = {
    state: {
      offset: 0,
      squares: getInitialSquares()
    },
    getState: function() {
      return this.state
    },
    getOffset: function() {
      return this.state.offset
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
    },
    setSquareState(xCoord, yCoord, state) {
      const [row, col] = getCurrentSquareFromCoords(
        xCoord,
        yCoord,
        this.getOffset()
      )
      this.getSquares()[row][col].state = state
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

  function getCurrentSquareFromCoords(xCoord, yCoord, offset) {
    const naturalXPosition = xCoord - offset
    const realXPosition =
      naturalXPosition >= 0 ? naturalXPosition : naturalXPosition + width
    const row = Math.floor(realXPosition / dimension)
    const col = Math.floor(yCoord / dimension)
    return [row, col]
  }

  module.state = state
})(this)
