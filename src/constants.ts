import { SquareState } from './types';

export const squareStates: SquareState[] = [
  SquareState.LIGHT,
  SquareState.TRANSITION_FROM_LIGHT,
  SquareState.TRANSITION_TO_DARK,
  SquareState.DARK,
  SquareState.TRANSITION_FROM_DARK,
  SquareState.TRANSITION_TO_LIGHT
];

export const width = window.innerWidth;
export const height = window.innerHeight;
export const numberOfColumns = 12;

export const dimension = width / numberOfColumns;

export const canvas = <HTMLCanvasElement>document.getElementById('canvas');
canvas.width = width;
canvas.height = height;
export const numberOfRows = Math.ceil(height / dimension);
