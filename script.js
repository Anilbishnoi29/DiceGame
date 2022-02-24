'use strict';
// Selecting Elements
const getName = document.getElementById('getName');
// input name
const playerName0 = document.getElementById('playerName--0');
const playerName1 = document.getElementById('playerName--1');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
// Elements of dice game roll, hold, new game
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
// overlay
getName.addEventListener('click', function () {
  // set player name
  document.getElementById('name--0').textContent = playerName0.value;
  document.getElementById('name--1').textContent = playerName1.value;
  // hide overlay
  document.getElementById('overlay').classList.add('d-translate');
  setTimeout(function () {
    document.getElementById('overlay').classList.add('d-none');
    document.getElementById('game').classList.add('d-translate-game');
  }, 500);
});

// Starting Conditions (Reset Elements text)
let playing, score, currentScore, activePlayer;
function init() {
  currentScore = 0;
  activePlayer = 0;
  score = [0, 0];
  playing = true;
}
init();
// rolling function
btnRoll.addEventListener('click', function () {
  if (playing) {
    // random number
    const diceNumber = Math.trunc(Math.random() * 6) + 1;
    // get Img
    const diceImg = document.getElementById('diceImg');
    diceImg.src = `./dice_bg.png`;
    diceImg.classList.add('rolling');
    // set time out for animation
    setTimeout(function () {
      // change img according Dice Number
      diceImg.classList.remove('rolling');
      diceImg.src = `./dice-${diceNumber}.png`;
      if (diceNumber !== 1) {
        // update currentScore
        currentScore += diceNumber;
        console.log(diceNumber);
        document.getElementById(`current--${activePlayer}`).textContent =
          currentScore;
      } else {
        //   than switch to next player
        switchPlayer();
      }
    }, 500);
  }
});

// switching player
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('activePlayer');
  player1El.classList.toggle('activePlayer');
};

// game hold
btnHold.addEventListener('click', function () {
  if (playing) {
    score[activePlayer] += currentScore;
    let fillWidth = score[activePlayer] + '%';
    document.getElementById(`scoreFill-${activePlayer}`).style.width =
      fillWidth;
  }
  // 2. check score is >= 100 than finish game
  if (score[activePlayer] >= 100) {
    playing = false;
    btnNew.classList.add('tryAgain');
    //   adding winner class
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add(`player--winner`);
    //   removing active class
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.remove(`player--active`);
  } else {
    //3. if score is <= 100 than switch player
    switchPlayer();
  }
});
