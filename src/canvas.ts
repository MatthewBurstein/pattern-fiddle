import { State, SquareState, Square, OverlayColor } from './types'
import { canvas } from './constants'
import { pipe } from './pipe'
import {
  width,
  height,
  dimension,
  colors
} from './constants'
import { isTransitionState } from './square'
import { updateOffset, updateOverlayWidthsAndSquareStates, getGlobalState, handleMouseMove } from './state'

const ctx = canvas.getContext("2d")

function process(state: State): State {
  return pipe(state, [paint, moveSquares])
}

function paint(state: State): State {
  ctx.clearRect(0, 0, width, height)
  const { squares, offset } = state
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

function paintWholeSquare(square: Square, realXPosition: number, yIdx: number) {
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

function paintSplitSquare(square: Square, naturalXPosition: number, yIdx: number) {
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

function paintRectangle(xCoord: number, yCoord: number, width: number, colorIndex: number, squareState: SquareState) {
  ctx.globalAlpha = 1
  ctx.fillStyle = colors[colorIndex]
  ctx.fillRect(xCoord, yCoord, width, dimension)
}

function moveSquares(state: State): State {
  const { offset } = state
  const newOffset = (offset + 1) % width
  return pipe(state, [() => updateOffset(newOffset), updateOverlayWidthsAndSquareStates])
}

function startSquareAnimation(timePerSquare: number, state: State): void {
  const baseStepTime = timePerSquare / dimension

  function recursivelyAnimateSquares(time: number, state: State): void {
    setTimeout(() => {
      const nextState = process(state)
      recursivelyAnimateSquares(time, nextState)
    }, time)
  }

  recursivelyAnimateSquares(baseStepTime, state)
}

const interval = 1000
startSquareAnimation(interval, getGlobalState())

function getOverlayColor(): OverlayColor {
  return "#8B008B"
}

window.addEventListener("mousemove", event => {
  const { clientX, clientY } = event
  handleMouseMove(clientX, clientY)
})
