function markerSquare() {
  return squares[0]
}

function getMarkerMarginLeft() {
  return markerSquare().style.marginLeft
}

function removeUnits(value) {
  return value.substring(0, value.length - 2)
}

const squares = document.querySelectorAll(".square"),
  squareWidth = markerSquare().clientWidth

function move(amountInPixels) {
  const currentMargin = parseInt(removeUnits(getMarkerMarginLeft() || "0px"))
  const newMargin =
    currentMargin >= squareWidth * 2 ? 0 : currentMargin + amountInPixels
  squares.forEach(square => (square.style.marginLeft = `${newMargin}px`))
}

setInterval(() => move(1), 50)
