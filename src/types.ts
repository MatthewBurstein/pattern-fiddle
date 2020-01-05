export interface State {
  offset: number;
  squares: Square[][];
}

export interface Square {
  colorIndex: number;
  squareState: SquareState;
  locked: boolean;
  overlayWidth: number;
}

export enum SquareState {
  LIGHT = 'light',
  TRANSITION_FROM_LIGHT = 'transitionFromLight',
  TRANSITION_TO_DARK = 'transitionToDark',
  DARK = 'dark',
  TRANSITION_FROM_DARK = 'transitionFromDark',
  TRANSITION_TO_LIGHT = 'transitionToLight'
}
