'use strict';
// Selecting Elements
// input
const player0Name = document.getElementById('playerName--0');
const player1Name = document.getElementById('playerName--1');
const getName = document.getElementById('getName');
// player
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
// player score
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
// fill score color

// player current score
const currentScore0El = document.getElementById('current--0');
const currentScore1El = document.getElementById('current--1');
// Elements of dice game roll, hold, new game
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// input name function
const setInfo = function () {
  const player0 = player0Name.value;
  const player1 = player1Name.value;
  document.getElementById('name--0').textContent = player0;
  document.getElementById('name--1').textContent = player1;
  document.getElementById('overlay').classList.add('overlay-hidden');
};
getName.addEventListener('click', function () {
  setInfo();
});
player1Name.addEventListener('keyup', function (event) {
  // Number 13 is the "Enter" key on the keyboard
  if (event.keyCode === 13) {
    // Cancel the default action, if needed
    event.preventDefault();
    // Trigger the button element with a click
    setInfo();
  }
});
// Starting Conditions (Reset Elements text)
let playing, score, currentScore, activePlayer;
// init function
const init = function () {
  score0El.textContent;
  score1El.textContent;
  currentScore0El.textContent = 0;
  currentScore1El.textContent = 0;

  playing = true;
  score = [0, 0];
  currentScore = 0;
  activePlayer = 0;

  //   diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--winner');
  player1El.classList.remove('player--active');
  btnNew.classList.remove('tryAgain');
  //   reset fill
  document.getElementById('scoreFill-0').style.width = '0%';
  document.getElementById('scoreFill-1').style.width = '0%';
  //   removing bg
  document.querySelector(`.player--0`).classList.remove(`lostPlayer`);
  document.querySelector(`.player--1`).classList.remove(`lostPlayer`);
};
init();
// switching player

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// Rolling Dice Functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    diceEl.classList.add('diceRolling');
    // setTimeout for animation
    diceEl.src = 'dice_bg.png';
    setTimeout(function () {
      diceEl.classList.remove('diceRolling');
      // 1. Generating a random dice functionality
      const dice = Math.trunc(Math.random() * 6) + 1;
      //   2. show dice
      diceEl.classList.remove('hidden');
      diceEl.src = `dice-${dice}.png`;
      // 3. check if dice = 1 if true
      if (dice !== 1) {
        //   adding current score
        currentScore += dice;
        document.getElementById(`current--${activePlayer}`).textContent =
          currentScore;
      } else {
        //   than switch to next player
        switchPlayer();
      }
    }, 1000);
  }
});

// Hold game
btnHold.addEventListener('click', function () {
  if (playing) {
    // 1. add current score to active player score
    score[activePlayer] += currentScore;
    // document.getElementById(`score--${activePlayer}`).textContent =
    //   score[activePlayer];
    let fillWidth = score[activePlayer] + '%';
    document.getElementById(`scoreFill-${activePlayer}`).style.width =
      fillWidth;

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

      // adding bg animation lostPlayer
      if (activePlayer == 0) {
        document.querySelector(`.player--1`).classList.add(`lostPlayer`);
      } else if (activePlayer == 1) {
        document.querySelector(`.player--0`).classList.add(`lostPlayer`);
      }
    } else {
      //3. if score is <= 100 than switch player
      switchPlayer();
    }
  }
});

// Reset Game
btnNew.addEventListener('click', init);
