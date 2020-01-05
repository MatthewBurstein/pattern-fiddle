import { SquareState } from './types';
import { hasLightPrimaryPalette } from './square';

const baseColors = Object.freeze(['#EAE8E3', '#C9C3C1', '#C2C1C9', '#FFFCF2']);
const lightColors = Object.freeze(['#EAE0CC', '#C9ADA1', '#ADA7C9', '#FFF3BB']);
const darkColors = Object.freeze(['#84775E', '#7C3A2A', '#492A91', '#D8C158']);

export type OverlayColor =
  | typeof baseColors[number]
  | typeof lightColors[number];

export function getOverlayPalette(
  squareState: SquareState,
  colorIndex: number
) {
  return (hasLightPrimaryPalette(squareState) ? lightColors : darkColors)[
    colorIndex
  ];
}

export function getBaseColor(index: number) {
  return baseColors[index];
}
