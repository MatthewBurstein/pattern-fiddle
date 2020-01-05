import { Square, SquareState } from './types';

export function isTransitionState(square: Square): boolean {
  return [
    SquareState.TRANSITION_FROM_DARK,
    SquareState.TRANSITION_FROM_LIGHT,
    SquareState.TRANSITION_TO_LIGHT,
    SquareState.TRANSITION_TO_DARK
  ].includes(square.squareState);
}

export function isTransitionFromState(square: Square): boolean {
  return [
    SquareState.TRANSITION_FROM_DARK,
    SquareState.TRANSITION_FROM_LIGHT
  ].includes(square.squareState);
}

export function isTransitionToState(square: Square): boolean {
  return [
    SquareState.TRANSITION_TO_LIGHT,
    SquareState.TRANSITION_TO_DARK
  ].includes(square.squareState);
}

export function hasLightPrimaryPalette(squareState: SquareState) {
  return [
    SquareState.LIGHT,
    SquareState.TRANSITION_FROM_LIGHT,
    SquareState.TRANSITION_TO_LIGHT
  ].includes(squareState);
}
