import { SquareState, Color } from "./types"
import { windowDimensions, squareDimension} from './dimensionCalculator'

export const squareStates: SquareState[] = [
  SquareState.LIGHT,
  SquareState.TRANSITION_FROM_LIGHT,
  SquareState.TRANSITION_TO_DARK,
  SquareState.DARK,
  SquareState.TRANSITION_FROM_DARK,
  SquareState.TRANSITION_TO_LIGHT
]

export const colors: Color[] = ["#EAE0CC", "#C9ADA1", "#ADA7C9", "#FFF3BB"]

export const width = windowDimensions.width
export const height = windowDimensions.height
export const dimension = squareDimension

export const canvas = <HTMLCanvasElement>document.getElementById("canvas")
canvas.width = width
canvas.height = height