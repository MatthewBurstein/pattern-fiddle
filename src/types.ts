export interface State {
  offset: number;
  squares: Square[][];
}

export type LightColor = '#EAE0CC' | '#C9ADA1' | '#ADA7C9' | '#FFF3BB';
export type DarkColor = '#84775E' | '#7C3A2A' | '#492A91' | '#D8C158';
export type OverlayColor = '#8B008B';

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
