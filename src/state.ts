;(function(module) {
  globalState = {
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
    updateOverlayWidthsAndSquareStates() {
      return this.updateSquares(
        this.getSquares().map(row =>
          row.map(square => {
            if (isTransitionFromState(square)) {
              decrementOverlayWidthOrMoveState(square)
            } else if (isTransitionToState(square)) {
              console.log("in here")
              incrementOverlayWidthOrMoveState(square)
            }
            return square
          })
        )
      )
    },
    setSquareState(xCoord, yCoord, squareState) {
      const [row, col] = getCurrentSquareFromCoords(
        xCoord,
        yCoord,
        this.getOffset()
      )
      this.getSquares()[row][col].squareState = squareState
    },
    handleMouseMove: function(xCoord, yCoord) {
      const [row, col] = getCurrentSquareFromCoords(
        xCoord,
        yCoord,
        this.getOffset()
      )
      const square = this.getSquares()[row][col]
      if (square.locked) {
        return
      }
      moveSquareToNextState(square)
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
              colorIndex: getColorIndex(xIdx, yIdx),
              squareState: squareStates[0],
              locked: false,
              overlayWidth: dimension
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

  function moveSquareToNextState(square) {
    const oldStateIdx = squareStates.findIndex(s => s === square.squareState)
    const newStateIdx = (oldStateIdx + 1) % squareStates.length
    square.squareState = squareStates[newStateIdx]
    square.locked = isTransitionState(square)
  }

  function incrementOverlayWidthOrMoveState(square) {
    square.overlayWidth < dimension
      ? square.overlayWidth++
      : moveSquareToNextState(square)
  }
  function decrementOverlayWidthOrMoveState(square) {
    square.overlayWidth > 0
      ? square.overlayWidth--
      : moveSquareToNextState(square)
  }

  module.globalState = globalState
})(this)
