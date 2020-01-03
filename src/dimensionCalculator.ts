// account for screens which are wider than they are tall
// as well as those which are taller than they are wide

export const windowDimensions = {
  width: window.innerWidth,
  height: window.innerHeight
}
const dominantDimension = windowDimensions.width > windowDimensions.height ? "width" : "height"
const numberOfDivisionsInDominantDimension = 12
// const numberOfDivisionsInSupplicantDimension = Math.ceil(canvas.height / dimension + 2)
export const squareDimension = windowDimensions[dominantDimension] / numberOfDivisionsInDominantDimension

