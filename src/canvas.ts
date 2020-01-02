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
    const xCoord = realXPosition + dimension / 2 - overlayWidth / 2
    paintOverlay(xCoord, yCoord, overlayWidth)
  }
}

function paintSplitSquare(square: Square, naturalXPosition: number, yIdx: number) {
  const { colorIndex, squareState, overlayWidth } = square
  const yCoord = yIdx * dimension
  // right side of screen
  paintRectangle(
    naturalXPosition,
    yCoord,
    dimension,
    colorIndex,
    squareState
    )

  // left side of screen
  const leftRectWidth = dimension - (width - naturalXPosition)
  paintRectangle(0, yCoord, leftRectWidth, colorIndex, squareState)

  // draw overlay
  if (isTransitionState(square)) {
    // right side of screen
    const naturalLeftEdgeOfOverlay = dimension / 2 - overlayWidth / 2
    const overlayRightXCoord = naturalXPosition + naturalLeftEdgeOfOverlay
    paintOverlay(overlayRightXCoord, yCoord, overlayWidth)

    // left side of screen
    const rightRectWidth = dimension - leftRectWidth
    const naturalRightEdgeOfOverlay = dimension / 2 - overlayWidth/ 2
    const isEntireOverlayOnLeftRect = leftRectWidth > naturalRightEdgeOfOverlay
    const overlayLeftXCoord = isEntireOverlayOnLeftRect
      ? naturalLeftEdgeOfOverlay - rightRectWidth
      : 0
    const overlayLeftwidth = isEntireOverlayOnLeftRect
      ? overlayWidth
      : overlayWidth - rightRectWidth
    paintOverlay(overlayLeftXCoord, yCoord, overlayLeftwidth)
  }
}

function paintOverlay (xCoord: number, yCoord: number, width: number) {
  ctx.globalAlpha = 0.4
  ctx.fillStyle = getOverlayColor()
  ctx.fillRect(xCoord, yCoord, width, dimension)
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
