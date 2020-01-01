;(function(module) {
  const ctx = canvas.getContext("2d")

  function process(state) {
    return pipe(state, [paint, moveSquares])
  }

  function paint(state) {
    ctx.clearRect(0, 0, width, height)
    const { squares, offset } = state.getState()
    squares.map((row, xIdx) => {
      const naturalXPosition = offset + xIdx * dimension
      const realXPosition =
        naturalXPosition - (naturalXPosition >= width ? width : 0)
      const isSplitColumn = realXPosition < width - dimension
      return row.map((square, yIdx) => {
        isSplitColumn
          ? paintWholeSquare(square, realXPosition, yIdx)
          : paintSplitSquare(square, naturalXPosition, yIdx)
        return square
      })
    })
    return state
  }

  function paintWholeSquare(square, realXPosition, yIdx) {
    const { colorIndex, squareState, overlayWidth } = square
    const yCoord = yIdx * dimension
    paintRectangle(realXPosition, yCoord, dimension, colorIndex, squareState)

    // draw overlay
    if (isTransitionState(square)) {
      ctx.globalAlpha = 0.4
      ctx.fillStyle = getOverlayColor()
      const xCoord = realXPosition + dimension / 2 - overlayWidth / 2
      ctx.fillRect(xCoord, yCoord, overlayWidth, dimension)
    }
  }

  function paintSplitSquare(square, naturalXPosition, yIdx) {
    const { colorIndex, squareState } = square
    const leftPartWidth = dimension - (width - naturalXPosition)
    // right side of screen
    paintRectangle(
      naturalXPosition,
      yIdx * dimension,
      dimension,
      colorIndex,
      squareState
    )
    // left side of screen
    paintRectangle(0, yIdx * dimension, leftPartWidth, colorIndex, squareState)
  }

  function paintRectangle(xCoord, yCoord, width, colorIndex, squareState) {
    ctx.globalAlpha = 1
    ctx.fillStyle = colors[colorIndex]
    ctx.fillRect(xCoord, yCoord, width, dimension)
  }

  function moveSquares(state) {
    const { offset } = state.getState()
    const newOffset = (offset + 1) % width
    return state.updateOffset(newOffset).updateOverlayWidthsAndSquareStates()
  }

  function startSquareAnimation(timePerSquare, state) {
    const baseStepTime = timePerSquare / dimension

    function recursivelyAnimateSquares(time, state) {
      setTimeout(() => {
        const nextState = process(state)
        recursivelyAnimateSquares(time, nextState)
      }, time)
    }

    recursivelyAnimateSquares(baseStepTime, state)
  }

  const interval = 1000
  startSquareAnimation(interval, globalState)

  function getOverlayColor(square) {
    return "#8B008B"
  }

  window.addEventListener("mousemove", event => {
    const { clientX, clientY } = event
    globalState.handleMouseMove(clientX, clientY)
  })
})(this)
