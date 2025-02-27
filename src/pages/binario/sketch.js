/**
 *
 * @source: https://raw.githubusercontent.com/ShivanshuKantPrasad/BinaryGame/master/sketch.js
 *
 * @licstart  The following is the entire license notice for the 
 *  JavaScript code in this page.
 *
 * Copyright (C) 2018  Shivanshu Kant Prasad
 *
 *
 * The JavaScript code in this page is free software: you can
 * redistribute it and/or modify it under the terms of the GNU
 * General Public License (GNU GPL) as published by the Free Software
 * Foundation, either version 3 of the License, or (at your option)
 * any later version.  The code is distributed WITHOUT ANY WARRANTY;
 * without even the implied warranty of MERCHANTABILITY or FITNESS
 * FOR A PARTICULAR PURPOSE.  See the GNU GPL for more details.
 *
 * As additional permission under GNU GPL version 3 section 7, you
 * may distribute non-source (e.g., minimized or compacted) forms of
 * that code without the copy of the GNU GPL normally required by
 * section 4, provided you include this license notice and a URL
 * through which recipients can access the Corresponding Source.
 *
 * @licend  The above is the entire license notice
 * for the JavaScript code in this page.
 *
 */

const practiceBtn = document.querySelector("#Practice");
const timedBtn = document.querySelector("#Timed");
const instructions = document.querySelector("#instructions");
const game = document.querySelector('#game');
const response = document.querySelector('#response');
const close = document.querySelector('.close');

const correct = document.querySelector('.correct');
const wrong = document.querySelector('.wrong');

const scoreDisplay = document.querySelector('#score');
const highScoreDisplay = document.querySelector('#highScore');

const dots = document.querySelectorAll('.dot');
game.style.display = 'none';

let currentScore = 0;
let highScore = 0;

let currentNumber = 0;
let isTimedMode = false;

let timer = 0;

close.addEventListener('click', () => {

 if(isTimedMode) {
   window.clearTimeout(timer);
 }

 currentScore = 0;
 game.style.display = 'none';
 instructions.style.display = 'block';

});

function playGame(isTimed) {

  game.style.display = 'block';
  instructions.style.display = 'none';
  isTimedMode = isTimed;

  startRound();

}

function startRound() {

  if (isTimedMode) {
    window.clearTimeout(timer);
    timer = setTimeout(() => {
      wrong.style.display = 'block';
      setTimeout(() => {
        wrong.style.display = 'none';
        currentScore = 0;
        scoreDisplay.innerText = `Score: ${currentScore}`;
        startRound();
      }, 300);
    }, 15000);
  }

  response.value = '';

  currentNumber = Math.floor(Math.random() * 256);
  for (let i = 7; i >= 0; i--) {
    dots[7 - i].className = ('class', `${(currentNumber >> i) & 1 ? 'on' : 'off'} dot`);
  }
  console.log(currentNumber);

}

response.addEventListener('input', e => {
  const res = parseInt(e.target.value);
  console.log(res === currentNumber ? 'Correct Answer' : 'Try Again');
  if (res === currentNumber) {
    correct.style.display = 'block';
    setTimeout(() => {
      correct.style.display = 'none';
      currentScore += 10;
      scoreDisplay.innerText = `Score: ${currentScore}`;
      if (currentScore > highScore) {
        highScore = currentScore;
        highScoreDisplay.innerText = `High Score: ${highScore}`;
      }
      startRound();
    }, 300)
  }
});


practiceBtn.addEventListener('click', e => {
  playGame(false);
});

timedBtn.addEventListener('click', e => {
  playGame(true);
});
