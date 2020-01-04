import { LightColor, DarkColor, SquareState } from './types';
import { hasLightPrimaryPalette } from './square';

const lightColors: LightColor[] = ['#EAE0CC', '#C9ADA1', '#ADA7C9', '#FFF3BB'];
const darkColors: DarkColor[] = ['#84775E', '#7C3A2A', '#492A91', '#D8C158'];

export function getPrimaryPalette(squareState: SquareState) {
  return hasLightPrimaryPalette(squareState) ? lightColors : darkColors;
}
