const LIGHT = "light"
const DARK = "dark"
const TRANSITION_TO_DARK = "transitionToDark"
const TRANSITION_TO_LIGHT = "transitionToLight"
const colors = ["#EAE0CC", "#C9ADA1", "#ADA7C9", "#FFF3BB"]

const canvas = document.getElementById("canvas")
const width = window.innerWidth
const height = window.innerHeight
canvas.height = height
canvas.width = width
const numberOfColumns = 12
const dimension = width / numberOfColumns
