'use strict';
// Selecting Elements
const getName = document.getElementById('getName');
// input name
const playerName0 = document.getElementById('playerName--0');
const playerName1 = document.getElementById('playerName--1');

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
