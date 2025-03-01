let numberDisplay = document.querySelector("#number")
let button = document.querySelector("#button")
let buttonNew = document.querySelector("#new")
let result = document.querySelector("#result")

let bulbs = document.querySelectorAll(".lightbulb")
let bulb1 = document.querySelector("#lightbulb1")
let bulb2 = document.querySelector("#lightbulb2")
let bulb4 = document.querySelector("#lightbulb4")
let bulb8 = document.querySelector("#lightbulb8")

let rand

setup()

bulbs.forEach((bulb) => {
  bulb.addEventListener("click", e => {
    bulb.classList.toggle("active")
  })
})

button.addEventListener("click", e => {
  if (isCorrect()) {
    result.innerHTML = "¡Tú ganas!"
  } else {
    result.innerHTML = "¡Intentar otra vez!"
  }
})

buttonNew.addEventListener("click", e => {
  setup()
})

function setup() {
  rand = Math.floor(Math.random() * 16)
  numberDisplay.innerHTML = rand
  bulbs.forEach((bulb) => {
    if (bulb.classList.contains("active")) {
      bulb.classList.remove("active")
    }
  })
  result.innerHTML = ""
}

function isCorrect() {
  let userAnswer = 0
  if (bulb1.classList.contains("active")) {
      userAnswer++
  }
  if (bulb2.classList.contains("active")) {
      userAnswer += 2
  }
  if (bulb4.classList.contains("active")) {
      userAnswer += 4
  }
  if (bulb8.classList.contains("active")) {
      userAnswer += 8
  }
  if (userAnswer == rand) {
    return true
  } else {
    return false
  }
}
