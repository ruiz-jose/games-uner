const numP = document.querySelector("#number");
const stateS = document.querySelector("#state");
const input = document.querySelector("#input");
const resultP = document.querySelector("#result");
const pointsP = document.querySelector("#points");

const submit = document.querySelector("#button");
const newNumB = document.querySelector("#new");

const binaryBox = document.querySelector("#binary");
const largeBox = document.querySelector("#large");

let points = 0;
let max = 15;
let num = Math.floor(Math.random() * max);

numP.innerHTML = num.toString(2);

submit.addEventListener('click', e => {
	if (binaryBox.checked) {
    if (input.value == num) {
      success();
    } else {
      fail(num);
    }
  } else {
    if (input.value == num.toString(2)) {
      success();
    } else {
      fail(num.toString(2));
    }
  }
});

newNumB.addEventListener('click', e => {
  if (largeBox.checked) {
    max = 255;
  } else {
    max = 15;
  }
	num = Math.floor(Math.random() * max);
  if (binaryBox.checked) {
    numP.innerHTML = num.toString(2);
    stateS.innerHTML = "decimal";
  } else {
    numP.innerHTML = num;
    stateS.innerHTML = "binary";
  }
});

function success() {
  resultP.innerHTML = "Correcto!";
  points++;
  if (points < 2) {
    pointsP.innerHTML = points + " punto";
  } else {
    pointsP.innerHTML = points + " puntos";
  }
}

function fail(answer) {
  resultP.innerHTML = "Lo siento, la respuesta era <br/><span class='large'>" + answer + "</span>";
}
