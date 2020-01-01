import { SquareState, Color } from "./types"

export const squareStates = [
  SquareState.LIGHT,
  SquareState.TRANSITION_FROM_LIGHT,
  SquareState.TRANSITION_TO_DARK,
  SquareState.DARK,
  SquareState.TRANSITION_FROM_DARK,
  SquareState.TRANSITION_TO_LIGHT
]
export const colors: Color[] = ["#EAE0CC", "#C9ADA1", "#ADA7C9", "#FFF3BB"]

export const canvas = <HTMLCanvasElement>document.getElementById("canvas")
export const width = window.innerWidth
export const height = window.innerHeight
canvas.height = height
canvas.width = width
export const numberOfColumns = 12
export const dimension = width / numberOfColumns
