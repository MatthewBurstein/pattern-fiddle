function markerSquare() {
  return squares[0]
}

function getMarkerMarginLeft() {
  return markerSquare().style.marginLeft
}

function removeUnits(value) {
  return value.substring(0, value.length - 2)
}

var squares = document.querySelectorAll(".square"),
  squareWidth = markerSquare().clientWidth

function move(amountInPixels) {
  var currentMargin = parseInt(removeUnits(getMarkerMarginLeft() || "0px"))
  var newMargin
  if (currentMargin >= squareWidth * 2) {
    newMargin = 0
  } else {
    newMargin = currentMargin + amountInPixels
  }
  for (var i = 0; i < squares.length; i++) {
    squares[i].style.marginLeft = newMargin + "px"
  }
}

var interval = setInterval(() => move(1), 50)
