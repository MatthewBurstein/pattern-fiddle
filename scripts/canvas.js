const canvas = document.getElementById("canvas")
canvas.width = window.innerWidth
canvas.height = window.innerHeight
const ctx = canvas.getContext("2d")
const dimension = Math.floor(
  (canvas.width > canvas.height ? canvas.width : canvas.height) / 12
)

console.log(dimension)

const colors = ["#EAE0CC", "#C9ADA1", "#ADA7C9", "#FFF3BB"]
let isInitDrawTwoColumns = false

function draw(xOffset) {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  let yIndex = 0
  let xIndex = 0

  // draw first row or two rows
  while (yIndex * dimension < canvas.height) {
    square(0, yIndex * dimension, xOffset - dimension)
    square(xOffset - dimension, yIndex * dimension)
    yIndex++
  }

  yIndex = 0
  while (xIndex * dimension + xOffset < canvas.width) {
    while (yIndex * dimension < canvas.height) {
      square(xIndex * dimension + xOffset, yIndex * dimension)
      yIndex++
    }
    yIndex = 0
    xIndex++
  }
}

function square(xCoord, yCoord, width = dimension, height = dimension) {
  ctx.fillStyle = getColor(xCoord, yCoord)
  return ctx.fillRect(xCoord, yCoord, width, height)
}

function getColor(xIndex, yIndex) {
  xColorCoord = Math.round(xIndex / dimension)
  yColorCoord = Math.round(yIndex / dimension)
  let colorIndex

  if (xColorCoord % 2 === 0) {
    colorIndex = yColorCoord % 2 === 0 ? 0 : 1
  } else {
    colorIndex = yColorCoord % 2 === 0 ? 2 : 3
  }
  return colors[colorIndex]
}

let offset = 0

setInterval(() => {
  draw(offset)
  offset = (offset + 1) % (dimension * 2)
}, 30)
// draw(120)
