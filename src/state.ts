import { State, Square } from './types';
import {
  isTransitionFromState,
  isTransitionToState,
  isTransitionState
} from './square';
import {
  dimension,
  squareStates,
  width,
  numberOfRows,
  numberOfColumns
} from './constants';

const globalState: State = {
  offset: 0,
  squares: getInitialSquares()
};

export function getGlobalState(): State {
  return globalState;
}

export function updateOffset(offset: number): State {
  globalState.offset = offset;
  return globalState;
}

export function updateSquares(newSquares: Square[][]) {
  globalState.squares = newSquares;
  return globalState;
}

export function updateOverlayWidthsAndSquareStates(): State {
    const newSquares = globalState.squares.map((row: Square[]): Square[] =>
      row.map((square: Square): Square => {
        if (isTransitionFromState(square)) {
          const newValue = decrementOverlayWidthOrMoveState(square);
          return newValue
        } else if (isTransitionToState(square)) {
          const newValue = incrementOverlayWidthOrMoveState(square);
          return newValue
        } else {
          return square
        }
      })
    )
    return updateSquares(newSquares)
}

export function handleMouseMove(xCoord: number, yCoord: number): void {
  const [row, col] = getCurrentSquareFromCoords(
    xCoord,
    yCoord,
    globalState.offset
  );
  const square = globalState.squares[row][col];
  if (!square.locked) {
    moveSquareToNextState(square);
  }
}

function getInitialSquares(): Square[][] {
  const output = Array(numberOfColumns)
    .fill(undefined)
    .map((_, xIdx) => {
      return Array(numberOfRows)
        .fill(undefined)
        .map((_, yIdx) => {
          return {
            colorIndex: getColorIndex(xIdx, yIdx),
            squareState: squareStates[0],
            locked: false,
            overlayWidth: dimension
          };
        });
    });
    return output
}

function getColorIndex(xIdx: number, yIdx: number): number {
  if (xIdx % 2 === 0) {
    return yIdx % 2 === 0 ? 0 : 1;
  } else {
    return yIdx % 2 === 0 ? 2 : 3;
  }
}

function getCurrentSquareFromCoords(
  xCoord: number,
  yCoord: number,
  offset: number
): [number, number] {
  const naturalXPosition = xCoord - offset;
  const realXPosition =
    naturalXPosition >= 0 ? naturalXPosition : naturalXPosition + width;
  const row = Math.floor(realXPosition / dimension);
  const col = Math.floor(yCoord / dimension);
  return [row, col];
}

function moveSquareToNextState(square: Square): void {
  const oldStateIdx = squareStates.findIndex(s => s === square.squareState);
  const newStateIdx = (oldStateIdx + 1) % squareStates.length;
  square.squareState = squareStates[newStateIdx];
  square.locked = isTransitionState(square);
}

function incrementOverlayWidthOrMoveState(square: Square): Square {
  square.overlayWidth < dimension
    ? square.overlayWidth++
    : moveSquareToNextState(square);
  return square;
}
function decrementOverlayWidthOrMoveState(square: Square): Square {
  square.overlayWidth > 0
    ? square.overlayWidth--
    : moveSquareToNextState(square);
  return square;
}
