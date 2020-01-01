// ;(function() {
//   const CIRCLE_COUNT = 10
//   const ANGLE = 360 / CIRCLE_COUNT

//   const circlesContainers = Array.from(Array(CIRCLE_COUNT)).map((_, idx) =>
//     document.querySelector(`.circles-container-${idx}`)
//   )

//   let currentShiftIndex = 0
//   function shift() {
//     currentShiftIndex = currentShiftIndex === ANGLE ? 0 : currentShiftIndex
//     circlesContainers.forEach((circles, idx) => {
//       circles.style.transform = `rotate(${idx * ANGLE + currentShiftIndex}deg)`
//     })
//     currentShiftIndex = currentShiftIndex + 0.2
//   }

//   setInterval(shift, 50)
// })(this)
