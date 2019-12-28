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
        naturalXPosition > width ? naturalXPosition - width : naturalXPosition
      const isSplitColumn =
        realXPosition < width - dimension || realXPosition > width
      return row.map((square, yIdx) => {
        if (isSplitColumn) {
          paintWholeSquare(square, realXPosition, yIdx)
        } else {
          paintSplitSquare(square, naturalXPosition, yIdx)
        }
        return square
      })
    })
    return state
  }

  function paintWholeSquare(square, realXPosition, yIdx) {
    const { colorIndex } = square
    paintRectangle(
      realXPosition,
      yIdx * dimension,
      dimension,
      square.state === TRANSITION_TO_DARK ? "black" : colors[colorIndex]
    )
  }

  function paintSplitSquare(square, naturalXPosition, yIdx) {
    const { colorIndex } = square
    const leftPartWidth = dimension - (width - naturalXPosition)
    const color =
      square.state === TRANSITION_TO_DARK ? "black" : colors[colorIndex]
    // right side of screen
    paintRectangle(naturalXPosition, yIdx * dimension, dimension, color)
    // left side of screen
    paintRectangle(0, yIdx * dimension, leftPartWidth, color)
  }

  function paintRectangle(xCoord, yCoord, width, color) {
    ctx.globalAlpha = 1
    ctx.fillStyle = color
    ctx.fillRect(xCoord, yCoord, width, dimension)
  }

  function moveSquares(state) {
    const { offset } = state.getState()
    const newOffset = (offset + 1) % width
    return state.updateOffset(newOffset)
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
  startSquareAnimation(interval, state)

  function getOverlayColor(square) {
    return "#8B008B"
  }

  window.addEventListener("mousemove", event => {
    const { clientX, clientY } = event
    state.setSquareState(clientX, clientY, TRANSITION_TO_DARK)
  })

  // MAKE OVERLAY
  //     square.xIdx = (xIdx + 1) % canvas.width

  //     // draw overlay square
  //     // switch (state) {
  //     //   case LIGHT:
  //     //     break
  //     //   case DARK:
  //     //     break
  //     //   case TRANSITION_TO_LIGHT:
  //     //     break
  //     //   case TRANSITION_TO_DARK:
  //     //     ctx.globalAlpha = 0.4
  //     //     ctx.fillStyle = getOverlayColor(square)
  //     //     const overlayWidth = dimension - offset
  //     //     ctx.fillRect(
  //     //       (xIdx < 0 ? 0 : xIdx) + offset / 2,
  //     //       yIdx < 0 ? 0 : yIdx,
  //     //       overlayWidth,
  //     //       dimension
  //     //     )
  //     //     break
  //     // }
  //   }
  //   isFirstColumn = false
  // }
})(this)
