import { State, Square, SquareState } from './types';
import { canvas } from './constants';
import { pipe } from './pipe';
import { width, height, dimension } from './constants';
import { getOverlayPalette, OverlayColor, getBaseColor } from './colors';
import {
  updateOffset,
  updateOverlayWidthsAndSquareStates,
  getGlobalState,
  handleMouseMove
} from './state';

const ctx = canvas.getContext('2d');

function process(state: State): State {
  return pipe(state, [paint, moveSquares]);
}

function paint(state: State): State {
  ctx.clearRect(0, 0, width, height);
  const { squares, offset } = state;
  squares.map((row, xIdx) => {
    const naturalXPosition = offset + xIdx * dimension;
    const realXPosition =
      naturalXPosition - (naturalXPosition >= width ? width : 0);
    const isSplitColumn = realXPosition > width - dimension;
    return row.map((square, yIdx) => {
      isSplitColumn
        ? paintSplitSquare(square, naturalXPosition, yIdx)
        : paintWholeSquare(square, realXPosition, yIdx);
      return square;
    });
  });
  return state;
}

function paintWholeSquare(square: Square, realXPosition: number, yIdx: number) {
  const { colorIndex, overlayWidth } = square;
  const yCoord = yIdx * dimension;
  const xCoord = realXPosition + dimension / 2 - overlayWidth / 2;

  paintRectangle(realXPosition, yCoord, dimension, colorIndex);
  paintOverlay(
    xCoord,
    yCoord,
    overlayWidth,
    square.colorIndex,
    square.squareState
  );
}

function paintSplitSquare(
  square: Square,
  naturalXPosition: number,
  yIdx: number
) {
  const { colorIndex, overlayWidth } = square;
  const yCoord = yIdx * dimension;
  const naturalLeftEdgeOfOverlay = dimension / 2 - overlayWidth / 2;
  const overlayRightXCoord = naturalXPosition + naturalLeftEdgeOfOverlay;
  // right side of screen
  paintRectangle(naturalXPosition, yCoord, dimension, colorIndex);
  paintOverlay(
    overlayRightXCoord,
    yCoord,
    overlayWidth,
    square.colorIndex,
    square.squareState
  );

  // left side of screen
  const leftRectWidth = (dimension - (width - naturalXPosition)) % width;
  paintRectangle(0, yCoord, leftRectWidth, colorIndex);
  const rightRectWidth = dimension - leftRectWidth;
  const distanceBetweenRectEdgeandRightEdgeOfOverlay =
    dimension / 2 - overlayWidth / 2;
  const isEntireOverlayOnLeftRect =
    leftRectWidth > distanceBetweenRectEdgeandRightEdgeOfOverlay;
  const overlayLeftXCoord = isEntireOverlayOnLeftRect
    ? naturalLeftEdgeOfOverlay - rightRectWidth
    : 0;
  const overlayLeftwidth = isEntireOverlayOnLeftRect
    ? overlayWidth
    : overlayWidth - rightRectWidth;
  paintOverlay(
    overlayLeftXCoord,
    yCoord,
    overlayLeftwidth,
    square.colorIndex,
    square.squareState
  );
}

function paintOverlay(
  xCoord: number,
  yCoord: number,
  width: number,
  colorIndex: number,
  squareState: SquareState
) {
  ctx.globalAlpha = 0.95;
  ctx.fillStyle = getOverlayColor(colorIndex, squareState);
  ctx.fillRect(xCoord, yCoord, width, dimension);
}

function paintRectangle(
  xCoord: number,
  yCoord: number,
  width: number,
  colorIndex: number
) {
  ctx.globalAlpha = 1;
  ctx.fillStyle = getBaseColor(colorIndex);
  ctx.fillRect(xCoord, yCoord, width, dimension);
}

function moveSquares(state: State): State {
  const { offset } = state;
  const newOffset = (offset + 1) % width;
  return pipe(state, [
    () => updateOffset(newOffset),
    updateOverlayWidthsAndSquareStates
  ]);
}

function startSquareAnimation(timePerSquare: number, state: State): void {
  const baseStepTime = timePerSquare / dimension;

  function recursivelyAnimateSquares(time: number, state: State): void {
    setTimeout(() => {
      const nextState = process(state);
      recursivelyAnimateSquares(time, nextState);
    }, time);
  }

  recursivelyAnimateSquares(baseStepTime, state);
}

const interval = 800;
startSquareAnimation(interval, getGlobalState());

function getOverlayColor(
  colorIndex: number,
  squareState: SquareState
): OverlayColor {
  return getOverlayPalette(squareState, colorIndex);
}

window.addEventListener('mousemove', event => {
  const { clientX, clientY } = event;
  handleMouseMove(clientX, clientY);
});

window.addEventListener('touchstart', event => {
  const { pageX, pageY } = event.touches[0]
  handleMouseMove(pageX, pageY);
});
window.addEventListener('touchmove', event => {
  const { pageX, pageY } = event.touches[0]
  handleMouseMove(pageX, pageY);
});
