const colors = ["#EAE0CC", "#C9ADA1", "#ADA7C9", "#FFF3BB"]

const canvas = document.getElementById("canvas")
canvas.height = window.innerHeight
canvas.width = window.innerWidth
const columnsToDisplay = 12
const overflow = 2
const dimension = canvas.width / 12

const ctx = canvas.getContext("2d")

const numberOfColumns = columnsToDisplay + 2 * overflow

const numberOfRows = Math.ceil(canvas.height / dimension + 2) * overflow

const colArr = Array(numberOfColumns).fill()
const rowArr = Array(numberOfRows).fill()

// make grid representation
const squares = colArr.map((_, xIdx) => {
  return rowArr.map((_, yIdx) => {
    return Object.freeze({
      xCoord: xIdx - 2,
      yCoord: yIdx - 2,
      isEvenColumn: xIdx % 2 === 0
    })
  })
})

function draw(offset) {
  for (row of squares) {
    for (square of row) {
      const xStart = square.xCoord * dimension + offset
      const yStart = square.yCoord * dimension

      ctx.fillStyle = getColor(square)
      ctx.fillRect(
        xStart < 0 ? 0 : xStart,
        yStart < 0 ? 0 : yStart,
        getSquareWidth(square, offset),
        dimension
      )
    }
  }
}

function getColor(square) {
  const { xCoord, yCoord, isEvenColumn } = square
  let colorIndex
  if (xCoord % 2 === 0) {
    colorIndex = yCoord % 2 === 0 ? 0 : 1
  } else {
    colorIndex = yCoord % 2 === 0 ? 2 : 3
  }
  return colors[colorIndex]
}

function getSquareWidth(square, offset) {
  const xStart = square.xCoord * dimension + offset
  if (xStart + dimension < 0) {
    return 0
  } else if (xStart < 0) {
    return offset
  } else {
    return dimension
  }
}

let offset = 0
setInterval(() => {
  draw(offset)
  offset = (offset + 1) % (dimension * 2)
}, 30)
