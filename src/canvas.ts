import { State, Square, SquareState } from './types';
import { canvas } from './constants';
import { width, height, dimension, interval } from './constants';
import { getOverlayPalette, OverlayColor, getBaseColor } from './colors';
import { getGlobalState, moveSquares } from './state';

const ctx = canvas.getContext('2d');

export function paint(state: State): State {
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

  paintBaseSquare(realXPosition, yCoord, dimension, colorIndex);
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
  const { colorIndex, overlayWidth, squareState } = square;
  const yCoord = yIdx * dimension;
  const naturalLeftEdgeOfOverlay = dimension / 2 - overlayWidth / 2;
  const overlayRightXCoord = naturalXPosition + naturalLeftEdgeOfOverlay;
  // right side of screen
  paintBaseSquare(naturalXPosition, yCoord, dimension, colorIndex);
  paintOverlay(
    overlayRightXCoord,
    yCoord,
    overlayWidth,
    colorIndex,
    squareState
  );

  // left side of screen
  const leftRectWidth = (dimension - (width - naturalXPosition)) % width;
  paintBaseSquare(0, yCoord, leftRectWidth, colorIndex);
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
    colorIndex,
    squareState
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

function paintBaseSquare(
  xCoord: number,
  yCoord: number,
  width: number,
  colorIndex: number
) {
  ctx.globalAlpha = 1;
  ctx.fillStyle = getBaseColor(colorIndex);
  ctx.fillRect(xCoord, yCoord, width, dimension);
}

export function startSquareAnimation(): void {
  const state = getGlobalState();
  function recursivelyAnimateSquares(): void {
    setTimeout(() => {
      paint(state);
      moveSquares(state);
      recursivelyAnimateSquares();
    }, interval);
  }

  recursivelyAnimateSquares();
}

function getOverlayColor(
  colorIndex: number,
  squareState: SquareState
): OverlayColor {
  return getOverlayPalette(squareState, colorIndex);
}
